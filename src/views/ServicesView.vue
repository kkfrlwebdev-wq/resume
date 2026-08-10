<script setup>
import SectionHeading from '@/components/base/SectionHeading.vue'
import ServiceCard from '@/components/services/ServiceCard.vue'
import { services } from '@/data/services'
</script>

<template>
  <div class="services-view page-container">
    <SectionHeading
      eyebrow="Послуги"
      title="Що я роблю?"
      description="Створюю лендінги й корпоративні сайти на чистому коді, адаптую їх до всіх екранів і готую до подальшої підтримки або інтеграції з CMS."
    />

    <section class="services-grid" aria-label="Перелік послуг">
      <ServiceCard v-for="service in services" :key="service.title" :service="service" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.services-view {
  min-height: calc(100dvh - var(--header-height) - 30px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(14px, 2vw, 24px);
}

@media (max-width: 1100px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 580px) { .services-grid { grid-template-columns: 1fr; } }
</style>
