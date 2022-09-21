import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'
import vuetify from './plugins/vuetify'

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
