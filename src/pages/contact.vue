<script setup>
import ContactForm from '@/components/contact/ContactForm.vue'
import ContactInfo from '@/components/contact/ContactInfo.vue'
</script>

<template>
  <div class="contact-view page-container">
    <div class="contact-grid">
      <ContactInfo />
      <ContactForm />
    </div>
    <div class="contact-glow" aria-hidden="true"></div>
  </div>
</template>

<style lang="scss" scoped>
.contact-view { position: relative; min-height: calc(100dvh - var(--header-height) - 30px); display: grid; align-items: center; }
.contact-grid { position: relative; z-index: 2; display: grid; grid-template-columns: minmax(0, .9fr) minmax(380px, .78fr); align-items: center; gap: clamp(46px, 10vw, 145px); }
.contact-grid > * { min-width: 0; }
.contact-glow { position: absolute; z-index: 0; left: -15%; bottom: -25%; width: 70%; aspect-ratio: 2; border-radius: 50%; background: repeating-radial-gradient(ellipse at center, transparent 0 14px, rgba(0,231,240,.08) 15px 16px); transform: rotate(10deg); mask-image: radial-gradient(#000, transparent 65%); }
@media (max-width: 820px) { .contact-grid { grid-template-columns: minmax(0, 1fr); } }
</style>
