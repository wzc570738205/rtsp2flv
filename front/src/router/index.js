import Vue from 'vue'
import Router from 'vue-router'
import FlvPlayer from '@/components/FlvPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FlvPlayer',
      component: FlvPlayer
    }
  ]
})
