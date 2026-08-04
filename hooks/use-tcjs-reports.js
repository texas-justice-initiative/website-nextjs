import { useState, useEffect } from 'react';
import { PUBLIC_DATA_URLS } from '../lib/publicData';

const textContent = (parent, tagName) =>
  parent.getElementsByTagName(tagName)[0]?.textContent || '';

const decodeS3Key = (key) => {
  try {
    return decodeURIComponent(key);
  } catch {
    return key;
  }
};

export const parseListObjectsV2 = (xml) => {
  const document = new DOMParser().parseFromString(xml, 'application/xml');

  if (document.querySelector('parsererror')) {
    throw new Error('CloudFront returned an invalid TCJS report listing');
  }

  const contents = Array.from(document.getElementsByTagName('Contents')).map(
    (item) => ({
      Key: decodeS3Key(textContent(item, 'Key')),
      LastModified: textContent(item, 'LastModified'),
      ETag: textContent(item, 'ETag'),
      Size: Number(textContent(item, 'Size')),
      StorageClass: textContent(item, 'StorageClass'),
    })
  );

  return {
    contents,
    isTruncated: textContent(document, 'IsTruncated') === 'true',
    nextContinuationToken: textContent(document, 'NextContinuationToken'),
  };
};

export const fetchTcjsReports = async () => {
  const reports = [];
  let continuationToken = '';

  do {
    const query = new URLSearchParams({
      'encoding-type': 'url',
      'list-type': '2',
      'max-keys': '1000',
    });

    if (continuationToken) {
      query.set('continuation-token', continuationToken);
    }

    const response = await fetch(`${PUBLIC_DATA_URLS.tcjsReports}?${query}`);

    if (!response.ok) {
      throw new Error(`Could not load TCJS reports (${response.status})`);
    }

    const page = parseListObjectsV2(await response.text());
    reports.push(...page.contents);
    continuationToken = page.isTruncated ? page.nextContinuationToken : '';
  } while (continuationToken);

  return reports;
};

function useTcjsReports() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchTcjsReports()
      .then((reports) => {
        if (!cancelled) setData(reports);
      })
      .catch((fetchError) => {
        if (!cancelled) setError(fetchError);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    data,
    error,
    loading,
  };
}

export default useTcjsReports;
