<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  title: { type: String, required: true },
  size: { type: String, default: 'large' },
})

const emit = defineEmits(['close'])
const windowElement = ref(null)
const closeButton = ref(null)
const titleId = `interactive-window-${Math.random().toString(36).slice(2, 9)}`
let previouslyFocused = null

function getFocusableElements() {
  if (!windowElement.value) return []

  return [...windowElement.value.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )].filter((element) => !element.hasAttribute('hidden'))
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }

  if (event.key !== 'Tab') return

  const focusable = getFocusableElements()
  if (focusable.length === 0) {
    event.preventDefault()
    windowElement.value?.focus()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(async () => {
  previouslyFocused = document.activeElement
  document.addEventListener('keydown', handleKeydown)
  await nextTick()
  closeButton.value?.focus()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  previouslyFocused?.focus?.()
})
</script>

<template>
  <div class="window-overlay">
    <section
      ref="windowElement"
      :class="['interactive-window', `interactive-window--${props.size}`]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      tabindex="-1"
    >
      <header class="interactive-window__bar">
        <div class="interactive-window__identity">
          <slot name="icon"></slot>
          <h2 :id="titleId">
            {{ title }}
          </h2>
        </div>

        <div class="interactive-window__controls">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <button ref="closeButton" type="button" :aria-label="$t('common.closeWindow')" @click="emit('close')">
            <X aria-hidden="true" />
          </button>
        </div>
      </header>

      <div class="interactive-window__content">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.window-overlay {
  position: absolute;
  z-index: 30;
  inset: 0;
  display: grid;
  place-items: center;
  padding: clamp(12px, 3vw, 34px);
  background: rgba(0, 5, 12, 0.58);
  backdrop-filter: blur(8px);
}

.interactive-window {
  width: min(100%, 920px);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(172, 209, 236, 0.26);
  border-radius: 14px;
  background: rgba(6, 14, 22, 0.96);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.58), 0 0 0 1px rgba(0, 231, 240, 0.04);

  &--medium { max-width: 760px; }
  &--large { max-width: 980px; }
}

.interactive-window__bar {
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-left: 15px;
  border-bottom: 1px solid rgba(172, 209, 236, 0.14);
  background: linear-gradient(180deg, rgba(28, 42, 54, 0.92), rgba(13, 24, 34, 0.92));
  user-select: none;
}

.interactive-window__identity {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 9px;

  :deep(svg) {
    width: 17px;
    color: var(--color-primary);
  }

  h2 {
    overflow: hidden;
    font-size: 0.82rem;
    font-weight: 650;
    letter-spacing: 0.01em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.interactive-window__controls {
  align-self: stretch;
  display: flex;

  > span,
  > button {
    width: 46px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
  }

  > span::before {
    width: 10px;
    height: 1px;
    content: '';
    background: var(--color-muted);
  }

  > span:nth-child(2)::before {
    height: 9px;
    border: 1px solid var(--color-muted);
    background: transparent;
  }

  button {
    cursor: pointer;
    transition: background var(--transition);

    &:hover { background: #c42b3b; }

    svg { width: 17px; }
  }
}

.interactive-window__content {
  min-height: 0;
  flex: 1;
  overflow: auto;
}

@media (max-width: 640px) {
  .window-overlay { padding: 0; }

  .interactive-window {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    border: 0;
    border-radius: 0;
  }

  .interactive-window__controls > span { display: none; }
}
</style>
