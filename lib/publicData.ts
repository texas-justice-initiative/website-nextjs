const CLOUDFRONT_PUBLIC_DATA_ROOT = 'https://d33horc7j11slv.cloudfront.net';

export const PUBLIC_DATA_URLS = {
  cleanedDatasets: `${CLOUDFRONT_PUBLIC_DATA_ROOT}/cleaned-datasets`,
  compressedData: `${CLOUDFRONT_PUBLIC_DATA_ROOT}/compressed-data`,
  custodialReports: `${CLOUDFRONT_PUBLIC_DATA_ROOT}/custodial-reports`,
  tcjsReports: `${CLOUDFRONT_PUBLIC_DATA_ROOT}/jail-reports`,
} as const;

export const getPublicDataObjectUrl = (baseUrl: string, key: string) => {
  const encodedKey = key
    .replace(/^\/+/, '')
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${baseUrl}/${encodedKey}`;
};
