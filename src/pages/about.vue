<script setup>
import { ArrowRight, Download } from '@lucide/vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ProfileCard from '@/components/about/ProfileCard.vue'
import StatisticsList from '@/components/about/StatisticsList.vue'

const resumeUrl = `${import.meta.env.BASE_URL}resume.html`
</script>

<template>
  <div class="about-view page-container">
    <div class="about-grid">
      <section class="about-copy">
        <span class="eyebrow">{{ $t('about.eyebrow') }}</span>
        <h1>{{ $t('about.title') }}</h1>
        <p class="lead">
          {{ $t('profile.about') }}
        </p>
        <p>{{ $t('profile.aboutExtra') }}</p>

        <StatisticsList />

        <div class="about-actions">
          <BaseButton :href="resumeUrl" target="_blank" rel="noopener noreferrer" variant="outline">
            <template #icon>
              <Download aria-hidden="true" />
            </template>
            {{ $t('home.openResume') }}
          </BaseButton>
          <BaseButton to="/contact" variant="ghost">
            {{ $t('about.discuss') }}
            <template #trailing>
              <ArrowRight aria-hidden="true" />
            </template>
          </BaseButton>
        </div>
      </section>

      <ProfileCard />
    </div>

    <div class="wave-lines" aria-hidden="true">
      <i v-for="index in 7" :key="index" :style="{ '--line': index }"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-view {
  position: relative;
  min-height: calc(100dvh - var(--header-height) - 1.875rem);
  display: grid;
  align-items: center;
}

.about-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(19.375rem, 26.875rem);
  align-items: center;
  gap: clamp(2.625rem, 8vw, 7.5rem);
}

.about-copy {
  container: about-copy / inline-size;
  max-width: 40.625rem;

  .eyebrow { color: var(--color-primary); font-weight: 800; }
  h1 { margin-top: .25rem; font-size: clamp(2.7rem, 6vw, 5rem); line-height: 1; letter-spacing: -.05em; }
  > p { max-width: 36.875rem; margin-top: 1.125rem; color: var(--color-muted); }
  .lead { color: #c7d1d5; font-size: 1.08rem; }
  :deep(.statistics-list) { margin-top: 2.125rem; }
}

.about-actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.5rem; }

.wave-lines {
  position: absolute;
  z-index: 0;
  top: 10%;
  right: -8%;
  width: 60%;
  height: 60%;
  opacity: .4;
  pointer-events: none;

  i {
    position: absolute;
    inset: calc(var(--line) * 4%);
    border-top: .0625rem solid rgba(0, 231, 240, calc(.1 + var(--line) * .035));
    border-radius: 50%;
    transform: rotate(calc(-13deg + var(--line) * 2deg));
  }
}

@media (max-width: 51.25em) {
  .about-grid { grid-template-columns: 1fr; }
  .profile-card {
    width: 100%;
    max-width: none;
    justify-self: stretch;
  }
}

@media (max-width: 32.5em) {
  .profile-card :deep(.profile-card__photo) { aspect-ratio: 4 / 3; }
}
</style>
