import { computed, ref } from 'vue'
import { useAchievementsStore } from '@/stores/achievementsStore'
import { useUiStore } from '@/stores/uiStore'

const COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'coffee', 'matrix', 'clear']

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
          'matrix — увімкнути або вимкнути Matrix-режим',
          'clear — очистити термінал',
        ])
        break
      case 'about':
        print('output', [
          'Я — Іван Петренко, веброзробник із фокусом на зрозумілі та швидкі інтерфейси.',
          'Поєдную продуману архітектуру, акуратний дизайн і увагу до доступності.',
        ])
        break
      case 'skills':
        print('output', [
          'Frontend: Vue 3, JavaScript, Composition API, HTML5, SCSS.',
          'UI: адаптивна верстка, Flexbox, CSS Grid, анімації, WCAG.',
          'Workflow: Vite, Git, REST API, Vitest, Playwright.',
        ])
        break
      case 'projects':
        print('output', [
          'Landify — промосайт із виразною продуктовою подачею.',
          'TaskFlow — вебзастосунок для командної роботи.',
          'ShopSmart — адаптивний інтернет-магазин.',
          'FinDash — інформаційна панель фінансових показників.',
        ])
        break
      case 'contact':
        print('output', [
          'Email: hello@myportfolio.com',
          'Місцезнаходження: Україна, Київ',
          'Сторінка контактів: /contact',
        ])
        break
      case 'coffee': {
        print('success', ['( (', ' ) )', '........', '|      |]  Кава готова. Час створювати щось класне!', '\\      /', ' `----\''])
        const unlocked = achievements.unlock('hunter')
        if (unlocked) ui.notify('Досягнення «Шукач» розблоковано', 'success')
        break
      }
      case 'matrix': {
        ui.toggleMatrix()
        const unlocked = achievements.unlock('matrix')
        if (unlocked) ui.notify('Досягнення «Матриця» розблоковано', 'success')
        print('success', ui.matrixMode ? 'Matrix-режим активовано.' : 'Matrix-режим вимкнено.')
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
