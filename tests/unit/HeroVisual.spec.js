import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HeroVisual from '@/components/home/HeroVisual.vue'
import { skills } from '@/data/skills'
import { i18n } from '@/i18n'

describe('HeroVisual', () => {
  it('renders every technology and lets a user select one card', async () => {
    const wrapper = mount(HeroVisual, {
      global: { plugins: [i18n] },
    })

    const cards = wrapper.findAll('.tech-card')

    expect(cards).toHaveLength(skills.length)
    expect(wrapper.text()).toContain('Vue.js')
    expect(wrapper.text()).toContain('Node.js')
    expect(wrapper.text()).toContain('Less')
    expect(wrapper.text()).toContain('MongoDB')
    expect(wrapper.text()).toContain('SQL')

    await wrapper.find('.tech-drop').trigger('animationend')

    expect(wrapper.find('.tech-drop').classes()).toContain('has-landed')

    await cards[0].trigger('click')

    expect(cards[0].attributes('aria-pressed')).toBe('true')
    expect(wrapper.find('.tech-drop.is-selected').exists()).toBe(true)

    await cards[0].trigger('click')

    expect(cards[0].attributes('aria-pressed')).toBe('false')

    wrapper.unmount()
  })
})
