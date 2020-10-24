import Vue from 'vue'
import App from './components/App.vue'

Vue.config.productionTip = false
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

new Vue({
  el: '#app',
  render: h => h(App)
})
