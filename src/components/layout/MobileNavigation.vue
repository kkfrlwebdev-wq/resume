<script setup>
import { navigation } from '@/data/navigation'
</script>

<template>
  <nav class="mobile-nav" :aria-label="$t('nav.mobile')">
    <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">
      <component :is="item.icon" aria-hidden="true" />
      <span>{{ $t(item.labelKey) }}</span>
    </RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
.mobile-nav {
  position: fixed;
  z-index: 80;
  right: auto;
  bottom: .625rem;
  left: .625rem;
  width: calc(100vw - 1.25rem);
  max-width: calc(100vw - 1.25rem);
  min-width: 0;
  display: none;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  padding: .375rem;
  border: .0625rem solid var(--color-border);
  border-radius: .9375rem;
  background: rgba(5, 14, 20, 0.93);
  box-shadow: 0 .9375rem 3.125rem rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.125rem);

  a {
    min-width: 0;
    min-height: 3.25rem;
    display: grid;
    place-items: center;
    gap: .125rem;
    border-radius: .625rem;
    color: var(--color-muted);

    svg { width: 1.1875rem; }
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

@media (max-width: 56.25em) { .mobile-nav { display: grid; } }
@media (min-width: 56.3125em) { .mobile-nav { display: none; } }
</style>
