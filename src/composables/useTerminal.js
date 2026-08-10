import { computed, ref } from 'vue'
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
  const ui = useUiStore()
  const achievements = useAchievementsStore()
  const input = ref('')
  const history = ref([
    createEntry('success', 'Ласкаво просимо до термінала портфоліо.'),
    createEntry('muted', 'Введіть help, щоб переглянути доступні команди.'),
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
        print('output', [
          'help — список команд',
          'about — коротко про мене',
          'skills — технології та інструменти',
          'projects — вибрані проєкти',
          'contact — контактна інформація',
          'coffee — невелика пасхалка',
          'gravity — увімкнути або вимкнути режим невагомості',
          'clear — очистити термінал',
        ])
        break
      case 'about':
        print('output', [
          `Я — ${profile.name}, frontend-розробник із досвідом створення сайтів під ключ.`,
          'Створюю виразні, інтуїтивні та адаптивні вебсайти для бізнесу.',
        ])
        break
      case 'skills':
        print('output', [
          'Frontend: HTML5, CSS3, JavaScript, SCSS (Sass).',
          'Верстка: адаптивність, кросбраузерність, Flexbox і CSS Grid.',
          'Workflow: Git, чистий підтримуваний код та підготовка до інтеграції з CMS.',
        ])
        break
      case 'projects':
        print('output', projects.map((project) => `${project.title} — ${project.categoryLabel}.`))
        break
      case 'contact':
        print('output', [
          `Email: ${profile.email}`,
          `Телефон: ${profile.phone}`,
          `Місцезнаходження: ${profile.location}`,
          'Сторінка контактів: /contact',
        ])
        break
      case 'coffee': {
        print('success', ['( (', ' ) )', '........', '|      |]  Кава готова. Час створювати щось класне!', '\\      /', ' `----\''])
        const unlocked = achievements.unlock('hunter')
        if (unlocked) ui.notify('Досягнення «Шукач» розблоковано', 'success')
        break
      }
      case 'gravity': {
        ui.toggleZeroGravity()
        const unlocked = achievements.unlock('zero-gravity')
        if (unlocked) ui.notify('Досягнення «Нульова гравітація» розблоковано', 'success')
        print('success', ui.zeroGravityMode ? 'Режим невагомості активовано.' : 'Режим невагомості вимкнено.')
        break
      }
      case 'clear':
        history.value = []
        break
      default:
        print('error', `Команду «${command}» не знайдено. Введіть help для підказки.`)
    }
  }

  function reset() {
    history.value = [
      createEntry('success', 'Термінал перезапущено.'),
      createEntry('muted', 'Введіть help, щоб переглянути доступні команди.'),
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
