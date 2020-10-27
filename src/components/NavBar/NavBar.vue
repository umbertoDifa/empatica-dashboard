<template>
  <div id="navbar">
    <md-toolbar class="md-primary">
      <h3 class="md-title" style="flex: 1">Empatica</h3>

      <md-switch v-model="isRealTimeActive"><strong>Real Time</strong></md-switch>

      <md-menu md-direction="bottom-end">
        <md-button md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item @click="dialogActive = true">Config Random Points</md-menu-item>
        </md-menu-content>

        <RealTimeConfig :dialogActive="dialogActive" @close="dialogActive = false"></RealTimeConfig>
      </md-menu>
    </md-toolbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import actions from '../../store/actions';
import RealTimeConfig from '../RealTimeConfig/RealTimeConfig';

export default {
  name: 'NavBar',
  data() {
    return {
      dialogActive: false,
    };
  },
  computed: {
    isRealTimeActive: {
      get() {
        return this.$store.state.isRealTimeActive;
      },
      set(val) {
        this.realTimeToggled(val);
      },
    },
  },
  methods: {
    ...mapActions({
      realTimeToggled: actions.names.REAL_TIME_TOGGLED,
    }),
  },
  components: {
    RealTimeConfig,
  },
};
</script>

<style>
.md-layout.md-gutter {
  margin: 10px;
}
</style>
