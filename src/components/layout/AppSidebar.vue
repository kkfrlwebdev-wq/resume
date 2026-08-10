<script setup>
import { RouterLink } from 'vue-router'
import { Settings } from '@lucide/vue'
import { navigation } from '@/data/navigation'
</script>

<template>
  <aside class="app-sidebar" aria-label="Бічна навігація">
    <nav>
      <RouterLink v-for="item in navigation" :key="item.to" :to="item.to" :aria-label="item.label">
        <component :is="item.icon" aria-hidden="true" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
    <RouterLink class="settings-link" to="/desktop" aria-label="Інтерактивний простір">
      <Settings aria-hidden="true" />
      <span>Простір</span>
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
  padding: 14px 10px 18px;
  border-right: 1px solid rgba(148, 183, 199, 0.14);

  nav { display: grid; gap: 12px; }

  a {
    position: relative;
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid transparent;
    border-radius: 9px;
    color: var(--color-muted);
    transition: var(--transition);

    svg { width: 18px; }
    span {
      position: absolute;
      left: calc(100% + 12px);
      padding: 5px 9px;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      background: #071117;
      color: var(--color-text);
      font-size: 0.72rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transform: translateX(-4px);
      transition: var(--transition);
    }

    &:hover span,
    &:focus-visible span { opacity: 1; transform: translateX(0); }
    &:hover { color: var(--color-primary); }
    &.router-link-active {
      border-color: rgba(0, 231, 240, 0.12);
      background: rgba(0, 231, 240, 0.12);
      color: var(--color-primary);
      box-shadow: 0 0 20px rgba(0, 231, 240, 0.06);
    }
  }
}

@media (max-width: 900px) { .app-sidebar { display: none; } }
</style>
