import { createI18n } from 'vue-i18n'
import uk from './messages/uk'
import en from './messages/en'

const supportedLocales = ['uk', 'en']
const savedLocale = localStorage.getItem('portfolio-locale')
const initialLocale = supportedLocales.includes(savedLocale) ? savedLocale : 'uk'

document.documentElement.lang = initialLocale

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: initialLocale,
  fallbackLocale: 'uk',
  messages: { uk, en },
})

export function setLocale(locale) {
  if (!supportedLocales.includes(locale)) return
  i18n.global.locale.value = locale
  localStorage.setItem('portfolio-locale', locale)
  document.documentElement.lang = locale
}
