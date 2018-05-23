<template>
  <!-- fluid for full width -->
  <b-container fluid class="main-container">
    <b-row>
        <b-col cols="2"><div id="divid2" /><div id="divid3" /></b-col>
        <b-col cols="1">></b-col>
        <b-col cols="6"><div id="divid4" /></b-col>
        <b-col cols="1">></b-col>
        <b-col cols="2"><div id="divid5" /></b-col>
    </b-row>
</b-container>
  
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-container{
    border: 1px solid rgba(86, 61, 124, .2);
    height: 100%;
  }
</style>