import { reactive, ref } from 'vue'
import { sendContactMessage } from '@/services/contactService'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm() {
  const form = reactive({ name: '', email: '', message: '', company: '' })
  const errors = reactive({ name: '', email: '', message: '' })
  const isSubmitting = ref(false)

  function validate() {
    errors.name = form.name.trim().length >= 2 ? '' : 'Введіть щонайменше 2 символи'
    errors.email = emailPattern.test(form.email.trim()) ? '' : 'Введіть коректну email-адресу'
    errors.message = form.message.trim().length >= 10 ? '' : 'Повідомлення має містити щонайменше 10 символів'
    return !errors.name && !errors.email && !errors.message
  }

  function reset() {
    form.name = ''
    form.email = ''
    form.message = ''
    form.company = ''
  }

  async function submit() {
    if (!validate() || form.company) return { ok: false }
    isSubmitting.value = true

    try {
      const result = await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
      reset()
      return result
    } finally {
      isSubmitting.value = false
    }
  }

  return { form, errors, isSubmitting, validate, submit }
}
