<template>
  <div id="app" height="100vh">
    <NavBar></NavBar>

    <div class="md-layout rows">
      <div v-if="!isRealTimeActive" class="md-layout-item md-layout">
        <div class="md-layout x"><Filters></Filters></div>
      </div>
      <md-divider></md-divider>

      <div class="md-layout-item md-layout">
        <div class="md-layout-item"><Viz></Viz></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import NavBar from '../NavBar/NavBar';
import Filters from '../Filters/Filters';
import Viz from '../Viz/Viz';
import firebase from '../../lib/firebase';
import { mapActions } from 'vuex';
import actions from '../../store/actions';

export default {
  name: 'app',
  methods: {
    ...mapActions({
      newDataPointReceived: actions.names.NEW_DATA_POINT_RECEIVED,
    }),
    syncFirebase() {
      firebase.downloadsRef
        .orderByChild('downloaded_at')
        .limitToLast(1)
        .on('child_added', snapshot => {
          console.log('child_added', snapshot.val());
          this.newDataPointReceived(snapshot.val());
        });
    },
  },
  computed: {
    isRealTimeActive() {
      return this.$store.state.isRealTimeActive;
    },
  },
  mounted() {
    this.syncFirebase();
  },
  components: {
    NavBar,
    Filters,
    Viz,
  },
};
</script>

<style scoped>
.rows {
  display: block;
}
</style>
