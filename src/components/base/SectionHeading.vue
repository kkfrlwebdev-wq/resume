<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<template>
  <header class="section-heading">
    <span>{{ eyebrow }}</span>
    <h1>{{ title }}</h1>
    <p v-if="description">
      {{ description }}
    </p>
  </header>
</template>

<style lang="scss" scoped>
.section-heading {
  max-width: 40rem;
  margin-bottom: clamp(1.875rem, 4.5vw, 3.25rem);

  > span {
    display: block;
    margin-bottom: .5rem;
    color: var(--color-primary);
    font-size: 0.88rem;
    font-weight: 800;
  }

  h1 {
    font-size: clamp(2.15rem, 5vw, 4rem);
    line-height: 1.04;
    letter-spacing: -0.045em;
  }

  p {
    max-width: 35rem;
    margin-top: 1rem;
    color: var(--color-muted);
  }
}
</style>
