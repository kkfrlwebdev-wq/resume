<script setup>
import { ExternalLink } from '@lucide/vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ProjectVisual from './ProjectVisual.vue'

defineProps({ project: { type: Object, default: null } })
defineEmits(['close'])
</script>

<template>
  <BaseModal :open="Boolean(project)" :title="project?.title" @close="$emit('close')">
    <article v-if="project" class="project-details">
      <ProjectVisual :project="project" />
      <div class="project-details__copy">
        <span>{{ project.categoryLabel }}</span>
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
        <ul>
          <li v-for="technology in project.stack" :key="technology">
            {{ technology }}
          </li>
        </ul>
        <BaseButton :href="project.href" target="_blank" rel="noopener noreferrer">
          {{ $t('portfolio.viewSite') }}
          <template #trailing>
            <ExternalLink aria-hidden="true" />
          </template>
        </BaseButton>
      </div>
    </article>
  </BaseModal>
</template>

<style lang="scss" scoped>
.project-details {
  :deep(.project-visual) { height: 20rem; }

  &__copy { padding: clamp(1.5rem, 5vw, 2.625rem); }
  &__copy > span { color: var(--color-primary); font-size: .78rem; font-weight: 800; }
  h2 { margin-top: .3125rem; font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -.04em; }
  p { max-width: 36.25rem; margin: .875rem 0 1.375rem; color: var(--color-muted); }
  ul { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.75rem; }
  li { padding: .375rem .625rem; border: .0625rem solid var(--color-border); border-radius: 62.4375rem; color: #c4cfd3; font-size: .72rem; }
}
</style>
