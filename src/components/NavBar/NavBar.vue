<template>
  <div>
    <md-toolbar class="md-primary">
      <h3 class="md-title" style="flex: 1">Empatica</h3>

      <md-menu md-direction="bottom-end">
        <md-button md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item @click="dialogActive = true">Generate Random Points</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>

    <md-dialog :md-active.sync="dialogActive">
      <md-dialog-title>Generate Random Downloads</md-dialog-title>

      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label>Number of Downloads</label>
            <md-input v-model="numberOfPoints" type="number"></md-input>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-field>
            <label>Delay (ms)</label>
            <md-input v-model="delayBetweenPoints" type="number"></md-input>
          </md-field>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="dialogActive = false">Cancel</md-button>
        <md-button class="md-primary" @click="onGenerateClicked">Generate</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import actions from '../../store/actions';

export default {
  name: 'NavBar',
  data() {
    return {
      dialogActive: false,
      numberOfPoints: 10,
      delayBetweenPoints: 400,
    };
  },
  methods: {
    onGenerateClicked() {
      this.dialogActive = false;
      console.log(this.numberOfPoints, this.delayBetweenPoints);
      this.generateRandomDownloads({
        numberOfDownloads: this.numberOfPoints,
        delay: this.delayBetweenPoints,
      });
    },
    ...mapActions({
      generateRandomDownloads: actions.names.GENERATE_RANDOM_DOWNLOADS,
    }),
  },
};
</script>

<style>
.md-toolbar {
  margin-top: 30px;
}

.md-layout.md-gutter {
  margin: 10px;
}
</style>
