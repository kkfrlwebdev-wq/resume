<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
import ToastStack from '@/components/base/ToastStack.vue'
import { useUiStore } from '@/stores/uiStore'
import { useAchievementsStore } from '@/stores/achievementsStore'

const router = useRouter()
const route = useRoute()
const ui = useUiStore()
const achievements = useAchievementsStore()

function handleShortcut(event) {
  if (event.ctrlKey && event.shiftKey && event.code === 'KeyD') {
    event.preventDefault()
    ui.toggleMatrix()
    if (ui.matrixMode && achievements.unlock('matrix')) ui.notify('Досягнення відкрито: Матриця', 'success')
  }

  if (event.ctrlKey && event.shiftKey && event.code === 'KeyT') {
    event.preventDefault()
    router.push('/desktop?app=terminal')
  }
}

onMounted(() => window.addEventListener('keydown', handleShortcut))
onUnmounted(() => window.removeEventListener('keydown', handleShortcut))

watch(
  () => route.name,
  (name) => achievements.visit(name),
  { immediate: true },
)
</script>

<template>
  <div :class="['site-root', { 'matrix-mode': ui.matrixMode }]">
    <a class="skip-link" href="#main-content">Перейти до вмісту</a>
    <div v-if="ui.matrixMode" class="matrix-rain" aria-hidden="true"></div>
    <AppShell>
      <RouterView v-slot="{ Component, route: viewRoute }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="viewRoute.path" />
        </Transition>
      </RouterView>
    </AppShell>
    <ToastStack />
  </div>
</template>
