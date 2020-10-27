<template>
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
    <template v-slot:input="picker" style="min-width: 350px">
      {{ moment(dateRange.startDate).format('MMMM Do YYYY, HH:mm') }} -
      {{ moment(dateRange.endDate).format('MMMM Do YYYY, HH:mm') }}
    </template>
  </DateRangePicker>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

import getters from '../../../store/getters';
import actions from '../../../store/actions';
import DateRangePicker from 'vue2-daterange-picker';
import moment from 'moment';

export default {
  name: 'FiltersDateRangePicker',
  computed: {
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
      rangeSelected: actions.names.RANGE_SELECTED,
    }),
  },
  mounted() {
    this.rangeSelected(this.dateRange);
  },
  components: {
    DateRangePicker,
  },
};
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
.vue-daterange-picker {
  width: 100%;
}
.form-control.reportrange-text {
  text-align: center;
}
</style>
