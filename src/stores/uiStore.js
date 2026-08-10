import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const matrixMode = ref(localStorage.getItem('portfolio-matrix') === 'true')
  const toasts = ref([])

  function toggleMatrix() {
    matrixMode.value = !matrixMode.value
    localStorage.setItem('portfolio-matrix', String(matrixMode.value))
    notify(matrixMode.value ? 'Matrix-режим активовано' : 'Звичайний режим відновлено', 'success')
  }

  function notify(message, type = 'info') {
    const id = crypto.randomUUID()
    toasts.value.push({ id, message, type })
    window.setTimeout(() => removeToast(id), 3200)
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return { matrixMode, toasts, toggleMatrix, notify, removeToast }
})
