<script setup>
import { ArrowRight, Download, LayoutGrid } from '@lucide/vue'
import BaseButton from '@/components/base/BaseButton.vue'
import HeroVisual from '@/components/home/HeroVisual.vue'
import SocialLinks from '@/components/home/SocialLinks.vue'

const resumeUrl = `${import.meta.env.BASE_URL}resume.html`
</script>

<template>
  <div class="home-view page-container">
    <section class="hero">
      <div class="hero__copy">
        <span class="hero__eyebrow">{{ $t('home.hello') }}</span>
        <h1>{{ $t('profile.role') }}</h1>
        <p>{{ $t('profile.intro') }}</p>

        <div class="hero__actions">
          <BaseButton to="/portfolio">
            <template #icon>
              <LayoutGrid aria-hidden="true" />
            </template>
            {{ $t('home.viewWork') }}
            <template #trailing>
              <ArrowRight aria-hidden="true" />
            </template>
          </BaseButton>
          <BaseButton :href="resumeUrl" target="_blank" rel="noopener noreferrer" variant="outline">
            <template #icon>
              <Download aria-hidden="true" />
            </template>
            {{ $t('home.openResume') }}
          </BaseButton>
        </div>

        <SocialLinks />
      </div>

      <HeroVisual />
    </section>

    <aside class="shortcut-hint" :aria-label="$t('home.hintLabel')">
      <span>{{ $t('home.hint') }}</span>
      <kbd>Ctrl</kbd><b>+</b><kbd>Shift</kbd><b>+</b><kbd>D</kbd>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  position: relative;
  min-height: calc(100vh - var(--header-height) - 1.875rem);
  min-height: calc(100dvh - var(--header-height) - 1.875rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(28.75rem, 1.1fr);
  align-items: center;
  gap: clamp(1.875rem, 5vw, 5rem);

  > * {
    min-width: 0;
  }

  &__copy { position: relative; z-index: 2; }
  &__eyebrow { color: var(--color-primary); font-weight: 800; }

  h1 {
    max-width: 40.625rem;
    margin-top: .5rem;
    font-size: clamp(3rem, 6.5vw, 6.2rem);
    line-height: 0.96;
    letter-spacing: -0.06em;
  }

  p {
    max-width: 29.375rem;
    margin-top: 1.5rem;
    color: var(--color-muted);
    font-size: clamp(1rem, 1.5vw, 1.13rem);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: .75rem;
    margin: 1.875rem 0 clamp(2.5rem, 7vw, 5.375rem);
  }
}

.shortcut-hint {
  position: absolute;
  right: 1.625rem;
  bottom: 1rem;
  display: flex;
  align-items: center;
  gap: .375rem;
  color: var(--color-muted);
  font-size: 0.72rem;

  span { margin-right: .375rem; }
  kbd {
    min-width: 1.5rem;
    padding: .125rem .3125rem;
    border: .0625rem solid rgba(255, 208, 0, 0.45);
    border-radius: .25rem;
    background: rgba(255, 208, 0, 0.07);
    color: var(--color-secondary);
    font-family: var(--font-mono);
    text-align: center;
  }
  b { font-weight: 400; }
}

@media (max-width: 65.625em) {
  .hero { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 51.25em) {
  .home-view { padding-top: 3.375rem; }
  .hero { grid-template-columns: minmax(0, 1fr); }
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 2.25rem;
  }
  .hero__actions :deep(.base-button) { width: 100%; }
  .shortcut-hint { display: none; }
}
</style>
