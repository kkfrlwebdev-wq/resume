<script setup>
import { ArrowRight, Download } from '@lucide/vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ProfileCard from '@/components/about/ProfileCard.vue'
import StatisticsList from '@/components/about/StatisticsList.vue'
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
          <BaseButton href="/resume.html" variant="outline">
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
  min-height: calc(100dvh - var(--header-height) - 30px);
  display: grid;
  align-items: center;
}

.about-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(310px, 430px);
  align-items: center;
  gap: clamp(42px, 8vw, 120px);
}

.about-copy {
  container: about-copy / inline-size;
  max-width: 650px;

  .eyebrow { color: var(--color-primary); font-weight: 800; }
  h1 { margin-top: 4px; font-size: clamp(2.7rem, 6vw, 5rem); line-height: 1; letter-spacing: -.05em; }
  > p { max-width: 590px; margin-top: 18px; color: var(--color-muted); }
  .lead { color: #c7d1d5; font-size: 1.08rem; }
  :deep(.statistics-list) { margin-top: 34px; }
}

.about-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }

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
    border-top: 1px solid rgba(0, 231, 240, calc(.1 + var(--line) * .035));
    border-radius: 50%;
    transform: rotate(calc(-13deg + var(--line) * 2deg));
  }
}

@media (max-width: 820px) {
  .about-grid { grid-template-columns: 1fr; }
  .profile-card {
    width: 100%;
    max-width: none;
    justify-self: stretch;
  }
  .profile-card :deep(.profile-card__photo) { aspect-ratio: 16 / 10; }
}

@media (max-width: 520px) {
  .profile-card :deep(.profile-card__photo) { aspect-ratio: 4 / 3; }
}
</style>
