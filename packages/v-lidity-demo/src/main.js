import { createApp } from 'vue'
import App from './App.vue'

import VlidityInstaller from "v-lidity";

const VueApp = createApp(App)

VueApp.use(VlidityInstaller, {
  component: true,
})
VueApp.mount('#app')
