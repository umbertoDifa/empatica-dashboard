<template>
  <div id="app">
    <NavBar></NavBar>
    <Filters></Filters>
    <Viz></Viz>
    <Counter></Counter>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Filters from './Filters'
import Viz from './Viz'
import Counter from './Counter'


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