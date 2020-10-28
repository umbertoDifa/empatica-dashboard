import mutations from './mutations';
import firebase from '../lib/firebase';
import moment from 'moment';
import geoUtils from '../utils/geoUtils';
import * as stateModule from './state';

const names = {
  FETCH_DOWNLOADS: 'FETCH_DOWNLOADS',
  COUNTRY_SELECTED: 'COUNTRY_SELECTED',
  RESET_FILTERS: 'RESET_FILTERS',
  RANGE_SELECTED: 'RANGE_SELECTED',
  NEW_DATA_POINT_RECEIVED: 'NEW_DATA_POINT_RECEIVED',
  START_RANDOM_DOWNLOADS: 'START_RANDOM_DOWNLOADS',
  REAL_TIME_TOGGLED: 'REAL_TIME_TOGGLED',
  RANDOM_GENERATOR_CONFIG_SAVED: 'RANDOM_GENERATOR_CONFIG_SAVED',
  STOP_RANDOM_DOWNLOADS: 'STOP_RANDOM_DOWNLOADS',
  APP_ID_SELECTED: 'APP_ID_SELECTED',
};

const downloadsRef = firebase.downloadsRef;
const downloadTimestampField = 'downloaded_at';

function fetchDownloads({ commit }, { startTimestamp, endTimestamp }) {
  // downloadsRef
  //   .orderByChild(downloadTimestampField)
  //   .startAt(startTimestamp)
  //   .endAt(endTimestamp)
  //   .on('value', snapshot => {
  //     commit(mutations.names.UPDATE_DOWNLOADS, snapshot.val());
  //   });
  downloadsRef
    .orderByChild(downloadTimestampField)
    .startAt(startTimestamp)
    .endAt(endTimestamp)
    .once('value', snapshot => {
      commit(mutations.names.UPDATE_DOWNLOADS, snapshot.val());
    });
}

function countrySelected({ commit }, country) {
  commit(mutations.names.UPDATE_COUNTRY, country);
}

function resetFilters({ dispatch }) {
  dispatch(names.COUNTRY_SELECTED, 'WORLD');
  dispatch(names.RANGE_SELECTED, {
    startDate: moment('2020-01-01 24:00:00').unix() * 1000,
    endDate: moment('2030-10-10 24:00:00').unix() * 1000,
  });
  dispatch(names.APP_ID_SELECTED, 'ALL');
}

function rangeSelected({ commit, dispatch }, dateRange) {
  console.log('range', dateRange);
  commit(mutations.names.UPDATE_RANGE, {
    startDate: moment(dateRange.startDate).unix() * 1000,
    endDate: moment(dateRange.endDate).unix() * 1000,
  });

  dispatch(names.FETCH_DOWNLOADS, {
    startTimestamp: moment(dateRange.startDate).unix(),
    endTimestamp: moment(dateRange.endDate).unix(),
  });
}

function newDataPointReceived({ state, commit }, dataPoint) {
  commit(mutations.names.UPDATE_LAST_DATAPOINT, dataPoint.val);
  const totalDataPoints = { ...state.downloads, [dataPoint.key]: dataPoint.val };
  commit(mutations.names.UPDATE_DOWNLOADS, totalDataPoints);
}

let intervalId;
function startRandomDownloads({ commit, state }) {
  console.log('Generating downloads points each', state, 'ms');

  commit(mutations.names.FLUSH_DATA_POINTS);

  intervalId = setInterval(() => {
    firebase.downloadsRef.push({
      lat: geoUtils.generateRandomLatitude(),
      lon: geoUtils.generateRandomLongitude(),
      app_id: geoUtils.generateRandomAppId(),
    });
  }, state.randomGeneratorConfig.delay);
}

function stopRandomDownloads({ commit }) {
  console.log('Stop random generator');
  clearInterval(intervalId);
  commit(mutations.names.FLUSH_DATA_POINTS);
}

function realTimeToggled({ dispatch, commit }, newStatus) {
  commit(mutations.names.UPDATE_REAL_TIME, newStatus);

  if (newStatus) {
    dispatch(names.START_RANDOM_DOWNLOADS);
  } else {
    dispatch(names.STOP_RANDOM_DOWNLOADS);
  }
}

function randomGeneratorConfigSaved({ commit, dispatch, state }, config) {
  // Do not allow datapoints creation faster than 1 each second
  config.delay = Math.max(1000, config.delay);
  commit(mutations.names.UPDATE_RANDOM_GENERATOR_CONFIG, config);
  if (state.isRealTimeActive) {
    dispatch(names.STOP_RANDOM_DOWNLOADS);
    dispatch(names.START_RANDOM_DOWNLOADS);
  }
}

function appIdSelected({ commit }, appId) {
  commit(mutations.names.UPDATED_SELECTED_APP, appId);
}

export default {
  map: {
    [names.FETCH_DOWNLOADS]: fetchDownloads,
    [names.COUNTRY_SELECTED]: countrySelected,
    [names.RESET_FILTERS]: resetFilters,
    [names.RANGE_SELECTED]: rangeSelected,
    [names.NEW_DATA_POINT_RECEIVED]: newDataPointReceived,
    [names.START_RANDOM_DOWNLOADS]: startRandomDownloads,
    [names.REAL_TIME_TOGGLED]: realTimeToggled,
    [names.RANDOM_GENERATOR_CONFIG_SAVED]: randomGeneratorConfigSaved,
    [names.STOP_RANDOM_DOWNLOADS]: stopRandomDownloads,
    [names.APP_ID_SELECTED]: appIdSelected,
  },
  names,
};
