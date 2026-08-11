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
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 3vw, 2rem);
  overflow: hidden;
  border: .0625rem solid var(--color-border);
  border-radius: var(--radius-md);
  background: linear-gradient(145deg, rgba(10, 21, 28, .92), rgba(4, 11, 16, .82));
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);

  &:hover { transform: translateY(-.3125rem); border-color: var(--color-border-bright); box-shadow: var(--shadow-glow); }
  &__icon { width: 2.4375rem; height: 2.4375rem; margin-bottom: 1.75rem; color: var(--color-primary); }
  &__icon.yellow { color: var(--color-secondary); }
  h2 { font-size: 1.12rem; }
  p { margin-top: .8125rem; color: var(--color-muted); font-size: .88rem; }
  ul { display: grid; gap: .4375rem; margin-top: auto; padding-top: 1.5625rem; }
  li { display: flex; align-items: center; gap: .5rem; color: #bdc8cd; font-size: .75rem; }
  li svg { width: .875rem; color: var(--color-primary); }
}
</style>
