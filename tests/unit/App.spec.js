import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App.vue'
import { i18n, setLocale } from '@/i18n'

describe('App', () => {
  beforeEach(() => {
    const values = new Map()
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key) => values.get(key) ?? null),
      removeItem: vi.fn((key) => values.delete(key)),
      setItem: vi.fn((key, value) => values.set(key, String(value))),
    })
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })))
    setLocale('uk')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders while the router is resolving its initial route', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          component: { template: '<p>Home page</p>' },
          meta: { titleKey: 'routes.home' },
        },
        {
          path: '/:pathMatch(.*)*',
          component: { template: '<p>Fallback page</p>' },
          meta: { titleKey: 'routes.notFound' },
        },
      ],
    })

    const wrapper = mount(App, {
      attachTo: document.body,
      global: { plugins: [createPinia(), router, i18n] },
    })

    await router.isReady()
    await flushPromises()

    expect(wrapper.find('.site-root').exists()).toBe(true)
    expect(wrapper.text()).toContain('Home page')
    expect(document.title).toContain('Микола Кольченко')

    wrapper.unmount()
  })
})
