import firebase from '../lib/firebase'

const downloadsRef = firebase.downloadsRef;
const downloadTimestampField = 'downloaded_at';

function getDataInRange(startTimestamp, endTimestamp){
    return downloadsRef
    .orderByChild(downloadTimestampField)
    .startAt(startTimestamp)
    .endAt(endTimestamp)
    .on("value", snapshot => {
        console.log(snapshot.val());
      });
}

export default {
    getDataInRange,
}
