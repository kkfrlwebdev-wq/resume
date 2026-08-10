import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAchievementsStore } from '@/stores/achievementsStore'
import { useUiStore } from '@/stores/uiStore'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

const COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'coffee', 'gravity', 'clear']

let entryId = 0

function createEntry(type, content) {
  entryId += 1
  return { id: entryId, type, content }
}

export function useTerminal() {
  const { t, tm } = useI18n()
  const ui = useUiStore()
  const achievements = useAchievementsStore()
  const input = ref('')
  const history = ref([
    createEntry('success', t('terminal.welcome')),
    createEntry('muted', t('terminal.prompt')),
  ])

  const hasHistory = computed(() => history.value.length > 0)

  function print(type, lines) {
    const output = Array.isArray(lines) ? lines : [lines]
    output.forEach((line) => history.value.push(createEntry(type, line)))
  }

  function execute(rawCommand = input.value) {
    const command = rawCommand.trim().toLowerCase()
    input.value = ''

    if (!command) return

    history.value.push(createEntry('command', command))

    switch (command) {
      case 'help':
        print('output', tm('terminal.help'))
        break
      case 'about':
        print('output', [t('terminal.about.0', { name: t('profile.name') }), t('terminal.about.1')])
        break
      case 'skills':
        print('output', tm('terminal.skills'))
        break
      case 'projects':
        print('output', projects.map((project) => t('terminal.projectLine', {
          title: project.title,
          category: t(`portfolio.projects.${project.translationKey}.category`),
        })))
        break
      case 'contact':
        print('output', [
          `Email: ${profile.email}`,
          t('terminal.phone', { value: profile.phone }),
          t('terminal.location', { value: t('profile.location') }),
          t('terminal.contactPage'),
        ])
        break
      case 'coffee': {
        print('success', ['( (', ' ) )', '........', t('terminal.coffee'), '\\      /', ' `----\''])
        const unlocked = achievements.unlock('hunter')
        if (unlocked) ui.notify(t('terminal.hunterUnlocked'), 'success')
        break
      }
      case 'gravity': {
        ui.toggleZeroGravity()
        const unlocked = achievements.unlock('zero-gravity')
        if (unlocked) ui.notify(t('terminal.gravityUnlocked'), 'success')
        print('success', t(ui.zeroGravityMode ? 'terminal.gravityOn' : 'terminal.gravityOff'))
        break
      }
      case 'clear':
        history.value = []
        break
      default:
        print('error', t('terminal.unknown', { command }))
    }
  }

  function reset() {
    history.value = [
      createEntry('success', t('terminal.restarted')),
      createEntry('muted', t('terminal.prompt')),
    ]
  }

  return {
    commandNames: COMMANDS,
    execute,
    hasHistory,
    history,
    input,
    reset,
  }
}
