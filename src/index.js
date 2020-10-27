import Vue from 'vue';
import App from './components/App/App.vue';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import moment from 'moment';
import VueMaterial from 'vue-material';

import { store } from './store/store';

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

Vue.use(VueMaterial);

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
