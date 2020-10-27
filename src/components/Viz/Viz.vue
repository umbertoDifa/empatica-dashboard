<template>
  <div id="viz">
    <RealTimeMap v-if="isRealTimeActive"></RealTimeMap>
    <BarChart v-else :data="dataPoints"></BarChart>
  </div>
</template>

<script>
import actions from '../../store/actions';
import BarChart from '../BarChart/BarChart';
import RealTimeMap from '../RealTimeMap/RealTimeMap';
import { mapActions, mapGetters } from 'vuex';
import getters from '../../store/getters';

export default {
  name: 'Viz',
  computed: {
    ...mapGetters({
      dataPoints: getters.names.FILTERED_DATA_POINTS,
    }),
    isRealTimeActive() {
      return this.$store.state.isRealTimeActive;
    },
  },
  methods: {
    ...mapActions({
      fetchData: actions.names.DOWNLOADS_UPDATED,
    }),
  },
  mounted() {
    console.log('height', this.$el.clientHeight);
  },
  components: {
    BarChart,
    RealTimeMap,
  },
};
</script>

<style scoped>
#viz {
  min-height: 400px;
  background-color: greenyellow;
  height: 100%;
}
</style>
