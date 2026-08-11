<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RotateCcw, TerminalSquare } from '@lucide/vue'
import InteractiveWindow from './InteractiveWindow.vue'
import { useTerminal } from '@/composables/useTerminal'
import { useAchievementsStore } from '@/stores/achievementsStore'
import { useUiStore } from '@/stores/uiStore'

defineEmits(['close'])

const achievements = useAchievementsStore()
const ui = useUiStore()
const { t } = useI18n()
const { commandNames, execute, hasHistory, history, input, reset } = useTerminal()
const outputElement = ref(null)
const inputElement = ref(null)

watch(
  () => history.value.length,
  async () => {
    await nextTick()
    if (outputElement.value) outputElement.value.scrollTop = outputElement.value.scrollHeight
  },
)

onMounted(async () => {
  const unlocked = achievements.unlock('terminal')
  if (unlocked) ui.notify(t('notifications.terminalAchievement'), 'success')
  await nextTick()
  inputElement.value?.focus()
})
</script>

<template>
  <InteractiveWindow :title="$t('terminal.title')" size="large" @close="$emit('close')">
    <template #icon>
      <TerminalSquare aria-hidden="true" />
    </template>

    <div class="terminal">
      <div class="terminal__toolbar">
        <span>portfolio-terminal · UTF-8</span>
        <button type="button" :title="$t('terminal.restart')" :aria-label="$t('terminal.restart')" @click="reset">
          <RotateCcw aria-hidden="true" />
        </button>
      </div>

      <div ref="outputElement" class="terminal__output" role="log" aria-live="polite" :aria-label="$t('terminal.output')">
        <template v-if="hasHistory">
          <p v-for="entry in history" :key="entry.id" :class="['terminal__line', `terminal__line--${entry.type}`]">
            <template v-if="entry.type === 'command'">
              <span class="terminal__prompt" aria-hidden="true">user@portfolio:~$</span>
              <span class="sr-only">{{ $t('terminal.executed') }}</span>
              {{ entry.content }}
            </template>
            <template v-else>
              {{ entry.content }}
            </template>
          </p>
        </template>
        <p v-else class="terminal__line terminal__line--muted">
          {{ $t('terminal.cleared') }}
        </p>
      </div>

      <form class="terminal__form" @submit.prevent="execute()">
        <label for="terminal-command">
          <span class="terminal__prompt" aria-hidden="true">user@portfolio:~$</span>
          <span class="sr-only">{{ $t('terminal.command') }}</span>
        </label>
        <input
          id="terminal-command"
          ref="inputElement"
          v-model="input"
          type="text"
          list="terminal-commands"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          :placeholder="$t('terminal.placeholder')"
        />
        <datalist id="terminal-commands">
          <option v-for="command in commandNames" :key="command" :value="command"></option>
        </datalist>
        <button type="submit">
          {{ $t('terminal.run') }}
        </button>
      </form>
    </div>
  </InteractiveWindow>
</template>

<style lang="scss" scoped>
.terminal {
  height: min(39.375rem, calc(100dvh - 11.875rem));
  min-height: 24.375rem;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  background:
    linear-gradient(rgba(4, 10, 13, 0.93), rgba(2, 7, 9, 0.98)),
    repeating-linear-gradient(0deg, transparent 0 .1875rem, rgba(70, 255, 117, 0.025) .25rem);
  color: #d2f7d9;
  font-family: var(--font-mono);
}

.terminal__toolbar {
  min-height: 2.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: .3125rem .875rem;
  border-bottom: .0625rem solid rgba(82, 255, 115, 0.1);
  background: rgba(255, 255, 255, 0.018);
  color: #718a78;
  font-size: 0.7rem;

  button {
    width: 1.875rem;
    height: 1.75rem;
    display: grid;
    place-items: center;
    border: 0;
    border-radius: .3125rem;
    background: transparent;
    color: #87a48e;
    cursor: pointer;

    &:hover { background: rgba(82, 255, 115, 0.08); color: #66ff87; }
    svg { width: .9375rem; }
  }
}

.terminal__output {
  overflow-y: auto;
  padding: clamp(1rem, 3vw, 1.75rem);
  scrollbar-color: rgba(82, 255, 115, 0.3) transparent;
}

.terminal__line {
  min-height: 1.5em;
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: clamp(0.76rem, 1.7vw, 0.9rem);
  line-height: 1.65;

  &--command { margin-top: .625rem; color: #f0fff3; }
  &--success { color: #57f878; }
  &--muted { color: #789280; }
  &--error { color: #ff7085; }
  &--output { color: #c2d8c8; }
}

.terminal__prompt {
  margin-right: .5625rem;
  color: #28e9e9;
  font-weight: 700;
}

.terminal__form {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: .5rem;
  padding: .875rem clamp(1rem, 3vw, 1.75rem);
  border-top: .0625rem solid rgba(82, 255, 115, 0.12);
  background: rgba(3, 13, 7, 0.82);

  input {
    min-width: 0;
    min-height: 2.375rem;
    border: 0;
    outline: 0;
    background: transparent;
    color: #fff;
    font: inherit;
    caret-color: #5cff7b;

    &::placeholder { color: #607167; }
  }

  button {
    min-height: 2.25rem;
    padding: .4375rem .8125rem;
    border: .0625rem solid rgba(82, 255, 115, 0.28);
    border-radius: .375rem;
    background: rgba(82, 255, 115, 0.08);
    color: #65fa82;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 700;

    &:hover { background: rgba(82, 255, 115, 0.14); }
  }
}

@media (max-width: 40em) {
  .terminal { height: 100%; min-height: 0; }
  .terminal__form { grid-template-columns: auto minmax(0, 1fr); }
  .terminal__form button { grid-column: 1 / -1; }
}
</style>
