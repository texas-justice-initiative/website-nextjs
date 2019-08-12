// Links to datasets we want to load
/*
export default {
  custodialDeaths: {
    name: 'Custodial Deaths',
    chartTitle: 'Deaths in Custody since 2005',
    description: 'All deaths in custody in Texas since 2005, as reported to the Office of the Attorney General.',
    icon: 'custodial_deaths.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/cdr_compressed.json',
  },
  civiliansShot: {
    name: 'Civilians Shot by Officers',
    chartTitle: 'Civilians Shot by Officers since 2015',
    description: 'Shootings involving Texas law enforcement since Sept. 2015, as reported to the Office of the Attorney General.',
    icon: 'civilians_shot.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/ois_compressed.json',
  },
  officersShot: {
    name: 'Officers Shot by Civilians',
    chartTitle: 'Officers Shot by Civilians since 2015',
    description: 'Shootings that injured or killed Texas law enforcement officers since Sept. 2015, as reported to the Office of the Attorney General.',
    icon: 'officers_shot.svg', // File name for the icon kept in /images/
    url: 'https://s3.amazonaws.com/tji-compressed-data/ois_officers_compressed.json',
  },
};
*/
export default {
  custodialDeaths: {
    name: 'deaths in custody',
    chartTitle: 'Deaths in Custody since 2005',
    description: 'All deaths in custody in Texas since 2005, as reported to the Office of the Attorney General.',
    icon: 'custodial_deaths.svg', // File name for the icon kept in /images/
    urls: {
      compressed: 'https://s3.amazonaws.com/tji-compressed-data/cdr_compressed.json',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/cleaned_custodial_death_reports.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year' },
      { type: 'doughnut', group_by: 'race' },
      { type: 'doughnut', group_by: 'sex' },
      { type: 'doughnut', group_by: 'manner_of_death' },
      { type: 'doughnut', group_by: 'age_at_time_of_death', sort_by: { column: 'key', direction: 'asc' } },
      { type: 'doughnut', group_by: 'type_of_custody' },
      { type: 'doughnut', group_by: 'death_location_type' },
      { type: 'doughnut', group_by: 'means_of_death' },
    ],
    filter_configs: [
      { name: 'year' },
      { name: 'race' },
      { name: 'sex' },
      { name: 'manner_of_death' },
      { name: 'age_group' },
      { name: 'type_of_custody' },
      { name: 'death_location_type' },
      { name: 'means_of_death' },
      { name: 'agency_name', type: 'autocomplete' },
      { name: 'death_location_county', type: 'autocomplete' },
    ],
  },
  civiliansShot: {
    name: 'civilians shot by officers',
    chartTitle: 'Civilians Shot by Officers since 2015',
    description: 'Shootings involving Texas law enforcement since Sept. 2015, as reported to the Office of the Attorney General.',
    icon: 'civilians_shot.svg', // File name for the icon kept in /images/
    urls: {
      compressed: 'https://s3.amazonaws.com/tji-compressed-data/ois_compressed.json',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/shot_civilians.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year' },
      { type: 'doughnut', group_by: 'civilian_race' },
      { type: 'doughnut', group_by: 'civilian_gender' },
      { type: 'doughnut', group_by: 'civilian_died' },
      { type: 'doughnut', group_by: 'deadly_weapon' },
    ],
    filter_configs: [
      { name: 'year' },
      { name: 'civilian_race' },
      { name: 'civilian_gender' },
      { name: 'civilian_died' },
      { name: 'deadly_weapon' },
      { name: 'agency_name', type: 'autocomplete' },
      { name: 'incident_county', type: 'autocomplete' },
    ],
  },
  officersShot: {
    name: 'OIS - officers shot by civilians',
    chartTitle: 'Officers Shot by Civilians since 2015',
    description: 'Shootings that injured or killed Texas law enforcement officers since Sept. 2015, as reported to the Office of the Attorney General.',
    icon: 'officers_shot.svg', // File name for the icon kept in /images/
    urls: {
      compressed: 'https://s3.amazonaws.com/tji-compressed-data/ois_officers_compressed.json',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/shot_officers.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year' },
      { type: 'doughnut', group_by: 'officer_race' },
      { type: 'doughnut', group_by: 'officer_gender' },
      { type: 'doughnut', group_by: 'officer_harm' },
      { type: 'doughnut', group_by: 'civilian_harm' },
    ],
    filter_configs: [
      { name: 'year' },
      { name: 'officer_race' },
      { name: 'officer_harm' },
      { name: 'civilian_harm' },
      { name: 'agency_name', type: 'autocomplete' },
      { name: 'incident_county', type: 'autocomplete' },
    ],
  },
};
