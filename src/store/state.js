import moment from 'moment';

const state = Object.freeze({
  downloads: {},
  selectedCountry: 'WORLD',
  appId: 'ALL',
  dateRange: {
    startDate: moment('2020-01-01 24:00:00').unix() * 1000,
    endDate: moment('2030-10-10 24:00:00').unix() * 1000,
  },
  lastDataPoint: [],
  isRealTimeActive: false,
  randomGeneratorConfig: {
    delay: 1000,
  },
});

export { state };
