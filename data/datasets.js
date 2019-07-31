// Links to datasets we want to load
export default [
  {
    slug: 'custodialDeaths',
    name: 'Custodial Deaths',
    chartTitle: 'Deaths in Custody since 2005',
    icon: 'custodial_deaths.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/cdr_compressed.json',
  },
  {
    slug: 'civiliansShot',
    name: 'Civilians Shot by Officers',
    chartTitle: 'Civilians Shot by Officers since 2015',
    icon: 'civilians_shot.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/ois_compressed.json',
  },
  {
    slug: 'officersShot',
    name: 'Officers Shot by Civilians',
    chartTitle: 'Officers Shot by Civilians since 2015',
    icon: 'officers_shot.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/ois_officers_compressed.json',
  },
];