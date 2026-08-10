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
  padding: 3px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.025);

  button {
    min-width: 38px;
    min-height: 30px;
    padding: 4px 8px;
    border: 0;
    border-radius: 6px;
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
