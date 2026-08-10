<script setup>
import { profile } from '@/data/profile'
</script>

<template>
  <dl class="statistics-list">
    <div v-for="item in profile.stats" :key="item.labelKey">
      <dt>{{ item.value }}</dt>
      <dd>{{ $t(item.labelKey) }}</dd>
    </div>
  </dl>
</template>

<style lang="scss" scoped>
.statistics-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  div {
    min-width: 0;
    min-height: 100px;
    padding: 19px;
    border: 1px solid rgba(148, 183, 199, 0.12);
    border-radius: 12px;
    background: linear-gradient(145deg, rgba(10, 22, 29, .85), rgba(5, 13, 18, .75));
  }

  dt { color: var(--color-primary); font-size: clamp(1.55rem, 3vw, 2.3rem); font-weight: 850; line-height: 1; }
  dd {
    margin: 13px 0 0;
    color: var(--color-muted);
    font-size: .75rem;
    line-height: 1.55;
    text-transform: lowercase;
    text-wrap: balance;
  }
}

@container about-copy (max-width: 440px) {
  .statistics-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .statistics-list div:last-child:nth-child(odd) { grid-column: 1 / -1; }
}

@container about-copy (max-width: 300px) {
  .statistics-list { grid-template-columns: 1fr; }
  .statistics-list div:last-child:nth-child(odd) { grid-column: auto; }
}

@media (max-width: 540px) {
  .statistics-list { grid-template-columns: 1fr; }
  .statistics-list div { min-height: 0; display: flex; align-items: center; justify-content: space-between; }
  .statistics-list dd { margin: 0; }
}
</style>
