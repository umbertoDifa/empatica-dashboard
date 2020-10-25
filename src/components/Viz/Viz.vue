<template>
  <div id="viz">
    <!-- <BarChart :data="dataPoints"></BarChart> -->
    <Map></Map>
  </div>
</template>

<script>
import actions from '../../store/actions'
import BarChart from '../BarChart/BarChart'
import Map from '../Map/Map'
import { mapActions, mapGetters } from 'vuex'
import getters from '../../store/getters'

export default {
  name: 'Viz',
  computed: {
      ...mapGetters({
          dataPoints: getters.names.FILTERED_DATA_POINTS,
      })
  },
  methods: {
    ...mapActions({
        fetchData: actions.names.DOWNLOADS_UPDATED,
    }),
  },
  components: {
      BarChart,
      Map,
  }
}
</script>

<style scoped>
#viz {
  min-height: 400px;
  background-color: greenyellow;
}
</style>
