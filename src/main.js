import { createApp } from 'vue'
import App from './App.vue'
import { installPlugins } from './plugins'
import './assets/styles/main.scss'

const app = createApp(App)

installPlugins(app)
app.mount('#app')
