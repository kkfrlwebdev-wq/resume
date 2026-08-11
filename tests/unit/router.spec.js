import { describe, expect, it } from 'vitest'
import { routes } from '@/app/router'

describe('application routes', () => {
  it('maps every public route to a lazy page component', () => {
    expect(routes.map(({ path, name }) => ({ path, name }))).toEqual([
      { path: '/', name: 'home' },
      { path: '/about', name: 'about' },
      { path: '/services', name: 'services' },
      { path: '/portfolio', name: 'portfolio' },
      { path: '/contact', name: 'contact' },
      { path: '/desktop', name: 'desktop' },
      { path: '/:pathMatch(.*)*', name: 'not-found' },
    ])

    routes.forEach((route) => expect(route.component).toBeTypeOf('function'))
  })
})
