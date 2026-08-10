<script setup>
import { profile } from '@/data/profile'
import SocialIcon from './SocialIcon.vue'
</script>

<template>
  <ul class="social-links" :aria-label="$t('accessibility.social')">
    <li v-for="item in profile.social" :key="item.label">
      <a :href="item.href" target="_blank" rel="noopener noreferrer" :aria-label="item.label">
        <SocialIcon :name="item.label" aria-hidden="true" />
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.social-links {
  display: flex;
  gap: 12px;

  a {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: 9px;
    background: rgba(255,255,255,.025);
    color: #dce4e7;
    transition: var(--transition);

    &:hover { border-color: var(--color-primary); color: var(--color-primary); transform: translateY(-2px); }
    svg { width: 19px; }
  }
}
</style>
