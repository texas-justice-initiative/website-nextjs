export default {
  custodialDeaths: {
    name: 'deaths in custody',
    chartTitle: 'Deaths in Custody since 2005',
    description: 'All deaths in custody in Texas since 2005, as reported to the Office of the Attorney General.',
    icon: 'custodial_deaths.svg', // File name for the icon kept in /images/
    urls: {
      compressed: 'https://api.myjson.com/bins/v7ajb',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/cleaned_custodial_death_reports.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year' },
      { type: 'doughnut', group_by: 'race' },
      { type: 'doughnut', group_by: 'sex' },
    ],
    filter_configs: [
      { name: 'year' },
      { name: 'race' },
      { name: 'sex' },
    ],
  },
  civiliansShot: {
    name: 'civilians shot by officers',
    chartTitle: 'Civilians Shot by Officers since 2015',
    description: 'Shootings involving Texas law enforcement since Sept. 2015, as reported to the Office of the Attorney General.',
    icon: 'civilians_shot.svg', // File name for the icon kept in /images/
    urls: {
      compressed: 'https://api.myjson.com/bins/uwkqf',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/shot_civilians.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year' },
      { type: 'doughnut', group_by: 'race' },
      { type: 'doughnut', group_by: 'sex' },
    ],
    filter_configs: [
      { name: 'year' },
      { name: 'race' },
      { name: 'sex' },
    ],
  },
  officersShot: {
    name: 'officers shot by civilians',
    chartTitle: 'Officers Shot by Civilians since 2015',
    description: 'Shootings that injured or killed Texas law enforcement officers since Sept. 2015, as reported to the Office of the Attorney General.',
    icon: 'officers_shot.svg', // File name for the icon kept in /images/
    urls: {
      compressed: 'https://api.myjson.com/bins/19bhaf',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/shot_officers.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year' },
      { type: 'doughnut', group_by: 'race' },
      { type: 'doughnut', group_by: 'sex' },
    ],
    filter_configs: [
      { name: 'year' },
      { name: 'race' },
      { name: 'sex' },
    ],
  },
};
