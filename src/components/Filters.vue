<template>
    <div id='filters'>
      <div class="md-layout-item">
        <md-field>
          <md-select v-model="selectedCountry" name="country" id="country" placeholder="Country">
            <md-option 
              v-for="country in countries" 
              :key="country" 
              :value="country">
                {{country}}
            </md-option>
          </md-select>
        </md-field>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import getters from '../store/getters'
import actions from '../store/actions'

export default {
  name: 'Filters',
  data() {
    return {
      selectedCountry: '',
    }
  },
  computed: {
    ...mapGetters({
      countries : getters.names.COUNTRIES,
    })
  },
  methods: {
    ...mapActions({
      countrySelected: actions.names.COUNTRY_SELECTED,
    })
  },
  watch: {
    selectedCountry(newVal, oldVal){
      this.countrySelected(newVal);
    }
  }
}
</script>

<style scoped>
 #filters {
    min-height: 100px;
    background-color: red;
 }
</style>