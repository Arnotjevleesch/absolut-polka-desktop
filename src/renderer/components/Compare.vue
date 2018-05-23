<template>
  <b-button ref="compareButton" type="button" @click="compare" :disabled="disableCompareButton" variant="primary">Compare</b-button>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Compare extends Vue {
  compare () {
    this.$store.state.NoteStore.stave.drawCorrection(this.$store.state.NoteStore.player.frequencies)
    // console.log(this.$store.state.NoteStore.numberOfNotes)
    // console.log(this.$store.state.NoteStore.stave.notes.length)
    // console.log(this.$store.state.NoteStore.player.frequencies.length)
  }

  get disableCompareButton () {
    return !(this.$store.state.NoteStore.numberOfNotes === this.$store.state.NoteStore.stave.notes.length &&
      this.$store.state.NoteStore.numberOfNotes === this.$store.state.NoteStore.player.frequencies.length)
  }
}
</script>