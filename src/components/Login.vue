<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h2>Essential Links</h2> -->
    <div class="container">
      <h3>Please Sign In with </h3> <br>
      <button type="button" v-on:click="auth" name="button"><img style="width:50px" src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-128.png" alt=""></button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../main'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Ga-Play!'
    }
  },
  methods: {
    auth () {
      let self = this
      return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          console.log(result);
         // var database = firebase.database()
         db.ref('user/'+result.user.uid).set({
           name: result.user.displayName,
           id: result.user.uid,
           email: result.user.email,
           photo: result.user.photoURL
         })
         var token = result.credential.accessToken;
         // The signed-in user info.
         var user = result.user;
         localStorage.setItem('token', token)
         localStorage.setItem('user', JSON.stringify(user))
         self.$router.push('/home')
        })
        .catch(function(err) {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
