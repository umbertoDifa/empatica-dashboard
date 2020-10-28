<template>
  <md-field>
    <md-select v-model="selectedApp" name="app" id="app" placeholder="App">
      <md-option v-for="a in appIds" :key="a" :value="a">
        {{ a }}
      </md-option>
    </md-select>
  </md-field>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

import getters from '../../../store/getters';
import actions from '../../../store/actions';

export default {
  name: 'FiltersApp',
  computed: {
    ...mapGetters({
      appIds: getters.names.APP_IDS,
    }),
    selectedApp: {
      get() {
        return this.$store.state.appId;
      },
      set(value) {
        this.appIdSelected(value);
      },
    },
  },
  methods: {
    ...mapActions({
      appIdSelected: actions.names.APP_ID_SELECTED,
    }),
  },
};
</script>

<style scoped>
.md-field {
  margin: 0;
}
</style>
