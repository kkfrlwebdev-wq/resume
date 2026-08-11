<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: { type: String, default: 'primary' },
  download: { type: [String, Boolean], default: false },
  target: { type: String, default: null },
  rel: { type: String, default: null },
})

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :download="download === false ? null : download"
    :target="target"
    :rel="rel"
    :class="['base-button', `base-button--${variant}`]"
  >
    <slot name="icon"></slot>
    <span><slot></slot></span>
    <slot name="trailing"></slot>
  </component>
</template>

<style lang="scss" scoped>
.base-button {
  min-height: 2.875rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .625rem;
  padding: .6875rem 1.125rem;
  border: .0625rem solid transparent;
  border-radius: .5625rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 750;
  line-height: 1;
  transition: transform var(--transition), border-color var(--transition), background var(--transition), box-shadow var(--transition);

  :deep(svg) { width: 1.125rem; height: 1.125rem; }

  &:hover { transform: translateY(-.125rem); }

  &--primary {
    background: linear-gradient(135deg, #00d8e1, #00b8c5);
    color: #001013;
    box-shadow: 0 .5rem 1.625rem rgba(0, 215, 225, 0.16);

    &:hover { box-shadow: 0 .625rem 2.125rem rgba(0, 215, 225, 0.3); }
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
