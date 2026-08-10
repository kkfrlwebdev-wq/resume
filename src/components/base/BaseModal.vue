<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  open: Boolean,
  title: { type: String, default: '' },
})

const emit = defineEmits(['close'])
const dialog = ref(null)
let previousFocus = null

function close() {
  emit('close')
}

function onKeydown(event) {
  if (event.key === 'Escape' && props.open) close()
  if (event.key !== 'Tab' || !props.open || !dialog.value) return

  const focusable = dialog.value.querySelectorAll('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])')
  if (!focusable.length) return
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

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      previousFocus = document.activeElement
      document.body.style.overflow = 'hidden'
      await nextTick()
      dialog.value?.querySelector('button')?.focus()
    } else {
      document.body.style.overflow = ''
      previousFocus?.focus?.()
    }
  },
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-layer" role="presentation" @mousedown.self="close">
        <section ref="dialog" class="modal" role="dialog" aria-modal="true" :aria-label="title">
          <button class="modal__close" type="button" :aria-label="$t('common.close')" @click="close">
            <X aria-hidden="true" />
          </button>
          <slot></slot>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-layer {
  position: fixed;
  z-index: 250;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 4, 7, 0.74);
  backdrop-filter: blur(12px);
}

.modal {
  position: relative;
  width: min(720px, 100%);
  max-height: min(760px, calc(100dvh - 40px));
  overflow: auto;
  border: 1px solid var(--color-border-bright);
  border-radius: var(--radius-lg);
  background: #071118;
  box-shadow: 0 28px 100px rgba(0, 0, 0, 0.7), var(--shadow-glow);

  &__close {
    position: absolute;
    z-index: 2;
    top: 14px;
    right: 14px;
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: rgba(3, 10, 15, 0.82);
    cursor: pointer;
    svg { width: 18px; }
  }
}

.modal-enter-active,
.modal-leave-active { transition: 180ms ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-from .modal,
.modal-leave-to .modal { transform: translateY(12px) scale(.98); }
</style>
