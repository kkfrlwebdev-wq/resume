import { describe, expect, it } from 'vitest'
import { projectCategories, projects } from '@/data/projects'

describe('portfolio projects', () => {
  it('includes Truck Route Manager as a Vue SPA project', () => {
    const project = projects.find(({ translationKey }) => translationKey === 'truckRouteManager')

    expect(project).toMatchObject({
      title: 'Truck Route Manager',
      category: 'spa',
      linkLabelKey: 'portfolio.viewCode',
    })
    expect(project.image).toContain('projects/truck-route-manager.png')
    expect(project.stack).toEqual(expect.arrayContaining(['Vue 3', 'Pinia', 'Firebase']))
    expect(projectCategories.some(({ id }) => id === 'spa')).toBe(true)
    expect(projects).toHaveLength(9)
  })
})
