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
      <div class="md-layout-item">
        <DateRangePicker
          ref="picker"
          opens="center"
          :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
          :timePicker="true"
          :showDropdowns="true"
          :autoApply="false"
          :linkedCalendars="false"
          v-model="dateRange"
        >
          <template v-slot:input="picker" style="min-width: 350px;">
            {{moment(dateRange.startDate).format("MMMM Do YYYY, HH:mm")}} -
            {{moment(dateRange.endDate).format("MMMM Do YYYY, HH:mm")}}
          </template>
        </DateRangePicker>
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
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import getters from '../../store/getters'
import actions from '../../store/actions'
import DateRangePicker from 'vue2-daterange-picker'
import moment from 'moment'

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
    },
    dateRange: {
      get() {
        return this.$store.state.dateRange;
      },
      set(newRange){
        this.rangeSelected(newRange);
      },
    },
  },
  methods: {
    ...mapActions({
      countrySelected: actions.names.COUNTRY_SELECTED,
      resetFilters: actions.names.RESET_FILTERS,
      rangeSelected: actions.names.RANGE_SELECTED,
    }),
  },
  mounted() {
    this.rangeSelected(this.dateRange);
  },
  components: {
    DateRangePicker,
  },
}
</script>
<style>
.drp-selected {
  visibility: hidden;
}
.calendars.row.no-gutters {
  display: flex;
}
.yearselect.col {
  width: 50px;
}
</style>

<style scoped>
#filters {
  min-height: 100px;
}
</style>
