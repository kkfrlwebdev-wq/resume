<script setup>
import { RouterLink } from 'vue-router'
import { Settings } from '@lucide/vue'
import { navigation } from '@/data/navigation'
</script>

<template>
  <aside class="app-sidebar" :aria-label="$t('nav.sidebar')">
    <nav>
      <RouterLink v-for="item in navigation" :key="item.to" :to="item.to" :aria-label="item.label">
        <component :is="item.icon" aria-hidden="true" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
    <RouterLink class="settings-link" to="/desktop" :aria-label="$t('nav.interactiveSpace')">
      <Settings aria-hidden="true" />
      <span>{{ $t('nav.space') }}</span>
    </RouterLink>
  </aside>
</template>

<style lang="scss" scoped>
.app-sidebar {
  position: relative;
  z-index: 18;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: .875rem .625rem 1.125rem;
  border-right: .0625rem solid rgba(148, 183, 199, 0.14);

  nav { display: grid; gap: .75rem; }

  a {
    position: relative;
    display: grid;
    width: 2.75rem;
    height: 2.75rem;
    place-items: center;
    border: .0625rem solid transparent;
    border-radius: .5625rem;
    color: var(--color-muted);
    transition: var(--transition);

    svg { width: 1.125rem; }
    span {
      position: absolute;
      left: calc(100% + .75rem);
      padding: .3125rem .5625rem;
      border: .0625rem solid var(--color-border);
      border-radius: .375rem;
      background: #071117;
      color: var(--color-text);
      font-size: 0.72rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transform: translateX(-.25rem);
      transition: var(--transition);
    }

    &:hover span,
    &:focus-visible span { opacity: 1; transform: translateX(0); }
    &:hover { color: var(--color-primary); }
    &.router-link-active {
      border-color: rgba(0, 231, 240, 0.12);
      background: rgba(0, 231, 240, 0.12);
      color: var(--color-primary);
      box-shadow: 0 0 1.25rem rgba(0, 231, 240, 0.06);
    }
  }
}

@media (max-width: 56.25em) { .app-sidebar { display: none; } }
</style>
