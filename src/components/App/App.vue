<template>
  <div id="app">
    <NavBar></NavBar>
    <Filters></Filters>
    <Viz></Viz>
    <Counter></Counter>
  </div>
</template>

<script>
import VueMaterial from 'vue-material'
import Vue from 'vue'
import NavBar from '../NavBar/NavBar'
import Filters from '../Filters/Filters'
import Viz from '../Viz/Viz'
import Counter from '../Counter/Counter'

Vue.use(VueMaterial);

  export default {
    name: 'app',
    components: {
      NavBar,
      Filters,
      Viz,
      Counter
    }
  }
</script>
