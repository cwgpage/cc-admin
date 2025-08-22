import { createApp } from 'vue'
import { VuePageStackPlugin } from 'vue-page-stack'
import App from './App.vue'
import router from './router'

import '@/assets/style/main.css'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import '@/assets/iconfont/iconfont.css'

const app = createApp(App)

app.use(router)
app.use(VuePageStackPlugin, { router })

app.mount('#app')
