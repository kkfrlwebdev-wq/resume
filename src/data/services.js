import { Braces, Paintbrush, Smartphone, Rocket } from '@lucide/vue'

export const services = [
  {
    title: 'Веброзробка',
    description: 'Створення швидких сайтів і вебзастосунків зі зрозумілою архітектурою та чистим кодом.',
    icon: Braces,
    accent: 'cyan',
    features: ['Vue 3 та Vite', 'Інтеграція API', 'Компонентна архітектура'],
  },
  {
    title: 'UI/UX дизайн',
    description: 'Продумані інтерфейси, що допомагають користувачу швидко досягати мети.',
    icon: Paintbrush,
    accent: 'yellow',
    features: ['Прототипування', 'Дизайн-система', 'Доступність'],
  },
  {
    title: 'Адаптивний дизайн',
    description: 'Інтерфейси, які бездоганно працюють на телефонах, планшетах і великих екранах.',
    icon: Smartphone,
    accent: 'cyan',
    features: ['Mobile first', 'Flexbox та Grid', 'Кросбраузерність'],
  },
  {
    title: 'Оптимізація',
    description: 'Покращення швидкості, Core Web Vitals, SEO та загального досвіду користувача.',
    icon: Rocket,
    accent: 'cyan',
    features: ['Аудит Lighthouse', 'Lazy loading', 'Технічне SEO'],
  },
]
