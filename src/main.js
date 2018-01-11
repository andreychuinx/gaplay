// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyCqoQUjkF2wtl50jYsxcsG5V2fMOvx3JTM",
  authDomain: "gaple-123.firebaseapp.com",
  databaseURL: "https://gaple-123.firebaseio.com",
  projectId: "gaple-123",
  storageBucket: "gaple-123.appspot.com",
  messagingSenderId: "881398713928"
};

export const db = firebase.initializeApp(config);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
