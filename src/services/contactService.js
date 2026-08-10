export async function sendContactMessage(payload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey) throw new Error('Web3Forms access key is not configured')

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: 'New message from portfolio',
      botcheck: false,
      ...payload,
    }),
  })

  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'Web3Forms could not send the message')
  }

  return { ok: true, demo: false }
}
