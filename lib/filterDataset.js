/**
 * Helper function that takes in the currently loaded data and the filters object and returns a new
 * data objected that has been filtered.
 * @param {obj} data // Coming from state.data
 * @param {obj} filters // Coming from state.filters
 */
export default function filterData(records, filters) {
  // Create an empty object which will become our final data object to be returned
  const filteredData = {
    records: {},
    removedRecordIndicies: [],
  };
  // Create an empty array which will contain the indices of all records to be filtered
  let filterIndices = [];

  // Loop through our filters
  const filterGroups = Object.keys(filters);

  filterGroups.forEach((filterGroup) => {
    // Add to our filtered data records which will we reduce later
    // This is important to ensure we aren't accidently modifying our object in state
    filteredData.records[filterGroup] = [...records[filterGroup]];

    // Are any filters active (true)? If so, let's apply filters for this group, otherwise we want to skip this group completely.
    const applyFilters = Object.values(filters[filterGroup]).includes(true);

    if (applyFilters) {
      // Loop through all different value options for each group
      const groupOptions = Object.keys(filters[filterGroup]);

      groupOptions.forEach((groupOption) => {
        if (filters[filterGroup][groupOption] === false) {
          // Reduce the selected groups records down to those that match our filter, saving the index of those records
          const matchedRecords = filteredData.records[filterGroup].reduce((acc, curr, index) => {
            /* record options that are true/false come through here as boolean data types,
                which was causing a type mismatch between the filter state and the record */
            const currentOption = typeof curr === 'boolean' ? curr.toString() : curr;

            if (currentOption === groupOption) {
              acc.push(index);
            }
            return acc;
          }, []);
          filterIndices = filterIndices.concat(matchedRecords);
        }
      });
    }
  });

  // At this point we have stored the index values of all records to be filtered in the array filterIndices
  // Now we want to remove those records and return a filtered dataset.
  const uniqueFilters = [...new Set(filterIndices)];
  const cleanedData = {
    records: {},
    removedRecordIndicies: uniqueFilters,
  };

  // Only process data further if we have any filters to apply, otherwise just return the original object.
  if (uniqueFilters.length > 0) {
    // Loop through groups first so that we can remove nulls more easily
    filterGroups.forEach((filterGroup) => {
      uniqueFilters.forEach((index) => {
        filteredData.records[filterGroup][index] = null;
      });
      cleanedData.records[filterGroup] = filteredData.records[filterGroup].filter((value) => value != null);
    });
    return cleanedData;
  }
  return filteredData;
}
