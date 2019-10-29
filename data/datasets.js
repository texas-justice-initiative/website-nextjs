const custodialDeathsIcon = require('../images/custodial_deaths.svg');
const civiliansShotIcon = require('../images/civilians_shot.svg');
const officersShotIcon = require('../images/officers_shot.svg');

const INCOMPLETE_YEAR_NOTE = 'Data from the indicated year is incomplete.';

export default {
  custodialDeaths: {
    lastUpdated: '10/8/2019',
    name: 'Deaths in Custody',
    description: 'All deaths in custody in Texas since 2005, as reported to the Office of the Attorney General.',
    icon: custodialDeathsIcon,
    urls: {
      compressed: 'https://s3.amazonaws.com/tji-compressed-data/cdr_compressed_new.json',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/cleaned_custodial_death_reports.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year', note: INCOMPLETE_YEAR_NOTE },
      { type: 'doughnut', group_by: 'race' },
      { type: 'doughnut', group_by: 'sex' },
      { type: 'doughnut', group_by: 'manner_of_death' },
      { type: 'doughnut', group_by: 'age_group' },
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
    lastUpdated: '10/8/2019',
    name: 'Civilians Injured or Killed',
    description:
      'Officer involved shootings in Texas since Sept. 2015, as reported to the Office of the Attorney General',
    icon: civiliansShotIcon,
    urls: {
      compressed: 'https://s3.amazonaws.com/tji-compressed-data/ois_compressed_new.json',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/shot_civilians.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year', note: INCOMPLETE_YEAR_NOTE },
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
    lastUpdated: '10/8/2019',
    name: 'Officers Injured or Killed',
    description:
      'Officer involved shootings in Texas since Sept. 2015, as reported to the Office of the Attorney General',
    icon: officersShotIcon,
    urls: {
      compressed: 'https://s3.amazonaws.com/tji-compressed-data/ois_officers_compressed_new.json',
      full: 'https://s3.us-east-2.amazonaws.com/tji-public-cleaned-datasets/shot_officers.csv',
    },
    chart_configs: [
      { type: 'bar', group_by: 'year', note: INCOMPLETE_YEAR_NOTE },
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
