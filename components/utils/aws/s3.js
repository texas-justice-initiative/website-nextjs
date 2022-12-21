import S3 from 'aws-sdk/clients/s3';

export default new S3({
  region: 'us-east-1',
  accessKeyId: process.env.NEXT_PUBLIC_TJI_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_TJI_AWS_SECRET_KEY,
  signatureVersion: 'v4',
});
