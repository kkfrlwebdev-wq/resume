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
  gap: .75rem;

  a {
    display: grid;
    width: 2.5rem;
    height: 2.5rem;
    place-items: center;
    border: .0625rem solid var(--color-border);
    border-radius: .5625rem;
    background: rgba(255, 255, 255, .025);
    color: #dce4e7;
    transition: var(--transition);

    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      transform: translateY(-.125rem);
    }

    svg {
      width: 1.1875rem;
    }
  }

  @media (max-width:51.125em) {

    justify-content: center;
    align-items: center;

  }
}
</style>
