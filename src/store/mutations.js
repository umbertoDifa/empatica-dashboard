import Vue from 'vue'

const names = {
    'UPDATE_DOWNLOADS': 'UPDATE_DOWNLOADS',
    'UPDATE_COUNTRY': 'UPDATE_COUNTRY',
    'UPDATE_RANGE': 'UPDATE_RANGE',
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

export default {
    names,
    map: {
        [names.UPDATE_DOWNLOADS]: updateDownloads,
        [names.UPDATE_COUNTRY]: updateCountry,
        [names.UPDATE_RANGE]: updateRange,
    },
}