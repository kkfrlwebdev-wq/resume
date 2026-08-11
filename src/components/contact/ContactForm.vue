<script setup>
import { Send } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { useContactForm } from '@/composables/useContactForm'
import { useUiStore } from '@/stores/uiStore'

const { form, errors, isSubmitting, submit } = useContactForm()
const ui = useUiStore()
const { t } = useI18n()

async function handleSubmit() {
  try {
    const result = await submit()
    if (result?.ok) {
      ui.notify(result.demo ? t('notifications.demoSent') : t('notifications.sent'), 'success')
    }
  } catch (error) {
    const details = error instanceof Error ? error.message : ''
    ui.notify(details ? `${t('notifications.sendError')} ${details}` : t('notifications.sendError'), 'error')
  }
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="handleSubmit">
    <h2>{{ t('contact.formTitle') }}</h2>
    <p>{{ t('contact.responseTime') }}</p>

    <div class="form-field">
      <label for="name">{{ t('contact.yourName') }}</label>
      <input id="name" v-model="form.name" name="name" autocomplete="name" :aria-invalid="Boolean(errors.name)" :aria-describedby="errors.name ? 'name-error' : undefined" :placeholder="t('contact.namePlaceholder')" />
      <small v-if="errors.name" id="name-error" role="alert">{{ errors.name }}</small>
    </div>

    <div class="form-field">
      <label for="email">Email</label>
      <input id="email" v-model="form.email" name="email" type="email" inputmode="email" autocomplete="email" :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'email-error' : undefined" placeholder="name@example.com" />
      <small v-if="errors.email" id="email-error" role="alert">{{ errors.email }}</small>
    </div>

    <div class="form-field">
      <label for="message">{{ t('contact.message') }}</label>
      <textarea id="message" v-model="form.message" name="message" rows="6" :aria-invalid="Boolean(errors.message)" :aria-describedby="errors.message ? 'message-error' : undefined" :placeholder="t('contact.messagePlaceholder')"></textarea>
      <small v-if="errors.message" id="message-error" role="alert">{{ errors.message }}</small>
    </div>

    <div class="honeypot" aria-hidden="true">
      <label for="company">{{ t('contact.company') }}</label>
      <input id="company" v-model="form.company" name="company" tabindex="-1" autocomplete="off" />
    </div>

    <button type="submit" :disabled="isSubmitting">
      <span>{{ isSubmitting ? t('contact.sending') : t('contact.submit') }}</span>
      <Send aria-hidden="true" />
    </button>
  </form>
</template>

<style lang="scss" scoped>
.contact-form {
  position: relative;
  min-width: 0;
  padding: clamp(1.5rem, 4vw, 2.375rem);
  border: .0625rem solid var(--color-border);
  border-radius: var(--radius-lg);
  background: linear-gradient(145deg, rgba(10,21,28,.96), rgba(5,13,18,.88));
  box-shadow: 0 1.5rem 5rem rgba(0,0,0,.25);

  h2 { font-size: 1.35rem; }
  > p { margin: .25rem 0 1.5625rem; color: var(--color-muted); font-size: .8rem; }
  > button { width: 100%; min-height: 3rem; display: flex; align-items: center; justify-content: center; gap: .625rem; margin-top: .25rem; border: 0; border-radius: .5rem; background: linear-gradient(135deg, #00dfe8, #00b4c0); color: #001114; cursor: pointer; font-size: .83rem; font-weight: 850; transition: var(--transition); }
  > button:hover:not(:disabled) { transform: translateY(-.125rem); box-shadow: 0 .625rem 1.75rem rgba(0,231,240,.2); }
  > button:disabled { opacity: .6; cursor: wait; }
  > button svg { width: 1.0625rem; }
}

.form-field { position: relative; display: grid; gap: .4375rem; margin-bottom: 1.0625rem; }
.form-field label { color: #c7d2d6; font-size: .73rem; font-weight: 700; }
.form-field input, .form-field textarea { width: 100%; min-width: 0; border: .0625rem solid var(--color-border); border-radius: .5rem; background: rgba(255,255,255,.025); color: var(--color-text); transition: var(--transition); }
.form-field input { min-height: 2.875rem; padding: 0 .875rem; }
.form-field textarea { min-height: 8.5rem; padding: .75rem .875rem; resize: vertical; }
.form-field input::placeholder, .form-field textarea::placeholder { color: #63737b; }
.form-field input:hover, .form-field textarea:hover { border-color: rgba(255,255,255,.24); }
.form-field input:focus, .form-field textarea:focus { border-color: var(--color-primary); outline: 0; box-shadow: 0 0 0 .1875rem rgba(0,231,240,.08); }
.form-field input[aria-invalid='true'], .form-field textarea[aria-invalid='true'] { border-color: var(--color-danger); }
.form-field small { color: var(--color-danger); font-size: .66rem; }
.honeypot { position: absolute; width: .0625rem; height: .0625rem; overflow: hidden; clip-path: inset(50%); }
</style>
