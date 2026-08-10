import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useUiStore } from '@/stores/uiStore'

describe('uiStore', () => {
  let nextId
  let storage

  beforeEach(() => {
    vi.useFakeTimers()
    nextId = 0
    const values = new Map()
    storage = {
      clear: vi.fn(() => values.clear()),
      getItem: vi.fn((key) => values.get(key) ?? null),
      removeItem: vi.fn((key) => values.delete(key)),
      setItem: vi.fn((key, value) => values.set(key, String(value))),
    }
    vi.stubGlobal('localStorage', storage)
    vi.stubGlobal('crypto', {
      randomUUID: vi.fn(() => `toast-${++nextId}`),
    })
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('toggles zero-gravity mode and persists both states in localStorage', () => {
    const store = useUiStore()

    expect(store.zeroGravityMode).toBe(false)

    store.toggleZeroGravity()
    expect(store.zeroGravityMode).toBe(true)
    expect(storage.getItem('portfolio-zero-gravity')).toBe('true')
    expect(store.toasts).toHaveLength(1)
    expect(store.toasts[0]).toMatchObject({ type: 'success' })

    store.toggleZeroGravity()
    expect(store.zeroGravityMode).toBe(false)
    expect(storage.getItem('portfolio-zero-gravity')).toBe('false')
    expect(store.toasts).toHaveLength(2)
  })

  it('restores persisted zero-gravity mode when the store is created', () => {
    storage.setItem('portfolio-zero-gravity', 'true')
    setActivePinia(createPinia())

    expect(useUiStore().zeroGravityMode).toBe(true)
  })

  it('adds a notification and removes it after its timeout', () => {
    const store = useUiStore()

    store.notify('Готово')

    expect(store.toasts).toEqual([
      { id: 'toast-1', message: 'Готово', type: 'info' },
    ])

    vi.advanceTimersByTime(3199)
    expect(store.toasts).toHaveLength(1)

    vi.advanceTimersByTime(1)
    expect(store.toasts).toEqual([])
  })

  it('supports explicit notification types and manual removal', () => {
    const store = useUiStore()

    store.notify('Помилка', 'error')
    expect(store.toasts[0]).toEqual({
      id: 'toast-1',
      message: 'Помилка',
      type: 'error',
    })

    store.removeToast('toast-1')
    expect(store.toasts).toEqual([])
  })
})
