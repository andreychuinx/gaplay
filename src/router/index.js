import Vue from 'vue'
import Router from 'vue-router'
import createroom from '@/components/createroom'
import room from '@/components/room'

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
      path: '/createroom',
      name: 'createroom',
      component: createroom,
    },
     {
      path: '/room/:id',
      name: 'room',
      component: room,
      props : true
     },
    {
      path: '/dominos',
      name: 'dominos page',
      component: dominosPage
    },
    {
      path: '/game',
      name: 'game',
      component: HomePage
    }
  ],
})
