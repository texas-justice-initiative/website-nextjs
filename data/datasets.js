// Links to datasets we want to load
export default [
  {
    slug: 'custodialDeaths',
    name: 'Custodial Deaths',
    chartTitle: 'Deaths in Custody since 2005',
    description: 'All deaths in custody in Texas since 2005, as reported to the Office of the Attorney General.',
    icon: 'custodial_deaths.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/cdr_compressed.json',
  },
  {
    slug: 'civiliansShot',
    name: 'Civilians Shot by Officers',
    chartTitle: 'Civilians Shot by Officers since 2015',
    description: 'Shootings involving Texas law enforcement since Sept. 2015, as reported to the Office of the Attorney General.',
    icon: 'civilians_shot.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/ois_compressed.json',
  },
  {
    slug: 'officersShot',
    name: 'Officers Shot by Civilians',
    chartTitle: 'Officers Shot by Civilians since 2015',
    description: 'Shootings that injured or killed Texas law enforcement officers since Sept. 2015, as reported to the Office of the Attorney General.',
    icon: 'officers_shot.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/ois_officers_compressed.json',
  },
];