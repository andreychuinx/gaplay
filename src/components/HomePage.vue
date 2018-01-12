<template lang="html">
  <button type="button" v-on:click="logOut" name="button">LogOut</button>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'HomePage',
  methods: {
    logOut () {
      var database = firebase.database()
      let user = JSON.parse(localStorage.getItem('user'))
      database.ref('user/'+user.uid).remove()
      this.$router.push('/')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
}
</script>

<style lang="css">
</style>
