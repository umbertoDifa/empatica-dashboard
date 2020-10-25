import mutations from './mutations'
import firebase from '../lib/firebase'

const names = {
    'DOWNLOADS_UPDATED': 'DOWNLOADS_UPDATED',
    'COUNTRY_SELECTED': 'COUNTRY_SELECTED',
};

const downloadsRef = firebase.downloadsRef;
const downloadTimestampField = 'downloaded_at';

function downloadsUpdated ({commit}, {startTimestamp, endTimestamp}) {
    downloadsRef
        .orderByChild(downloadTimestampField)
        .startAt(startTimestamp)
        .endAt(endTimestamp)
        .on("value", snapshot => {
            console.log('committing update')
            console.log(snapshot.val());
            commit(mutations.names.UPDATE_DOWNLOADS,  snapshot.val());
        });
};

function countrySelected({commit}, country){
    commit(mutations.names.UPDATE_COUNTRY, country);
}

export default {
    map: {
        [names.DOWNLOADS_UPDATED]: downloadsUpdated,
        [names.COUNTRY_SELECTED]: countrySelected,
    },
    names,
}