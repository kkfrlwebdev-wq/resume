<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Mail, MapPin, Phone, Radio } from '@lucide/vue'
import { profile } from '@/data/profile'

const { t } = useI18n()
const details = computed(() => [
  { label: t('common.email'), value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: t('common.phone'), value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`, icon: Phone },
  { label: t('common.location'), value: t('profile.location'), icon: MapPin },
])
</script>

<template>
  <section class="contact-info" aria-labelledby="contact-info-title">
    <span>{{ t('contact.eyebrow') }}</span>
    <h1 id="contact-info-title">
      {{ t('contact.title') }}
    </h1>
    <p>{{ t('contact.description') }}</p>

    <div class="availability">
      <Radio aria-hidden="true" /> {{ t('profile.availability') }}
    </div>

    <dl>
      <div v-for="item in details" :key="item.label">
        <dt><component :is="item.icon" aria-hidden="true" /></dt>
        <dd>
          <small>{{ item.label }}</small>
          <a v-if="item.href" :href="item.href">{{ item.value }}</a>
          <span v-else>{{ item.value }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style lang="scss" scoped>
.contact-info {
  > span { color: var(--color-primary); font-size: .86rem; font-weight: 800; }
  h1 { margin-top: .3125rem; font-size: clamp(2.7rem, 6vw, 5rem); line-height: 1; letter-spacing: -.055em; }
  > p { max-width: 27.5rem; margin-top: 1.125rem; color: var(--color-muted); }
  dl { display: grid; gap: 1.3125rem; margin-top: 2.125rem; }
  dl > div { display: grid; grid-template-columns: 2.25rem 1fr; gap: .8125rem; align-items: center; }
  dt { display: grid; width: 2.125rem; height: 2.125rem; place-items: center; border: .0625rem solid rgba(0,231,240,.25); border-radius: .5rem; color: var(--color-primary); }
  dt svg { width: 1.0625rem; }
  dd { display: grid; margin: 0; }
  dd small { color: var(--color-dimmed); font-size: .67rem; }
  dd a, dd span { color: #d8e0e3; font-size: .83rem; }
  dd a:hover { color: var(--color-primary); }
}

.availability { width: max-content; max-width: 100%; display: flex; align-items: center; gap: .5rem; margin-top: 1.375rem; padding: .4375rem .6875rem; border: .0625rem solid rgba(80,227,164,.25); border-radius: 62.4375rem; color: var(--color-success); font-size: .7rem; }
.availability svg { width: .8125rem; animation: pulse 2s ease infinite; }
@keyframes pulse { 50% { opacity: .35; } }
</style>
