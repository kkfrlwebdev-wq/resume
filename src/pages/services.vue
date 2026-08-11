<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '@/components/base/SectionHeading.vue'
import ServiceCard from '@/components/services/ServiceCard.vue'
import { services } from '@/data/services'

const { t, tm } = useI18n()
const localizedServices = computed(() => services.map((service) => ({
  ...service,
  title: t(`services.items.${service.translationKey}.title`),
  description: t(`services.items.${service.translationKey}.description`),
  features: tm(`services.items.${service.translationKey}.features`),
})))
</script>

<template>
  <div class="services-view page-container">
    <SectionHeading
      :eyebrow="t('services.eyebrow')"
      :title="t('services.title')"
      :description="t('services.description')"
    />

    <section class="services-grid" :aria-label="t('services.listLabel')">
      <ServiceCard v-for="service in localizedServices" :key="service.translationKey" :service="service" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.services-view {
  min-height: calc(100dvh - var(--header-height) - 1.875rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(.875rem, 2vw, 1.5rem);
}

@media (max-width: 68.75em) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 36.25em) { .services-grid { grid-template-columns: 1fr; } }
</style>
