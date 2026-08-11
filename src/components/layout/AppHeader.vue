<script setup>
import { RouterLink } from 'vue-router'
import { Gamepad2 } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import CodeLogo from './CodeLogo.vue'
import { navigation } from '@/data/navigation'
import { useAchievementsStore } from '@/stores/achievementsStore'
import { useUiStore } from '@/stores/uiStore'
import LanguageSwitcher from './LanguageSwitcher.vue'

const achievements = useAchievementsStore()
const ui = useUiStore()
const { t } = useI18n()
let logoClicks = 0

function handleLogoClick() {
  logoClicks += 1
  if (logoClicks === 5 && achievements.unlock('hunter')) {
    ui.notify(t('notifications.hunter'), 'success')
  }
}
</script>

<template>
  <header class="app-header">
    <RouterLink class="brand" to="/" :aria-label="`${$t('profile.name')} — ${$t('nav.home')}`" @click="handleLogoClick">
      <CodeLogo />
      <span>Kolya Kolchenko</span>
    </RouterLink>

    <nav class="top-nav" :aria-label="$t('nav.main')">
      <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">
        {{ $t(item.labelKey) }}
      </RouterLink>
    </nav>

    <div class="header-actions">
      <LanguageSwitcher />
      <RouterLink class="game-link" to="/desktop?app=game" :aria-label="$t('nav.openGame')">
        <Gamepad2 />
      </RouterLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  position: relative;
  z-index: 20;
  min-height: var(--header-height);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
  padding: 0 clamp(1.125rem, 3vw, 2.125rem);
  border-bottom: .0625rem solid rgba(148, 183, 199, 0.12);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 1.0625rem;
  width: max-content;
  font-size: 0.83rem;
  font-weight: 800;
}

.top-nav {
  display: flex;
  align-items: center;
  gap: clamp(.75rem, 2.3vw, 2.125rem);

  a {
    position: relative;
    padding: .5625rem .5rem;
    color: #b8c2c7;
    font-size: 0.8rem;
    transition: color var(--transition);

    &::after {
      position: absolute;
      right: .5rem;
      bottom: .125rem;
      left: .5rem;
      height: .0625rem;
      background: var(--color-primary);
      content: '';
      transform: scaleX(0);
      transition: transform var(--transition);
    }

    &:hover,
    &.router-link-active { color: var(--color-primary); }
    &.router-link-active::after { transform: scaleX(1); }
  }
}

.game-link {
  display: grid;
  width: 2.375rem;
  height: 2.375rem;
  place-items: center;
  border: .0625rem solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.025);
  color: var(--color-primary);

  svg { width: 1.125rem; }
  &:hover { border-color: var(--color-border-bright); }
}

.header-actions { justify-self: end; display: flex; align-items: center; gap: .875rem; }

@media (max-width: 56.25em) {
  .app-header { grid-template-columns: 1fr auto; }
  .top-nav { display: none; }
}

@media (max-width: 30em) {
  .app-header { gap: .625rem; padding-inline: .875rem; }
  .brand { gap: .625rem; font-size: 0.72rem; }
  .header-actions { gap: .4375rem; }
}
</style>
