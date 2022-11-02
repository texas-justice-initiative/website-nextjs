import S3 from 'aws-sdk/clients/s3';

export default new S3({
  region: 'us-east-1',
  accessKeyId: process.env.TJI_AWS_ACCESS_KEY,
  secretAccessKey: process.env.TJI_AWS_SECRET_KEY,
  signatureVersion: 'v4',
});
