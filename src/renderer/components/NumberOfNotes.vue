<template>
  <select id="numberOfNotesSelect" v-model="selectedNumberOfNotes" @change="change">
    <option v-for="index in indexes" :key="index.id" :value="index.val">{{index.val}}</option>
  </select>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import eventHub from '../EventHub'

@Component
export default class NumberOfNotes extends Vue {
  selectedNumberOfNotes: number = 4// = this.$store.state.NoteStore.numberOfNotes

  indexes = [
    { id: 0, val: '1' },
    { id: 1, val: '2' },
    { id: 2, val: '3' },
    { id: 3, val: '4' }
  ]

  change () {
    this.$store.commit('setNumberOfNotes', this.selectedNumberOfNotes)
    eventHub.$emit('updatePortee')
  }
}
</script>
