<template>
  <div>
    <div ref="porteeDiv" @click="draw"/>
    <b-button @click="updatePort">Clear</b-button>
  </div>
</template>


<script lang="ts">

import Vue from 'vue'
import Stave from "../Stave";
import Component from 'vue-class-component'
import eventHub from '../EventHub'

// https://github.com/vuejs/vue-class-component#vue-class-component
// https://alligator.io/vuejs/typescript-class-components/
// Le décorateur @Component indique que la classe est un composant Vue
@Component
export default class Portee extends Vue {
  stave: Stave

  mounted(){

    this.stave = new Stave(this.$refs.porteeDiv as HTMLElement, this.$store.state.NoteStore.numberOfNotes)
    eventHub.$on('updatePortee', this.updatePort)

    this.$store.commit('setStave', this.stave)
  }

  updatePort(){
    this.stave.initStave(this.$store.state.NoteStore.numberOfNotes, true);
  }

  draw(event){
    this.stave.drawNotes(event); 
  }
}

</script>