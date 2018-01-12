import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import createroom from '@/components/createroom'
import room from '@/components/room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/createroom',
      name: 'createroom',
      component: createroom
    },
    {
      path: '/room',
      name: 'room',
      component: room
    }
  ],
  mode: 'history'
})
