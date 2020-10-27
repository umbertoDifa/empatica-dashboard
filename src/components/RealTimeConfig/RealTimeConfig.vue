<template>
  <div id="real-time-config">
    <md-dialog :md-active.sync="isOpen">
      <md-dialog-title>Config Random Downloads</md-dialog-title>

      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label>Delay (ms)</label>
            <md-input v-model="delayBetweenPoints" type="number"></md-input>
          </md-field>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="$emit('close')">Cancel</md-button>
        <md-button class="md-primary" @click="onSaveClicked">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import actions from '../../store/actions';

export default {
  name: 'RealTimeConfig',
  props: {
    dialogActive: { type: Boolean, default: false },
  },
  computed: {
    isOpen: {
      get() {
        return !!this.dialogActive;
      },
    },
    delayBetweenPoints: {
      get() {
        return this.$store.state.randomGeneratorConfig.delay;
      },
      set(val) {
        this.randomGeneratorConfigSaved({
          delay: +val,
        });
      },
    },
  },
  methods: {
    onSaveClicked() {
      this.randomGeneratorConfigSaved({
        delay: +this.delayBetweenPoints,
      });
      this.$emit('close');
    },
    ...mapActions({
      randomGeneratorConfigSaved: actions.names.RANDOM_GENERATOR_CONFIG_SAVED,
    }),
  },
};
</script>

<style></style>
