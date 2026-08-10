<script setup>
import { Mail, MapPin, Phone, Radio } from '@lucide/vue'
import { profile } from '@/data/profile'

const details = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Телефон', value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`, icon: Phone },
  { label: 'Місцезнаходження', value: profile.location, icon: MapPin },
]
</script>

<template>
  <section class="contact-info" aria-labelledby="contact-info-title">
    <span>Контакти</span>
    <h1 id="contact-info-title">
      Зв’яжімося
    </h1>
    <p>Є проєкт, ідея або пропозиція? Розкажіть про задачу — я відповім і запропоную наступний крок.</p>

    <div class="availability">
      <Radio aria-hidden="true" /> {{ profile.availability }}
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
  h1 { margin-top: 5px; font-size: clamp(2.7rem, 6vw, 5rem); line-height: 1; letter-spacing: -.055em; }
  > p { max-width: 440px; margin-top: 18px; color: var(--color-muted); }
  dl { display: grid; gap: 21px; margin-top: 34px; }
  dl > div { display: grid; grid-template-columns: 36px 1fr; gap: 13px; align-items: center; }
  dt { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid rgba(0,231,240,.25); border-radius: 8px; color: var(--color-primary); }
  dt svg { width: 17px; }
  dd { display: grid; margin: 0; }
  dd small { color: var(--color-dimmed); font-size: .67rem; }
  dd a, dd span { color: #d8e0e3; font-size: .83rem; }
  dd a:hover { color: var(--color-primary); }
}

.availability { width: max-content; max-width: 100%; display: flex; align-items: center; gap: 8px; margin-top: 22px; padding: 7px 11px; border: 1px solid rgba(80,227,164,.25); border-radius: 999px; color: var(--color-success); font-size: .7rem; }
.availability svg { width: 13px; animation: pulse 2s ease infinite; }
@keyframes pulse { 50% { opacity: .35; } }
</style>
