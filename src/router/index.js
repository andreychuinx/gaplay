import Vue from 'vue'
import Router from 'vue-router'
import dominosPage from '@/components/dominos'

import Login from '@/components/Login'
import HomePage from '@/components/homepage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: Login
    },
    {
      path: '/dominos',
      name: 'dominos page',
      component: dominosPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
