import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/leftScrollDemo', //首页
      component: resolve => require(['@/components/leftScrollDemo.vue'], resolve)
    },
    {
      path: '/betterScrollClickDemo', //首页
      component: resolve => require(['@/components/betterScrollClickDemo.vue'], resolve)
    },
    {
      path: '/scrollLoadDemo', //首页
      component: resolve => require(['@/components/scrollLoadDemo.vue'], resolve)
    },
    {
      path: '/inputLineBreakDemo', //首页
      component: resolve => require(['@/components/inputLineBreakDemo.vue'], resolve)
    }
  ]
})
