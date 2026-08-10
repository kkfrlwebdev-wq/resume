<script setup>
import { Check } from '@lucide/vue'

defineProps({ service: { type: Object, required: true } })
</script>

<template>
  <article class="service-card">
    <component :is="service.icon" :class="['service-card__icon', { yellow: service.accent === 'yellow' }]" aria-hidden="true" />
    <h2>{{ service.title }}</h2>
    <p>{{ service.description }}</p>
    <ul>
      <li v-for="feature in service.features" :key="feature">
        <Check aria-hidden="true" /> {{ feature }}
      </li>
    </ul>
  </article>
</template>

<style lang="scss" scoped>
.service-card {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  padding: clamp(24px, 3vw, 32px);
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: linear-gradient(145deg, rgba(10, 21, 28, .92), rgba(4, 11, 16, .82));
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);

  &:hover { transform: translateY(-5px); border-color: var(--color-border-bright); box-shadow: var(--shadow-glow); }
  &__icon { width: 39px; height: 39px; margin-bottom: 28px; color: var(--color-primary); }
  &__icon.yellow { color: var(--color-secondary); }
  h2 { font-size: 1.12rem; }
  p { margin-top: 13px; color: var(--color-muted); font-size: .88rem; }
  ul { display: grid; gap: 7px; margin-top: auto; padding-top: 25px; }
  li { display: flex; align-items: center; gap: 8px; color: #bdc8cd; font-size: .75rem; }
  li svg { width: 14px; color: var(--color-primary); }
}
</style>
