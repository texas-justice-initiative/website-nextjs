import S3 from 'aws-sdk/clients/s3';

export default function s3() {
  return new S3({
    region: 'us-east-1',
    accessKeyId: process.env.NEXT_PUBLIC_TJI_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_TJI_AWS_SECRET_KEY,
    signatureVersion: 'v4',
  });
}

export const getSignedUrl = async (s3_client, bucket, key) => {
  try {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const url = s3_client.getSignedUrl('getObject', params);
    return url;
  } catch (error) {
    console.error('Error getting PDF URL:', error);
    throw error;
  }
};
