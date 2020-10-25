import mutations from './mutations'
import firebase from '../lib/firebase'
import {state} from '../store/state'
import moment from 'moment'

const names = {
    'FETCH_DOWNLOADS': 'FETCH_DOWNLOADS',
    'COUNTRY_SELECTED': 'COUNTRY_SELECTED',
    'RESET_FILTERS':'RESET_FILTERS',
    'RANGE_SELECTED':'RANGE_SELECTED',
    'NEW_DATA_POINT_RECEIVED': 'NEW_DATA_POINT_RECEIVED',
};

const downloadsRef = firebase.downloadsRef;
const downloadTimestampField = 'downloaded_at';

function fetchDownloads ({commit}, {startTimestamp, endTimestamp}) {
    downloadsRef
        .orderByChild(downloadTimestampField)
        .startAt(startTimestamp)
        .endAt(endTimestamp)
        .on("value", snapshot => {
            commit(mutations.names.UPDATE_DOWNLOADS,  snapshot.val());
        });
};

function countrySelected({commit}, country){
    commit(mutations.names.UPDATE_COUNTRY, country);
}

function resetFilters({dispatch}){
    dispatch(names.COUNTRY_SELECTED, 'WORLD');
    dispatch(names.RANGE_SELECTED, state.dateRange)
}

function rangeSelected({commit, dispatch}, dateRange) {
    commit(mutations.names.UPDATE_RANGE, dateRange);

    dispatch(names.FETCH_DOWNLOADS, {
        startTimestamp: moment(dateRange.startDate).unix(),
        endTimestamp: moment(dateRange.endDate).unix(),
    });
}

function newDataPointReceived({commit}, dataPoint){
    console.log('commiting',dataPoint);
    commit(mutations.names.UPDATE_LAST_DATAPOINT, dataPoint);
}
export default {
    map: {
        [names.FETCH_DOWNLOADS]: fetchDownloads,
        [names.COUNTRY_SELECTED]: countrySelected,
        [names.RESET_FILTERS]: resetFilters,
        [names.RANGE_SELECTED]: rangeSelected,
        [names.NEW_DATA_POINT_RECEIVED]: newDataPointReceived,
    },
    names,
}