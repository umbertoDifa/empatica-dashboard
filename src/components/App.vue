<template>
  <div id="app">
    <NavBar></NavBar>
    <Filters></Filters>
    <Viz></Viz>
    <Counter></Counter>
  </div>
</template>

<script>
import firebase from '../lib/firebase';
import NavBar from './NavBar';
import Filters from './Filters';
import Viz from './Viz';
import Counter from './Counter';
import actions from '../store/actions';

export default {
  name: 'app',
  methods: {
    ...mapActions({
      newDataPointReceived: actions.names.NEW_DATA_POINT_RECEIVED,
    }),
    syncFirebase() {
      firebase.downloadsRef
        .orderByChild('downloaded_at')
        .limitToLast(10)
        .on('child_added', snapshot => {
          console.log(snapshot.val());
          this.newDataPointReceived(snapshot.val());
        });
    },
  },
  mounted() {
    this.syncFirebase();
  },
  components: {
    NavBar,
    Filters,
    Viz,
    Counter,
  },
};
</script>
