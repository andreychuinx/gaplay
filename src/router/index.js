import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homepage'
import dominosPage from '@/components/dominos'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homePage
    },
    {
      path: '/dominos',
      name: 'dominos page',
      component: dominosPage
    }
  ]
})
