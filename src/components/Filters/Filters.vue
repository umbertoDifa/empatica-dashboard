<template>
  <div id="filters" class="md-layout md-gutter">
    <div class="md-layout-item md-size-20">
      <FiltersCountry></FiltersCountry>
    </div>
    <div class="md-layout-item md-size-20">
      <FiltersApp></FiltersApp>
    </div>
    <div class="md-layout-item md-size-40 date-range">
      <FiltersDateRangePicker></FiltersDateRangePicker>
    </div>
    <ResetButton></ResetButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

import getters from '../../store/getters';
import actions from '../../store/actions';
import DateRangePicker from 'vue2-daterange-picker';
import moment from 'moment';
import ResetButton from './ResetButton/ResetButton';
import FiltersDateRangePicker from './FiltersDateRangePicker/FiltersDateRangePicker';
import FiltersCountry from './FiltersCountry/FiltersCountry';
import FiltersApp from './FiltersApp/FiltersApp';

export default {
  name: 'Filters',
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
    dateRange: {
      get() {
        return this.$store.state.dateRange;
      },
      set(newRange) {
        this.rangeSelected(newRange);
      },
    },
  },
  methods: {
    ...mapActions({
      countrySelected: actions.names.COUNTRY_SELECTED,
      rangeSelected: actions.names.RANGE_SELECTED,
    }),
  },
  mounted() {
    this.rangeSelected({
      startDate: this.$store.state.dateRange.startDate,
      endDate: this.$store.state.dateRange.endDate,
    });
  },
  components: {
    ResetButton,
    FiltersDateRangePicker,
    FiltersCountry,
    FiltersApp,
  },
};
</script>

<style scoped>
.date-range {
  margin-top: 10px;
}
</style>
