<template>
  <md-button @click="() => resetFilters()" id="reset-button" class="md-primary md-raised"
    >Reset</md-button
  >
</template>

<script>
import { mapActions } from 'vuex';

import actions from '../../../store/actions';

export default {
  name: 'ResetButton',
  methods: {
    ...mapActions({
      resetFilters: actions.names.RESET_FILTERS,
    }),
  },
};
</script>
