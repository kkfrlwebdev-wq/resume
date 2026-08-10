<script setup>
import { Send } from '@lucide/vue'
import { useContactForm } from '@/composables/useContactForm'
import { useUiStore } from '@/stores/uiStore'

const { form, errors, isSubmitting, submit } = useContactForm()
const ui = useUiStore()

async function handleSubmit() {
  try {
    const result = await submit()
    if (result?.ok) {
      ui.notify(result.demo ? 'Демо: повідомлення перевірено та підготовлено' : 'Повідомлення успішно надіслано', 'success')
    }
  } catch {
    ui.notify('Не вдалося надіслати повідомлення. Спробуйте ще раз.', 'error')
  }
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="handleSubmit">
    <h2>Напишіть мені</h2>
    <p>Зазвичай відповідаю протягом одного робочого дня.</p>

    <div class="form-field">
      <label for="name">Ваше ім’я</label>
      <input id="name" v-model="form.name" name="name" autocomplete="name" :aria-invalid="Boolean(errors.name)" :aria-describedby="errors.name ? 'name-error' : undefined" placeholder="Як до вас звертатися?" />
      <small v-if="errors.name" id="name-error" role="alert">{{ errors.name }}</small>
    </div>

    <div class="form-field">
      <label for="email">Email</label>
      <input id="email" v-model="form.email" name="email" type="email" inputmode="email" autocomplete="email" :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'email-error' : undefined" placeholder="name@example.com" />
      <small v-if="errors.email" id="email-error" role="alert">{{ errors.email }}</small>
    </div>

    <div class="form-field">
      <label for="message">Повідомлення</label>
      <textarea id="message" v-model="form.message" name="message" rows="6" :aria-invalid="Boolean(errors.message)" :aria-describedby="errors.message ? 'message-error' : undefined" placeholder="Коротко опишіть задачу, строки та очікуваний результат"></textarea>
      <small v-if="errors.message" id="message-error" role="alert">{{ errors.message }}</small>
    </div>

    <div class="honeypot" aria-hidden="true">
      <label for="company">Компанія</label>
      <input id="company" v-model="form.company" name="company" tabindex="-1" autocomplete="off" />
    </div>

    <button type="submit" :disabled="isSubmitting">
      <span>{{ isSubmitting ? 'Надсилаємо…' : 'Надіслати повідомлення' }}</span>
      <Send aria-hidden="true" />
    </button>
  </form>
</template>

<style lang="scss" scoped>
.contact-form {
  position: relative;
  min-width: 0;
  padding: clamp(24px, 4vw, 38px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: linear-gradient(145deg, rgba(10,21,28,.96), rgba(5,13,18,.88));
  box-shadow: 0 24px 80px rgba(0,0,0,.25);

  h2 { font-size: 1.35rem; }
  > p { margin: 4px 0 25px; color: var(--color-muted); font-size: .8rem; }
  > button { width: 100%; min-height: 48px; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 4px; border: 0; border-radius: 8px; background: linear-gradient(135deg, #00dfe8, #00b4c0); color: #001114; cursor: pointer; font-size: .83rem; font-weight: 850; transition: var(--transition); }
  > button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,231,240,.2); }
  > button:disabled { opacity: .6; cursor: wait; }
  > button svg { width: 17px; }
}

.form-field { position: relative; display: grid; gap: 7px; margin-bottom: 17px; }
.form-field label { color: #c7d2d6; font-size: .73rem; font-weight: 700; }
.form-field input, .form-field textarea { width: 100%; min-width: 0; border: 1px solid var(--color-border); border-radius: 8px; background: rgba(255,255,255,.025); color: var(--color-text); transition: var(--transition); }
.form-field input { min-height: 46px; padding: 0 14px; }
.form-field textarea { min-height: 136px; padding: 12px 14px; resize: vertical; }
.form-field input::placeholder, .form-field textarea::placeholder { color: #63737b; }
.form-field input:hover, .form-field textarea:hover { border-color: rgba(255,255,255,.24); }
.form-field input:focus, .form-field textarea:focus { border-color: var(--color-primary); outline: 0; box-shadow: 0 0 0 3px rgba(0,231,240,.08); }
.form-field input[aria-invalid='true'], .form-field textarea[aria-invalid='true'] { border-color: var(--color-danger); }
.form-field small { color: var(--color-danger); font-size: .66rem; }
.honeypot { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
</style>
