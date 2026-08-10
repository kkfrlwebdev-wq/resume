<script setup>
import { ArrowRight, Download, LayoutGrid } from '@lucide/vue'
import BaseButton from '@/components/base/BaseButton.vue'
import HeroVisual from '@/components/home/HeroVisual.vue'
import SocialLinks from '@/components/home/SocialLinks.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <div class="home-view page-container">
    <section class="hero">
      <div class="hero__copy">
        <span class="hero__eyebrow">Привіт, я</span>
        <h1>{{ profile.role }}</h1>
        <p>{{ profile.intro }}</p>

        <div class="hero__actions">
          <BaseButton to="/portfolio">
            <template #icon>
              <LayoutGrid aria-hidden="true" />
            </template>
            Переглянути роботи
            <template #trailing>
              <ArrowRight aria-hidden="true" />
            </template>
          </BaseButton>
          <BaseButton href="/resume.html" variant="outline">
            <template #icon>
              <Download aria-hidden="true" />
            </template>
            Відкрити резюме
          </BaseButton>
        </div>

        <SocialLinks />
      </div>

      <HeroVisual />
    </section>

    <aside class="shortcut-hint" aria-label="Підказка">
      <span>Порада: активуйте режим невагомості</span>
      <kbd>Ctrl</kbd><b>+</b><kbd>Shift</kbd><b>+</b><kbd>D</kbd>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  position: relative;
  min-height: calc(100vh - var(--header-height) - 30px);
  min-height: calc(100dvh - var(--header-height) - 30px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(460px, 1.1fr);
  align-items: center;
  gap: clamp(30px, 5vw, 80px);

  > * {
    min-width: 0;
  }

  &__copy { position: relative; z-index: 2; }
  &__eyebrow { color: var(--color-primary); font-weight: 800; }

  h1 {
    max-width: 650px;
    margin-top: 8px;
    font-size: clamp(3rem, 6.5vw, 6.2rem);
    line-height: 0.96;
    letter-spacing: -0.06em;
  }

  p {
    max-width: 470px;
    margin-top: 24px;
    color: var(--color-muted);
    font-size: clamp(1rem, 1.5vw, 1.13rem);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 30px 0 clamp(40px, 7vw, 86px);
  }
}

.shortcut-hint {
  position: absolute;
  right: 26px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-muted);
  font-size: 0.72rem;

  span { margin-right: 6px; }
  kbd {
    min-width: 24px;
    padding: 2px 5px;
    border: 1px solid rgba(255, 208, 0, 0.45);
    border-radius: 4px;
    background: rgba(255, 208, 0, 0.07);
    color: var(--color-secondary);
    font-family: var(--font-mono);
    text-align: center;
  }
  b { font-weight: 400; }
}

@media (max-width: 1050px) {
  .hero { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 820px) {
  .home-view { padding-top: 54px; }
  .hero { grid-template-columns: minmax(0, 1fr); }
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 36px;
  }
  .hero__actions :deep(.base-button) { width: 100%; }
  .shortcut-hint { display: none; }
}
</style>
