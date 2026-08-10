<script setup>
import { ArrowUpRight } from '@lucide/vue'
import ProjectVisual from './ProjectVisual.vue'

defineProps({ project: { type: Object, required: true } })
defineEmits(['select'])
</script>

<template>
  <button class="project-card" type="button" :aria-label="`Детальніше про ${project.title}`" @click="$emit('select', project)">
    <ProjectVisual :project="project" />
    <span class="project-card__copy">
      <span>
        <strong>{{ project.title }}</strong>
        <small>{{ project.categoryLabel }}</small>
      </span>
      <ArrowUpRight aria-hidden="true" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.project-card {
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgba(7, 16, 22, .86);
  text-align: left;
  cursor: pointer;
  transition: var(--transition);

  &:hover { transform: translateY(-5px); border-color: var(--color-border-bright); box-shadow: var(--shadow-glow); }
  &:hover .project-card__copy > svg { color: var(--color-primary); transform: translate(2px,-2px); }

  &__copy { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px; }
  &__copy > span { display: grid; }
  strong { font-size: .95rem; }
  small { margin-top: 3px; color: var(--color-muted); font-size: .72rem; }
  svg { width: 19px; color: var(--color-muted); transition: var(--transition); }
}
</style>
