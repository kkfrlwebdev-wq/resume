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
  max-width: 640px;
  margin-bottom: clamp(30px, 4.5vw, 52px);

  > span {
    display: block;
    margin-bottom: 8px;
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
    max-width: 560px;
    margin-top: 16px;
    color: var(--color-muted);
  }
}
</style>
