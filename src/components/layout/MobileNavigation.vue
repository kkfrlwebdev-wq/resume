<script setup>
import { navigation } from '@/data/navigation'
</script>

<template>
  <nav class="mobile-nav" aria-label="Мобільна навігація">
    <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">
      <component :is="item.icon" aria-hidden="true" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
.mobile-nav {
  position: fixed;
  z-index: 80;
  right: auto;
  bottom: 10px;
  left: 10px;
  width: calc(100vw - 20px);
  max-width: calc(100vw - 20px);
  min-width: 0;
  display: none;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  padding: 6px;
  border: 1px solid var(--color-border);
  border-radius: 15px;
  background: rgba(5, 14, 20, 0.93);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(18px);

  a {
    min-width: 0;
    min-height: 52px;
    display: grid;
    place-items: center;
    gap: 2px;
    border-radius: 10px;
    color: var(--color-muted);

    svg { width: 19px; }
    span {
      max-width: 100%;
      overflow: hidden;
      font-size: 0.58rem;
      line-height: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.router-link-active { background: rgba(0,231,240,.1); color: var(--color-primary); }
  }
}

@media (max-width: 900px) { .mobile-nav { display: grid; } }
@media (min-width: 901px) { .mobile-nav { display: none; } }
</style>
