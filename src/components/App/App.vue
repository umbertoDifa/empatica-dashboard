<template>
  <div id="app">
    <NavBar></NavBar>
    <Filters></Filters>
    <Viz></Viz>
    <Counter></Counter>
  </div>
</template>

<script>

import NavBar from '../NavBar/NavBar'
import Filters from '../Filters/Filters'
import Viz from '../Viz/Viz'
import Counter from '../Counter/Counter'

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
