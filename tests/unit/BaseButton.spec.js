import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseButton from '@/components/base/BaseButton.vue'

describe('BaseButton', () => {
  it('opens a regular href without forcing a download', () => {
    const wrapper = mount(BaseButton, {
      props: { href: '/resume.html' },
      slots: { default: 'Відкрити резюме' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/resume.html')
    expect(wrapper.attributes('download')).toBeUndefined()
  })

  it('adds the download attribute only when requested', () => {
    const wrapper = mount(BaseButton, {
      props: { href: '/resume.pdf', download: true },
      slots: { default: 'Завантажити PDF' },
    })

    expect(wrapper.attributes()).toHaveProperty('download')
  })
})
