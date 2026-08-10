import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sendContactMessage } from '@/services/contactService'
import { useContactForm } from '@/composables/useContactForm'

vi.mock('@/services/contactService', () => ({
  sendContactMessage: vi.fn(),
}))

describe('useContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejects an empty form and exposes errors for every required field', () => {
    const { errors, validate } = useContactForm()

    expect(validate()).toBe(false)
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.message).toBeTruthy()
  })

  it('rejects incorrectly formatted and too short values', () => {
    const { form, errors, validate } = useContactForm()
    form.name = 'I'
    form.email = 'not-an-email'
    form.message = 'Short'

    expect(validate()).toBe(false)
    expect(errors).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
    })
  })

  it('accepts valid values and clears previous validation errors', () => {
    const { form, errors, validate } = useContactForm()

    validate()
    form.name = 'Іван Петренко'
    form.email = 'ivan@example.com'
    form.message = 'Хочу обговорити новий веб-проєкт.'

    expect(validate()).toBe(true)
    expect(errors).toEqual({ name: '', email: '', message: '' })
  })

  it('submits trimmed valid data and resets the form', async () => {
    sendContactMessage.mockResolvedValue({ ok: true, demo: false })
    const { form, isSubmitting, submit } = useContactForm()
    form.name = '  Іван Петренко  '
    form.email = '  ivan@example.com  '
    form.message = '  Повідомлення для розробника.  '

    const result = await submit()

    expect(result).toEqual({ ok: true, demo: false })
    expect(sendContactMessage).toHaveBeenCalledOnce()
    expect(sendContactMessage).toHaveBeenCalledWith({
      name: 'Іван Петренко',
      email: 'ivan@example.com',
      message: 'Повідомлення для розробника.',
    })
    expect(isSubmitting.value).toBe(false)
    expect(form).toEqual({ name: '', email: '', message: '', company: '' })
  })

  it('does not submit invalid or honeypot-filled data', async () => {
    const { form, submit } = useContactForm()
    form.name = 'Іван Петренко'
    form.email = 'ivan@example.com'
    form.message = 'Це коректне тестове повідомлення.'
    form.company = 'spam-bot'

    await expect(submit()).resolves.toEqual({ ok: false })
    expect(sendContactMessage).not.toHaveBeenCalled()
  })
})
