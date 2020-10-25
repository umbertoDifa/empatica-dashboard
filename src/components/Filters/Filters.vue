<template>
  <div id="filters">
    <div class="md-layout md-gutter">
      <div class="md-layout-item filter">
        <md-field>
          <md-select
            v-model="selectedCountry"
            name="country"
            id="country"
            placeholder="Country"
          >
            <md-option
              v-for="country in countries"
              :class="country"
              :key="country"
              :value="country"
            >
              {{country}}
            </md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-size-15">
        <md-button
          @click="() => resetFilters()"
          id="reset-button"
          class="md-primary"
          >Reset</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import getters from '../../store/getters'
import actions from '../../store/actions'

export default {
  name: 'Filters',
  computed: {
    ...mapGetters({
      countries : getters.names.COUNTRIES,
    }),
    selectedCountry: {
      get() {
        return this.$store.state.selectedCountry;
      },
      set(value) {
        this.countrySelected(value);
      }
    }
  },
  methods: {
    ...mapActions({
      countrySelected: actions.names.COUNTRY_SELECTED,
      resetFilters: actions.names.RESET_FILTERS,
    })
  },
}
</script>

<style scoped>
#filters {
  min-height: 100px;
}
</style>
