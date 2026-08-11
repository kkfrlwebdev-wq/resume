import { createRouter, createWebHashHistory } from 'vue-router'
import { i18n } from '@/i18n'

const pageModules = import.meta.glob('../../pages/*.vue')

function page(filename) {
  const component = pageModules[`../../pages/${filename}`]
  if (!component) throw new Error(`Page component not found: ${filename}`)
  return component
}

export const routes = [
  {
    path: '/',
    name: 'home',
    component: page('index.vue'),
    meta: { titleKey: 'routes.home' },
  },
  {
    path: '/about',
    name: 'about',
    component: page('about.vue'),
    meta: { titleKey: 'routes.about' },
  },
  {
    path: '/services',
    name: 'services',
    component: page('services.vue'),
    meta: { titleKey: 'routes.services' },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: page('portfolio.vue'),
    meta: { titleKey: 'routes.portfolio' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: page('contact.vue'),
    meta: { titleKey: 'routes.contact' },
  },
  {
    path: '/desktop',
    name: 'desktop',
    component: page('desktop.vue'),
    meta: { titleKey: 'routes.desktop' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: page('[...path].vue'),
    meta: { titleKey: 'routes.notFound' },
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  document.title = `${i18n.global.t(to.meta.titleKey)} — ${i18n.global.t('profile.name')}`
  requestAnimationFrame(() => document.querySelector('#main-content')?.focus({ preventScroll: true }))
})

export default router
