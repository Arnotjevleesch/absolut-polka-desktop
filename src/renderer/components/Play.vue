<template>
  <b-button ref="playButton" @click="playing" variant="success">Play</b-button>
</template>


<script lang="ts">

import Vue from 'vue'
import Player from "../Player";
import Component from 'vue-class-component'

@Component
export default class Play extends Vue {
  player: Player

  mounted(){
    this.player = new Player();
    this.$store.commit('setPlayer', this.player)
  }

  async playing(){
    (this.$refs.playButton as HTMLInputElement).disabled = true;
    await this.player.play(this.$store.state.NoteStore.numberOfNotes);
    (this.$refs.playButton as HTMLInputElement).disabled = false;
  }
}

</script>