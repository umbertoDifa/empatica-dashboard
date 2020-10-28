import _ from 'lodash';
import moment from 'moment';

const names = {
  COUNTRIES: 'COUNTRIES',
  DATA_POINTS: 'DATA_POINTS',
  FILTERED_DATA_POINTS: 'FILTERED_DATA_POINTS',
};

const worldCountry = 'WORLD';

function getFilteredDataPoints(state, getters) {
  function filterByCountry(points, selectedCountry) {
    return points.filter(
      dp => !selectedCountry || selectedCountry == worldCountry || dp.country == selectedCountry
    );
  }

  function filterByRange(points, dateRange) {
    if (!dateRange || _.isEmpty(dateRange)) {
      return points;
    }

    const unixStartDate = moment(dateRange.startDate).unix();
    const unixEndDate = moment(dateRange.endDate).unix();
    return points.filter(
      dp => dp.downloaded_at >= unixStartDate && dp.downloaded_at <= unixEndDate
    );
  }

  return filterByRange(
    filterByCountry(getters.DATA_POINTS, state.selectedCountry),
    state.dateRange
  );
}

function getCountries(state) {
  const s = new Set(Object.values(state.downloads).map(d => d.country));
  s.add(worldCountry);
  return s;
}

export default {
  map: {
    [names.DATA_POINTS]: state => Object.values(state.downloads),
    [names.COUNTRIES]: getCountries,
    [names.FILTERED_DATA_POINTS]: getFilteredDataPoints,
  },
  names,
};
