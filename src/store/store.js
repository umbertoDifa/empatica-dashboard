import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    downloads: {},
  };

// const mutations = {
//     [mutations.names.UPDATE_DOWNLOADS]: mutations.updateDownloads,
// };

// const actions = {
//     [actions.names.DOWNLOADS_UPDATED]: actions.getDownloads,
// };

const store = new Vuex.Store({
    state,
    mutations: mutations.map,
    actions: actions.map,
});

export {
    store,
}