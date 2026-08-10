import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sendContactMessage } from '@/services/contactService'

describe('contactService', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key')
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('submits contact data to Web3Forms', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    })

    await expect(sendContactMessage({
      name: 'Ivan',
      email: 'ivan@example.com',
      message: 'Project details',
    })).resolves.toEqual({ ok: true, demo: false })

    expect(fetch).toHaveBeenCalledOnce()
    const [url, options] = fetch.mock.calls[0]
    expect(url).toBe('https://api.web3forms.com/submit')
    expect(options.method).toBe('POST')
    expect(JSON.parse(options.body)).toMatchObject({
      access_key: 'test-access-key',
      name: 'Ivan',
      email: 'ivan@example.com',
      message: 'Project details',
      botcheck: false,
    })
  })

  it('rejects an unsuccessful Web3Forms response', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: false, message: 'Rejected' }),
    })

    await expect(sendContactMessage({})).rejects.toThrow('Rejected')
  })

  it('does not submit without an access key', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '')

    await expect(sendContactMessage({})).rejects.toThrow('access key')
    expect(fetch).not.toHaveBeenCalled()
  })
})
