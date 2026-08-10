import { reactive, ref } from 'vue'
import { i18n } from '@/i18n'
import { sendContactMessage } from '@/services/contactService'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm() {
  const { t } = i18n.global
  const form = reactive({ name: '', email: '', message: '', company: '' })
  const errors = reactive({ name: '', email: '', message: '' })
  const isSubmitting = ref(false)

  function validate() {
    errors.name = form.name.trim().length >= 2 ? '' : t('validation.name')
    errors.email = emailPattern.test(form.email.trim()) ? '' : t('validation.email')
    errors.message = form.message.trim().length >= 10 ? '' : t('validation.message')
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
