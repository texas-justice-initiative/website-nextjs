// Links to datasets we want to load
export default [
  {
    slug: 'custodialDeaths',
    name: 'Custodial Deaths',
    url: 'https://s3.amazonaws.com/tji-compressed-data/cdr_compressed.json',
  },
  {
    slug: 'civiliansShot',
    name: 'Civilians Shot by Officers',
    url: 'https://s3.amazonaws.com/tji-compressed-data/ois_compressed.json',
  },
  {
    slug: 'officersShot',
    name: 'Officers Shot by Civilians',
    url: 'https://s3.amazonaws.com/tji-compressed-data/ois_officers_compressed.json',
  },
];