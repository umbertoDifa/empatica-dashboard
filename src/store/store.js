import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const state = {
    downloads: {},
    selectedCountry:'',
  };


const store = new Vuex.Store({
    state,
    mutations: mutations.map,
    actions: actions.map,
    getters: getters.map,
});

export {
    store,
}