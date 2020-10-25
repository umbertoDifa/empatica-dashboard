import Vue from 'vue'

const names = {
    'UPDATE_DOWNLOADS': 'UPDATE_DOWNLOADS',
    'UPDATE_COUNTRY': 'UPDATE_COUNTRY',
    'UPDATE_RANGE': 'UPDATE_RANGE',
    'UPDATE_LAST_DATAPOINT': 'UPDATE_LAST_DATAPOINT',
};

function updateDownloads(state, downloads){
    Vue.set(state, 'downloads', {...downloads});
}

function updateCountry(state, country){
    Vue.set(state, 'selectedCountry', country);
}

function updateRange(state, dateRange){
    state.dateRange = {...dateRange};
}

function updateLastDataPoint(state, dataPoint){
    state.lastDataPoint = [...state.lastDataPoint, dataPoint];
}

export default {
    names,
    map: {
        [names.UPDATE_DOWNLOADS]: updateDownloads,
        [names.UPDATE_COUNTRY]: updateCountry,
        [names.UPDATE_RANGE]: updateRange,
        [names.UPDATE_LAST_DATAPOINT]: updateLastDataPoint,
    },
}