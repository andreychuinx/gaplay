<template>
  <div id="app">
    <img src="https://lh3.googleusercontent.com/2aN5njD39SNmhW-834U17qeyU-Ig-_1VBD_YAgeSDVm9Jvda0L8eHPGJOAQHrFUjww=w300">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
