import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import HighchartsVue from 'highcharts-vue'

Vue.config.productionTip = false

Vue.use(HighchartsVue)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
