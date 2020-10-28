<template>
  <div id="filters" class="md-layout md-gutter">
    <div class="md-layout-item md-size-30">
      <FiltersCountry></FiltersCountry>
    </div>
    <div class="md-layout-item md-size-60">
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
      startDate: moment('2010-10-10 24:00:00').unix() * 1000,
      endDate: moment('2030-10-10 24:00:00').unix() * 1000,
    });
  },
  components: {
    ResetButton,
    FiltersDateRangePicker,
    FiltersCountry,
  },
};
</script>

<style scoped></style>
