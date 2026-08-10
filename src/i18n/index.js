import { createI18n } from 'vue-i18n'
import uk from './messages/uk'
import en from './messages/en'

const supportedLocales = ['uk', 'en']
const storage = globalThis.localStorage
const savedLocale = typeof storage?.getItem === 'function' ? storage.getItem('portfolio-locale') : null
const initialLocale = supportedLocales.includes(savedLocale) ? savedLocale : 'uk'

if (globalThis.document?.documentElement) document.documentElement.lang = initialLocale

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
  if (typeof storage?.setItem === 'function') storage.setItem('portfolio-locale', locale)
  if (globalThis.document?.documentElement) document.documentElement.lang = locale
}
