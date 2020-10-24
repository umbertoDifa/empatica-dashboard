import Vue from 'vue'

const names = {
    'UPDATE_DOWNLOADS': 'UPDATE_DOWNLOADS',
};

function updateDownloads(state, downloads){
    console.log('updating down in mutation', downloads);
    Vue.set(state, 'downloads', {...downloads});
}

export default {
    names,
    map: {
        [names.UPDATE_DOWNLOADS]: updateDownloads,
    },
}