<script setup>
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppShell from '@/components/layout/AppShell.vue'
import ToastStack from '@/components/base/ToastStack.vue'
import { useUiStore } from '@/stores/uiStore'
import { useAchievementsStore } from '@/stores/achievementsStore'

const router = useRouter()
const route = useRoute()
const ui = useUiStore()
const achievements = useAchievementsStore()
const { locale, t } = useI18n()
let zeroGravityObserver
let zeroGravityFrame
const zeroGravityItems = new Map()

const zeroGravitySelector = [
  '#main-content .section-heading > *',
  '#main-content .hero__copy > :not(.hero__actions, .social-links)',
  '#main-content .hero__actions > *',
  '#main-content .social-links > *',
  '#main-content .capability-grid > *',
  '#main-content .shortcut-hint',
  '#main-content .about-copy > :not(.statistics-list, .about-actions)',
  '#main-content .statistics-list > *',
  '#main-content .about-actions > *',
  '#main-content .profile-card__photo',
  '#main-content .profile-card dl > *',
  '#main-content .filters > *',
  '#main-content .projects-grid > *',
  '#main-content .services-grid > *',
  '#main-content .contact-info > :not(dl)',
  '#main-content .contact-info > dl > *',
  '#main-content .contact-form > h2',
  '#main-content .contact-form > p',
  '#main-content .contact-form > .form-field',
  '#main-content .contact-form > button',
  '#main-content .start-menu__heading',
  '#main-content .shortcut-grid > *',
  '#main-content .start-menu__footer > *',
  '#main-content .taskbar > :not(.taskbar__spacer)',
  '#main-content .interactive-window',
  '#main-content .not-found > :not(svg)',
].join(',')

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function randomPosition() {
  return {
    x: randomBetween(-46, 46),
    y: randomBetween(-46, 46),
    rotation: randomBetween(-3, 3),
  }
}

function animateZeroGravityItem(element, from) {
  if (!ui.zeroGravityMode || !element.isConnected) {
    zeroGravityItems.delete(element)
    return
  }

  const to = randomPosition()
  const animation = element.animate(
    [
      { translate: `${from.x}px ${from.y}px`, rotate: `${from.rotation}deg` },
      { translate: `${to.x}px ${to.y}px`, rotate: `${to.rotation}deg` },
    ],
    {
      duration: randomBetween(5600, 10400),
      easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
      fill: 'forwards',
    },
  )

  zeroGravityItems.set(element, animation)
  animation.onfinish = () => {
    if (!ui.zeroGravityMode || !element.isConnected) {
      zeroGravityItems.delete(element)
      return
    }

    element.style.translate = `${to.x}px ${to.y}px`
    element.style.rotate = `${to.rotation}deg`
    animation.cancel()
    animateZeroGravityItem(element, to)
  }
}

function prepareZeroGravityItem(element) {
  if (element.hasAttribute('data-zero-gravity-item')) return

  const initialPosition = randomPosition()
  element.setAttribute('data-zero-gravity-item', '')
  element.style.translate = `${initialPosition.x}px ${initialPosition.y}px`
  element.style.rotate = `${initialPosition.rotation}deg`
  animateZeroGravityItem(element, initialPosition)
}

function prepareZeroGravityItems() {
  if (!ui.zeroGravityMode || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.querySelectorAll(zeroGravitySelector).forEach(prepareZeroGravityItem)
}

function clearZeroGravityItems() {
  zeroGravityItems.forEach((animation, element) => {
    animation.cancel()
    element.style.removeProperty('translate')
    element.style.removeProperty('rotate')
    element.removeAttribute('data-zero-gravity-item')
  })
  zeroGravityItems.clear()

  document.querySelectorAll('[data-zero-gravity-item]').forEach((element) => {
    element.removeAttribute('data-zero-gravity-item')
    element.style.removeProperty('translate')
    element.style.removeProperty('rotate')
  })
}

async function syncZeroGravity() {
  zeroGravityObserver?.disconnect()
  cancelAnimationFrame(zeroGravityFrame)

  if (!ui.zeroGravityMode) {
    clearZeroGravityItems()
    return
  }

  await nextTick()
  prepareZeroGravityItems()
  zeroGravityObserver = new MutationObserver(() => {
    cancelAnimationFrame(zeroGravityFrame)
    zeroGravityFrame = requestAnimationFrame(prepareZeroGravityItems)
  })
  zeroGravityObserver.observe(document.querySelector('#main-content'), { childList: true, subtree: true })
}

function handleShortcut(event) {
  if (event.ctrlKey && event.shiftKey && event.code === 'KeyD') {
    event.preventDefault()
    ui.toggleZeroGravity()
    if (ui.zeroGravityMode && achievements.unlock('zero-gravity')) ui.notify(t('notifications.gravityAchievement'), 'success')
  }

  if (event.ctrlKey && event.shiftKey && event.code === 'KeyT') {
    event.preventDefault()
    router.push('/desktop?app=terminal')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleShortcut)
  syncZeroGravity()
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleShortcut)
  zeroGravityObserver?.disconnect()
  cancelAnimationFrame(zeroGravityFrame)
  clearZeroGravityItems()
})

watch(() => ui.zeroGravityMode, syncZeroGravity)

watch(
  locale,
  () => {
    document.title = `${t(route.meta.titleKey)} — ${t('profile.name')}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
  },
  { immediate: true },
)

watch(
  () => route.name,
  (name) => achievements.visit(name),
  { immediate: true },
)
</script>

<template>
  <div :class="['site-root', { 'zero-gravity-mode': ui.zeroGravityMode }]">
    <a class="skip-link" href="#main-content">{{ t('accessibility.skip') }}</a>
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
