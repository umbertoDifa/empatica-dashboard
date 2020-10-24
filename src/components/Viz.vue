<template>
    <div id='viz'>
        <BarChart></BarChart>
    </div>
</template>

<script>
import downloadsService from '../services/downloadsService'
import actions from '../store/actions'
import BarChart from './BarChart'

downloadsService.getDataInRange(0, 1603500361);

export default {
  name: 'Viz',
  computed: {
      downloads(){
          console.log('updating...'); 
          return this.$store.state.downloads;
      }
  },
  methods: {
      increment() {
        console.log(this.$store.state.count);
        this.$store.commit(actions.names.INCREMENT);
        console.log(this.$store.state.count);
      }
  },
  mounted(){
    //   this.increment();
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