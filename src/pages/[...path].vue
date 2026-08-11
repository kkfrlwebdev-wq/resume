<script setup>
import { ArrowLeft, Radar } from '@lucide/vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="not-found page-container">
    <Radar aria-hidden="true" />
    <span>404</span>
    <h1>{{ $t('notFound.title') }}</h1>
    <p>{{ $t('notFound.description') }}</p>
    <BaseButton to="/">
      <template #icon>
        <ArrowLeft aria-hidden="true" />
      </template>
      {{ $t('notFound.back') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.not-found { min-height: calc(100dvh - var(--header-height) - 1.875rem); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.not-found > svg { width: 4.375rem; height: 4.375rem; color: var(--color-primary); animation: radar 5s linear infinite; }
.not-found > span { margin-top: 1.125rem; color: var(--color-primary); font-family: var(--font-mono); font-size: .82rem; }
.not-found h1 { margin-top: .375rem; font-size: clamp(2.2rem, 6vw, 4.5rem); line-height: 1; letter-spacing: -.05em; }
.not-found p { max-width: 33.125rem; margin: 1.125rem 0 1.75rem; color: var(--color-muted); }
@keyframes radar { to { transform: rotate(1turn); } }
</style>
