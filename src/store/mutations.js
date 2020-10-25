import Vue from 'vue'

const names = {
    'UPDATE_DOWNLOADS': 'UPDATE_DOWNLOADS',
    'UPDATE_COUNTRY': 'UPDATE_COUNTRY',
};

function updateDownloads(state, downloads){
    Vue.set(state, 'downloads', {...downloads});
}

function updateCountry(state, country){
    Vue.set(state, 'selectedCountry', country);
}

export default {
    names,
    map: {
        [names.UPDATE_DOWNLOADS]: updateDownloads,
        [names.UPDATE_COUNTRY]: updateCountry,
    },
}