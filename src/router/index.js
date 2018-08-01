import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Booking = resolve => {
  import('components/booking/booking').then(module => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'booking',
      component: Booking
    }
  ]
})
