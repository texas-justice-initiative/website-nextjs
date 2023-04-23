import { useState, useEffect } from 'react';
import s3 from '../components/utils/aws/s3';

const defaultParams = {
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

// export async function getStaticProps() {
//     const res = await new Promise((resolve, reject) => {
//       s3().listObjectsV2(params, (err, data) => {
//         if (err) reject(err, err.stack);
//         resolve(data);
//       });
//     });

//     console.log(res.Contents);

//     return {
//       props: {
//         tcjsReports: JSON.parse(JSON.stringify(res.Contents)),
//       },
//     };
//   }

function useTcjsReports(params = defaultParams) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getS3Data()
      .then((res) => setData(res.Contents))
      .finally(setLoading(false));
  }, []);

  async function getS3Data() {
    return await new Promise((resolve, reject) => {
      s3().listObjectsV2(params, (err, data) => {
        if (err) reject(err, err.stack);
        resolve(data);
      });
    });
  }

  return {
    data,
    loading,
  };
}

export default useTcjsReports;
