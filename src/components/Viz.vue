<template>
    <div id='viz'>
        <BarChart :data="downloads"></BarChart>
    </div>
</template>

<script>
import actions from '../store/actions'
import BarChart from './BarChart'
import { mapActions } from 'vuex'

export default {
  name: 'Viz',
  computed: {
      downloads(){
          console.log('updating downloads in viz...'); 
          return Object.values(this.$store.state.downloads);;
      }
  },
  methods: {
    ...mapActions({
        fetchData: actions.names.DOWNLOADS_UPDATED, 
    }),
  },
  mounted() {
      this.fetchData({startTimestamp:0, endTimestamp:1603500361});
  },
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