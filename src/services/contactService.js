export async function sendContactMessage(payload) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

  if (!endpoint) {
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    return { ok: true, demo: true }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error('Не вдалося надіслати повідомлення')
  return { ok: true, demo: false }
}
