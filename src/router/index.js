import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import startgame from '@/components/startgame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/startgame',
      name: 'startgame',
      component: startgame
    }
  ],
  mode: 'history'
})
