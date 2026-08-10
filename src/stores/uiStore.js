import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

export const useUiStore = defineStore('ui', () => {
  const zeroGravityMode = ref(localStorage.getItem('portfolio-zero-gravity') === 'true')
  const toasts = ref([])

  function toggleZeroGravity() {
    zeroGravityMode.value = !zeroGravityMode.value
    localStorage.setItem('portfolio-zero-gravity', String(zeroGravityMode.value))
    notify(i18n.global.t(zeroGravityMode.value ? 'notifications.gravityOn' : 'notifications.gravityOff'), 'success')
  }

  function notify(message, type = 'info') {
    const id = crypto.randomUUID()
    toasts.value.push({ id, message, type })
    window.setTimeout(() => removeToast(id), 3200)
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return { zeroGravityMode, toasts, toggleZeroGravity, notify, removeToast }
})
