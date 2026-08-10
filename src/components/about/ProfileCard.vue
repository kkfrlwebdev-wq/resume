<script setup>
import { Languages, Mail, MapPin, Phone, UserRound } from '@lucide/vue'
import portraitUrl from '@/assets/images/kolya-kolchenko.webp'
import { profile } from '@/data/profile'
</script>

<template>
  <article class="profile-card">
    <div class="profile-card__photo">
      <img :src="portraitUrl" :alt="`Портрет: ${profile.name}`" width="720" height="1080" />
    </div>
    <dl>
      <div>
        <dt><UserRound aria-hidden="true" /> Ім’я</dt>
        <dd>{{ profile.name }}</dd>
      </div>
      <div>
        <dt><Mail aria-hidden="true" /> Email</dt>
        <dd><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></dd>
      </div>
      <div>
        <dt><Phone aria-hidden="true" /> Телефон</dt>
        <dd><a :href="`tel:${profile.phone.replace(/[^+\d]/g, '')}`">{{ profile.phone }}</a></dd>
      </div>
      <div>
        <dt><MapPin aria-hidden="true" /> Місцезнаходження</dt>
        <dd>{{ profile.location }}</dd>
      </div>
      <div>
        <dt><Languages aria-hidden="true" /> Мови</dt>
        <dd>{{ profile.languages }}</dd>
      </div>
    </dl>
  </article>
</template>

<style lang="scss" scoped>
.profile-card {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--color-border-bright);
  border-radius: var(--radius-lg);
  background: rgba(8, 18, 25, 0.92);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35), var(--shadow-glow);

  &__photo {
    position: relative;
    aspect-ratio: 4 / 3.4;
    overflow: hidden;
    border-bottom: 1px solid var(--color-border-bright);
    background: #07141c;

    &::after {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(3, 9, 13, .25), transparent 40%);
      content: '';
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center 22%;
    }
  }

  dl { display: grid; gap: 13px; padding: 22px; }
  dl div { display: grid; grid-template-columns: minmax(120px, 0.8fr) 1.2fr; gap: 14px; align-items: start; }
  dt { display: flex; align-items: center; gap: 7px; color: var(--color-primary); font-size: .77rem; font-weight: 750; }
  dt svg { width: 14px; }
  dd { margin: 0; overflow-wrap: anywhere; color: var(--color-text); font-size: .8rem; }
  dd a:hover { color: var(--color-primary); }
}

@media (max-width: 500px) {
  .profile-card dl div { grid-template-columns: 1fr; gap: 3px; }
}
</style>
