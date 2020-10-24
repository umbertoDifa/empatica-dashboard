import firebase from '../lib/firebase'
import {store} from '../store/store'
import actions from '../store/actions'

const downloadsRef = firebase.downloadsRef;
const downloadTimestampField = 'downloaded_at';

function getDataInRange(startTimestamp, endTimestamp){
    return downloadsRef
    .orderByChild(downloadTimestampField)
    .startAt(startTimestamp)
    .endAt(endTimestamp)
    .on("value", snapshot => {
        console.log('dispatching update')
        console.log(snapshot.val());
        store.dispatch(actions.names.DOWNLOADS_UPDATED, snapshot.val());
      });
}

export default {
    getDataInRange,
}
