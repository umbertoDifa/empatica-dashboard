<template>
    <div id='viz'>
    </div>
</template>

<script>
import downloadsService from '../services/downloadsService'

downloadsService.getDataInRange(1603500361, 1603500361+40);

export default {
  name: 'Viz'
}
</script>

<style scoped>
 #viz {
    min-height: 400px;
    background-color: greenyellow;
 }
</style>