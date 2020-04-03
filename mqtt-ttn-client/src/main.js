// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Home from '@/components/Home'
import Co2 from '@/components/co2'
import Humidity from '@/components/humidity'
import Light from '@/components/light'
import Temperature from '@/components/temperature'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [          
    {
      path: '/co2/',
      name: 'co2',
      component: Co2
    },
    {
      path: '/humidity/',
      name: 'humidity',
      component: Humidity
    },
    {
      path: '/light/',
      name: 'light',
      component: Light
    },
    {
      path: '/temperature/',
      name: 'temperature',
      component: Temperature
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    }        
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
