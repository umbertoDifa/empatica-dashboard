import Vue from 'vue';

const names = {
  UPDATE_DOWNLOADS: 'UPDATE_DOWNLOADS',
  UPDATE_COUNTRY: 'UPDATE_COUNTRY',
  UPDATE_RANGE: 'UPDATE_RANGE',
  UPDATE_LAST_DATAPOINT: 'UPDATE_LAST_DATAPOINT',
  UPDATE_REAL_TIME: 'UPDATE_REAL_TIME',
  UPDATE_RANDOM_GENERATOR_CONFIG: 'UPDATE_RANDOM_GENERATOR_CONFIG',
  FLUSH_DATA_POINTS: 'FLUSH_DATA_POINTS',
  UPDATE_DEFAULT_RANGE: 'UPDATE_DEFAULT_RANGE',
};

function updateDownloads(state, downloads) {
  Vue.set(state, 'downloads', { ...downloads });
}

function updateCountry(state, country) {
  Vue.set(state, 'selectedCountry', country);
}

function updateRange(state, dateRange) {
  state.dateRange = { ...dateRange };
}

function updateLastDataPoint(state, dataPoint) {
  state.lastDataPoint = [...state.lastDataPoint, dataPoint];
}

function flushDataPoints(state) {
  state.lastDataPoint = [];
}

function updateRealTime(state, newStatus) {
  state.isRealTimeActive = newStatus;
}

function updateRandomGeneratorConfig(state, config) {
  state.randomGeneratorConfig = { ...config };
}

function updateDefaultRange(state, newRange) {
  state.defaultRange = { ...newRange };
}

export default {
  names,
  map: {
    [names.UPDATE_DOWNLOADS]: updateDownloads,
    [names.UPDATE_COUNTRY]: updateCountry,
    [names.UPDATE_RANGE]: updateRange,
    [names.UPDATE_LAST_DATAPOINT]: updateLastDataPoint,
    [names.UPDATE_REAL_TIME]: updateRealTime,
    [names.UPDATE_RANDOM_GENERATOR_CONFIG]: updateRandomGeneratorConfig,
    [names.FLUSH_DATA_POINTS]: flushDataPoints,
    [names.UPDATE_DEFAULT_RANGE]: updateDefaultRange,
  },
};
