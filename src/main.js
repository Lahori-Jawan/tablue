import Vue from 'vue'
import App from './App.vue'
import ReactiveProvide from 'vue-reactive-provide'

Vue.use(ReactiveProvide)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
