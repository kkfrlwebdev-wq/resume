import { Braces, Gauge, MonitorSmartphone, RefreshCw } from '@lucide/vue'

export const services = [
  {
    title: 'Розробка сайтів',
    description: 'Створення лендінгів і корпоративних сайтів на чистому, зрозумілому та зручному для підтримки коді.',
    icon: Braces,
    accent: 'cyan',
    features: ['HTML5 та CSS3', 'JavaScript', 'SCSS (Sass)'],
  },
  {
    title: 'Адаптивна верстка',
    description: 'Інтерфейси, які коректно працюють на телефонах, планшетах, ноутбуках і великих екранах.',
    icon: MonitorSmartphone,
    accent: 'yellow',
    features: ['Responsive layout', 'Mobile first', 'Кросбраузерність'],
  },
  {
    title: 'Швидкість і якість',
    description: 'Оптимізована верстка, плавні інтерактивні елементи та уважність до користувацького досвіду.',
    icon: Gauge,
    accent: 'cyan',
    features: ['Оптимізація assets', 'Анімації', 'Чистий код'],
  },
  {
    title: 'Підтримка проєкту',
    description: 'Внесення змін під час розробки та після здачі, а також підготовка верстки до інтеграції з CMS.',
    icon: RefreshCw,
    accent: 'cyan',
    features: ['Правки після релізу', 'CMS-ready', 'Git'],
  },
]
