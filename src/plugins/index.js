import { createPinia } from 'pinia'
import router from '@/app/router'
import { i18n } from '@/i18n'

export function installPlugins(app) {
  app.use(createPinia())
  app.use(i18n)
  app.use(router)
}
