import filterData from '../../functions/filter_data';

test('filters by age group', () => {
  const records = {
    age_group: ['30 to 39', '18 to 29', 'under 18'],
    year: [2017, 2018, 2019],
  };

  const filters = {
    year: {
      2017: true,
      2018: true,
      2019: true,
    },
    age_group: {
      'under 18': true,
      '18 to 29': false,
      '30 to 39': false,
      '40 to 49': false,
      '50 to 59': false,
      '60 and up': false,
    },
  };

  const expectedFilteredRecords = {
    age_group: ['under 18'],
    year: [2019],
  };

  expect(filterData(records, filters).records).toMatchObject(expectedFilteredRecords);
});
