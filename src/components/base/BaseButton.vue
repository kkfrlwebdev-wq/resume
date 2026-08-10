<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: { type: String, default: 'primary' },
  download: { type: [String, Boolean], default: false },
})

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :download="download"
    :class="['base-button', `base-button--${variant}`]"
  >
    <slot name="icon"></slot>
    <span><slot></slot></span>
    <slot name="trailing"></slot>
  </component>
</template>

<style lang="scss" scoped>
.base-button {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 11px 18px;
  border: 1px solid transparent;
  border-radius: 9px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 750;
  line-height: 1;
  transition: transform var(--transition), border-color var(--transition), background var(--transition), box-shadow var(--transition);

  :deep(svg) { width: 18px; height: 18px; }

  &:hover { transform: translateY(-2px); }

  &--primary {
    background: linear-gradient(135deg, #00d8e1, #00b8c5);
    color: #001013;
    box-shadow: 0 8px 26px rgba(0, 215, 225, 0.16);

    &:hover { box-shadow: 0 10px 34px rgba(0, 215, 225, 0.3); }
  }

  &--outline {
    border-color: rgba(0, 231, 240, 0.38);
    background: rgba(3, 11, 16, 0.7);
    color: var(--color-primary);

    &:hover { border-color: var(--color-primary); background: rgba(0, 231, 240, 0.07); }
  }

  &--ghost {
    border-color: var(--color-border);
    background: transparent;
    color: var(--color-text);

    &:hover { border-color: rgba(255, 255, 255, 0.28); background: rgba(255, 255, 255, 0.04); }
  }
}
</style>
