<template>
  <div id="viz">
    <BarChart :data="dataPoints"></BarChart>
  </div>
</template>

<script>
import actions from '../../store/actions'
import BarChart from '../BarChart/BarChart'
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
  // mounted() {
  //     this.fetchData({startTimestamp:0, endTimestamp:1603500361});
  // },
  components: {
      BarChart,
  }
}
</script>

<style scoped>
#viz {
  min-height: 400px;
  background-color: greenyellow;
}
</style>
