<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AchievementsPanel from '@/components/interactive/AchievementsPanel.vue'
import DesktopPanel from '@/components/interactive/DesktopPanel.vue'
import MiniGame from '@/components/interactive/MiniGame.vue'
import TerminalWindow from '@/components/interactive/TerminalWindow.vue'

const route = useRoute()
const router = useRouter()
const activeApp = ref(null)

const applications = {
  terminal: TerminalWindow,
  achievements: AchievementsPanel,
  game: MiniGame,
}

const activeComponent = computed(() => applications[activeApp.value] || null)

watch(
  () => route.query.app,
  (queryApp) => {
    const app = Array.isArray(queryApp) ? queryApp[0] : queryApp
    activeApp.value = Object.hasOwn(applications, app) ? app : null
  },
  { immediate: true },
)

function openApp(app) {
  if (!Object.hasOwn(applications, app)) return
  activeApp.value = app
  router.replace({ query: { ...route.query, app } })
}

function closeApp() {
  activeApp.value = null
  const query = { ...route.query }
  delete query.app
  router.replace({ query })
}
</script>

<template>
  <div class="desktop-view">
    <h1 class="sr-only">
      {{ $t('desktop.title') }}
    </h1>
    <DesktopPanel :active-app="activeApp" @open-app="openApp" />

    <Transition name="window-pop">
      <component :is="activeComponent" v-if="activeComponent" :key="activeApp" @close="closeApp" />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.desktop-view {
  position: relative;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.window-pop-enter-active,
.window-pop-leave-active {
  transition: opacity 160ms ease;

  :deep(.interactive-window) {
    transition: transform 180ms ease, opacity 160ms ease;
  }
}

.window-pop-enter-from,
.window-pop-leave-to {
  opacity: 0;

  :deep(.interactive-window) {
    opacity: 0;
    transform: translateY(.875rem) scale(0.97);
  }
}
</style>
