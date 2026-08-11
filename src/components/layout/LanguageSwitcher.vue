<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale, t } = useI18n()
</script>

<template>
  <div class="language-switcher" role="group" :aria-label="t('language.label')">
    <button
      v-for="code in ['uk', 'en']"
      :key="code"
      type="button"
      :class="{ active: locale === code }"
      :aria-pressed="locale === code"
      @click="setLocale(code)"
    >
      {{ t(`language.${code}`) }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.language-switcher {
  justify-self: end;
  display: inline-flex;
  padding: .1875rem;
  border: .0625rem solid var(--color-border);
  border-radius: .5625rem;
  background: rgba(255, 255, 255, 0.025);

  button {
    min-width: 2.375rem;
    min-height: 1.875rem;
    padding: .25rem .5rem;
    border: 0;
    border-radius: .375rem;
    background: transparent;
    color: var(--color-muted);
    cursor: pointer;
    font: 750 0.68rem var(--font-mono);
    transition: var(--transition);

    &:hover { color: var(--color-text); }
    &.active { background: rgba(0, 231, 240, 0.13); color: var(--color-primary); }
  }
}
</style>
