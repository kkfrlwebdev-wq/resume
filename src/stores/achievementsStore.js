import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const defaultAchievements = [
  { id: 'first-step', translationKey: 'firstStep', icon: 'footprints' },
  { id: 'curious', translationKey: 'curious', icon: 'sparkles' },
  { id: 'terminal', translationKey: 'terminal', icon: 'terminal' },
  { id: 'zero-gravity', translationKey: 'gravity', icon: 'orbit' },
  { id: 'hunter', translationKey: 'hunter', icon: 'search' },
]

export const useAchievementsStore = defineStore('achievements', () => {
  const unlocked = ref(JSON.parse(localStorage.getItem('portfolio-achievements') || '["first-step"]'))
  const visitedRoutes = ref(JSON.parse(localStorage.getItem('portfolio-routes') || '[]'))
  const achievements = computed(() => defaultAchievements.map((item) => ({ ...item, unlocked: unlocked.value.includes(item.id) })))

  function unlock(id) {
    if (!unlocked.value.includes(id)) {
      unlocked.value.push(id)
      localStorage.setItem('portfolio-achievements', JSON.stringify(unlocked.value))
      return true
    }
    return false
  }

  function visit(routeName) {
    const mainRoutes = ['home', 'about', 'services', 'portfolio', 'contact']
    if (mainRoutes.includes(routeName) && !visitedRoutes.value.includes(routeName)) {
      visitedRoutes.value.push(routeName)
      localStorage.setItem('portfolio-routes', JSON.stringify(visitedRoutes.value))
    }
    if (mainRoutes.every((route) => visitedRoutes.value.includes(route))) unlock('curious')
  }

  return { achievements, unlocked, visitedRoutes, unlock, visit }
})
