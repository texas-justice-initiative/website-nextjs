import React from 'react';
import s3 from '../components/utils/aws/s3';

const params = {
  Bucket: 'tcjs-reports' /* required */,
  //   ContinuationToken: 'STRING_VALUE',
  //   Delimiter: 'STRING_VALUE',
  //   EncodingType: url,
  //   ExpectedBucketOwner: 'STRING_VALUE',
  //   FetchOwner: true || false,
  //   MaxKeys: 2,
  //   Prefix: 'STRING_VALUE',
  //   RequestPayer: requester,
  //   StartAfter: 'STRING_VALUE'
};

export default function useTCJSReports() {
  const [loading, setLoading] = React.useState(true);
  const [tcjsReports, setTcjsReports] = React.useState([]);

  React.useEffect(() => {
    const fetchReports = new Promise((resolve, reject) => {
      s3.listObjectsV2(params, (err, data) => {
        if (err) reject(err, err.stack);
        resolve(data);
      });
    });

    fetchReports
      .then((data) => JSON.stringify(data.Contents))
      .then((data) => {
        setTcjsReports(JSON.parse(data));
        setLoading(false);
      });
  }, []);

  return {
    tcjsReports,
    loading,
  };
}
