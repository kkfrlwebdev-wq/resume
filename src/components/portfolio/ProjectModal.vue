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
        <BaseButton :href="project.href" target="_blank" rel="noreferrer">
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
  :deep(.project-visual) { height: 320px; }

  &__copy { padding: clamp(24px, 5vw, 42px); }
  &__copy > span { color: var(--color-primary); font-size: .78rem; font-weight: 800; }
  h2 { margin-top: 5px; font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -.04em; }
  p { max-width: 580px; margin: 14px 0 22px; color: var(--color-muted); }
  ul { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
  li { padding: 6px 10px; border: 1px solid var(--color-border); border-radius: 999px; color: #c4cfd3; font-size: .72rem; }
}
</style>
