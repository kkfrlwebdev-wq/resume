<script setup>
import { computed, ref } from 'vue'
import SectionHeading from '@/components/base/SectionHeading.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'
import ProjectModal from '@/components/portfolio/ProjectModal.vue'
import { projectCategories, projects } from '@/data/projects'

const activeCategory = ref('all')
const selectedProject = ref(null)
const visibleProjects = computed(() =>
  activeCategory.value === 'all' ? projects : projects.filter((project) => project.category === activeCategory.value),
)
</script>

<template>
  <div class="portfolio-view page-container">
    <div class="portfolio-top">
      <SectionHeading eyebrow="Портфоліо" title="Мої роботи" description="Добірка комерційних і концептуальних проєктів із фокусом на результат, швидкість та зрозумілий інтерфейс." />
      <div class="filters" role="group" aria-label="Фільтр проєктів">
        <button
          v-for="category in projectCategories"
          :key="category.id"
          type="button"
          :class="{ active: activeCategory === category.id }"
          :aria-pressed="activeCategory === category.id"
          @click="activeCategory = category.id"
        >
          {{ category.label }}
        </button>
      </div>
    </div>

    <TransitionGroup name="projects" tag="section" class="projects-grid" aria-live="polite">
      <ProjectCard v-for="project in visibleProjects" :key="project.id" :project="project" @select="selectedProject = $event" />
    </TransitionGroup>

    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </div>
</template>

<style lang="scss" scoped>
.portfolio-view { min-height: calc(100dvh - var(--header-height) - 30px); }
.portfolio-top { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 20px; }
.portfolio-top :deep(.section-heading) { margin-bottom: 0; }
.filters { display: flex; flex-wrap: wrap; gap: 8px; }
.filters button { min-height: 40px; padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 8px; background: rgba(7,16,22,.85); color: var(--color-muted); cursor: pointer; font-size: .75rem; transition: var(--transition); }
.filters button:hover { color: var(--color-text); border-color: rgba(255,255,255,.28); }
.filters button.active { border-color: var(--color-primary); background: var(--color-primary); color: #001013; font-weight: 800; }
.projects-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
.projects-move, .projects-enter-active, .projects-leave-active { transition: 260ms ease; }
.projects-enter-from, .projects-leave-to { opacity: 0; transform: scale(.96); }
.projects-leave-active { position: absolute; }
@media (max-width: 1050px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 620px) { .projects-grid { grid-template-columns: 1fr; } .filters { width: 100%; } .filters button { flex: 1; } }
</style>
