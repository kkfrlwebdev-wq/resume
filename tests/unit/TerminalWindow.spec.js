import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TerminalWindow from '@/components/interactive/TerminalWindow.vue'
import { i18n } from '@/i18n'

describe('TerminalWindow', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    })
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => 'toast-id') })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('prints the coffee easter egg after executing the command', async () => {
    const wrapper = mount(TerminalWindow, {
      global: {
        plugins: [createPinia(), i18n],
        stubs: {
          InteractiveWindow: { template: '<section><slot /></section>' },
        },
      },
    })

    await wrapper.find('#terminal-command').setValue('coffee')
    await wrapper.find('.terminal__form').trigger('submit')

    expect(wrapper.text()).toContain('Кава готова. Час створювати щось класне!')
    expect(wrapper.findAll('.terminal__line--success')).toHaveLength(8)
  })
})
