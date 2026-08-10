import { createRouter, createWebHashHistory } from 'vue-router'
import { i18n } from '@/i18n'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { titleKey: 'routes.home' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { titleKey: 'routes.about' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { titleKey: 'routes.services' },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('@/views/PortfolioView.vue'),
    meta: { titleKey: 'routes.portfolio' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { titleKey: 'routes.contact' },
  },
  {
    path: '/desktop',
    name: 'desktop',
    component: () => import('@/views/DesktopView.vue'),
    meta: { titleKey: 'routes.desktop' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
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
