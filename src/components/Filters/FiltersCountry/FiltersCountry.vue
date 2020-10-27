<template>
  <md-field>
    <md-select v-model="selectedCountry" name="country" id="country" placeholder="Country">
      <md-option v-for="country in countries" :class="country" :key="country" :value="country">
        {{ country }}
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
  name: 'FiltersCountry',
  computed: {
    ...mapGetters({
      countries: getters.names.COUNTRIES,
    }),
    selectedCountry: {
      get() {
        return this.$store.state.selectedCountry;
      },
      set(value) {
        this.countrySelected(value);
      },
    },
  },
  methods: {
    ...mapActions({
      countrySelected: actions.names.COUNTRY_SELECTED,
    }),
  },
};
</script>

<style scoped>
.md-field {
  margin: 0;
}
</style>
