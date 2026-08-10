<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Footprints, LockKeyhole, Orbit, Search, Sparkles, TerminalSquare, Trophy } from '@lucide/vue'
import InteractiveWindow from './InteractiveWindow.vue'
import { useAchievementsStore } from '@/stores/achievementsStore'

defineEmits(['close'])

const store = useAchievementsStore()
const { t } = useI18n()

const copy = {
  'first-step': {
    icon: Footprints,
  },
  curious: {
    icon: Sparkles,
  },
  terminal: {
    icon: TerminalSquare,
  },
  'zero-gravity': {
    icon: Orbit,
  },
  hunter: {
    icon: Search,
  },
}

const achievements = computed(() => store.achievements.map((item) => ({
  ...item,
  title: t(`achievements.items.${item.translationKey}.0`),
  description: t(`achievements.items.${item.translationKey}.1`),
  icon: copy[item.id]?.icon || Trophy,
})))

const unlockedCount = computed(() => achievements.value.filter((item) => item.unlocked).length)
const progress = computed(() => Math.round((unlockedCount.value / Math.max(achievements.value.length, 1)) * 100))
</script>

<template>
  <InteractiveWindow :title="t('achievements.title')" size="medium" @close="$emit('close')">
    <template #icon>
      <Trophy aria-hidden="true" />
    </template>

    <div class="achievements-panel">
      <header class="achievements-panel__header">
        <div>
          <span>{{ t('achievements.progress') }}</span>
          <strong>{{ unlockedCount }} / {{ achievements.length }}</strong>
        </div>
        <span class="achievements-panel__percent">{{ progress }}%</span>
      </header>

      <div
        class="progress-track"
        role="progressbar"
        :aria-label="t('achievements.progressLabel')"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span :style="{ width: `${progress}%` }"></span>
      </div>

      <ul class="achievement-list">
        <li
          v-for="achievement in achievements"
          :key="achievement.id"
          :class="['achievement', { 'achievement--locked': !achievement.unlocked }]"
        >
          <span class="achievement__icon">
            <component :is="achievement.unlocked ? achievement.icon : LockKeyhole" aria-hidden="true" />
          </span>
          <span class="achievement__copy">
            <strong>{{ achievement.title }}</strong>
            <small>{{ achievement.description }}</small>
          </span>
          <span class="achievement__status">
            {{ achievement.unlocked ? t('achievements.unlocked') : t('achievements.locked') }}
          </span>
        </li>
      </ul>

      <p class="achievements-panel__hint">
        {{ t('achievements.hint') }}
      </p>
    </div>
  </InteractiveWindow>
</template>

<style lang="scss" scoped>
.achievements-panel {
  min-height: 430px;
  padding: clamp(22px, 4vw, 36px);
  background:
    radial-gradient(circle at 88% 8%, rgba(255, 208, 0, 0.08), transparent 15rem),
    linear-gradient(145deg, rgba(8, 18, 25, 0.98), rgba(4, 11, 16, 0.98));
}

.achievements-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  > div {
    display: flex;
    flex-direction: column;
  }

  span { color: var(--color-muted); font-size: 0.75rem; }
  strong { font-size: 1.55rem; line-height: 1.2; }
}

.achievements-panel__percent {
  color: var(--color-secondary) !important;
  font: 800 1.1rem var(--font-mono) !important;
}

.progress-track {
  height: 7px;
  margin: 15px 0 27px;
  overflow: hidden;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.07);

  span {
    height: 100%;
    display: block;
    border-radius: inherit;
    background: linear-gradient(90deg, #e6a800, #ffe45b);
    box-shadow: 0 0 15px rgba(255, 208, 0, 0.35);
    transition: width 400ms ease;
  }
}

.achievement-list {
  display: grid;
  gap: 10px;
  padding: 0;
  list-style: none;
}

.achievement {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 70px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 208, 0, 0.21);
  border-radius: 11px;
  background: linear-gradient(90deg, rgba(255, 208, 0, 0.08), rgba(255, 255, 255, 0.018));

  &--locked {
    border-color: var(--color-border);
    background: rgba(255, 255, 255, 0.018);
    opacity: 0.62;
  }
}

.achievement__icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 208, 0, 0.3);
  border-radius: 50%;
  background: rgba(255, 208, 0, 0.08);
  color: var(--color-secondary);

  svg { width: 20px; }
}

.achievement__copy {
  min-width: 0;
  display: flex;
  flex-direction: column;

  strong { font-size: 0.85rem; }
  small { color: var(--color-muted); font-size: 0.7rem; }
}

.achievement__status {
  color: var(--color-secondary);
  font-size: 0.65rem;
  font-weight: 750;
}

.achievement--locked .achievement__status { color: var(--color-muted); }

.achievements-panel__hint {
  margin: 24px 0 0;
  color: var(--color-muted);
  font-size: 0.75rem;
  text-align: center;
}

@media (max-width: 560px) {
  .achievement { grid-template-columns: auto minmax(0, 1fr); }
  .achievement__status { grid-column: 2; }
}
</style>
