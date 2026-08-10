# Як змінювати дані портфоліо

Цей документ описує, де зберігається контент сайту та як безпечно замінити його на дані іншого спеціаліста.

## 1. Основні дані профілю

Файл: `src/data/profile.js`

```js
export const profile = {
  name: 'Микола Кольченко',
  role: 'Junior Frontend-розробник',
  email: 'name@example.com',
  phone: '+38 (000) 000 00 00',
  location: 'Україна',
  languages: 'Українська, англійська',
  availability: 'Доступний для фриланс-проєктів',
  intro: 'Короткий текст для головної сторінки.',
  about: 'Розгорнутий опис для сторінки «Про мене».',
  stats: [],
  social: [],
}
```

Ці поля автоматично використовуються на головній сторінці, у блоці «Про мене», контактах і частині команд інтерактивного термінала.

### Статистика

Кожен елемент `stats` має значення та підпис:

```js
stats: [
  { value: '3+', label: 'роки досвіду' },
  { value: '12', label: 'готових проєктів' },
  { value: '100%', label: 'адаптивність' },
]
```

Рекомендовано залишати рівно три показники, оскільки блок розрахований на три колонки.

### Соціальні мережі

```js
social: [
  { label: 'GitHub', href: 'https://github.com/username' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/username' },
  { label: 'Instagram', href: 'https://instagram.com/username' },
  { label: 'Telegram', href: 'https://t.me/username' },
  { label: 'Discord', href: 'https://discord.gg/invite-code' },
]
```

Назва `label` повинна точно збігатися з однією з підтримуваних назв: `GitHub`, `LinkedIn`, `Instagram`, `Telegram`, `Discord`. Іконки описані у `src/components/home/SocialIcon.vue`.

## 2. Портрет

Поточний файл: `src/assets/images/kolya-kolchenko.webp`

Імпорт портрета розташований у `src/components/about/ProfileCard.vue`:

```js
import portraitUrl from '@/assets/images/kolya-kolchenko.webp'
```

Щоб замінити портрет:

1. Додайте нове зображення в `src/assets/images/`.
2. Змініть шлях в імпорті `ProfileCard.vue`.
3. За потреби відкоригуйте `object-position` у стилях цього компонента.

Рекомендований формат — WebP або JPEG. Використовуйте портрет достатньої якості, але бажано розміром до 300–500 КБ.

## 3. Проєкти та категорії

Файл: `src/data/projects.js`

Категорії фільтра описані в `projectCategories`:

```js
export const projectCategories = [
  { id: 'all', label: 'Усі' },
  { id: 'landing', label: 'Лендінги' },
  { id: 'corporate', label: 'Корпоративні сайти' },
]
```

`all` є службовою категорією. Значення `category` у кожному проєкті має збігатися з `id` однієї з інших категорій.

Приклад проєкту:

```js
{
  id: 1,
  title: 'Назва проєкту',
  category: 'landing',
  categoryLabel: 'Комерційний сайт',
  description: 'Короткий опис виконаної роботи.',
  stack: ['HTML5', 'SCSS', 'JavaScript'],
  image: projectImage('project-name.webp'),
  href: 'https://example.com/',
}
```

Вимоги:

- `id` має бути унікальним;
- `href` повинен містити повну адресу з `https://` або `http://`;
- `stack` показується у модальному вікні як список технологій;
- `image` посилається на файл у `public/projects/`;
- назва файла зображення повинна точно збігатися з аргументом `projectImage()`.

Прев’ю краще готувати у горизонтальній пропорції приблизно 16:9. Зображення автоматично обрізається зверху через `object-fit: cover`.

## 4. Послуги

Файл: `src/data/services.js`

```js
{
  title: 'Розробка сайтів',
  description: 'Опис послуги.',
  icon: Braces,
  accent: 'cyan',
  features: ['HTML5', 'SCSS', 'JavaScript'],
}
```

- `icon` імпортується з `@lucide/vue` на початку файла;
- `accent` підтримує значення `cyan` або `yellow`;
- `features` — короткий список ключових складових послуги.

Сітка розрахована на чотири картки, але адаптивно підтримує й іншу кількість.

## 5. Блок компетенцій на головній

Файл: `src/components/home/HeroVisual.vue`

Масив `capabilities` керує чотирма картками поверх анімованої орбіти:

```js
const capabilities = [
  { label: 'Розробка', icon: Braces },
  { label: 'Кросбраузерність', icon: Globe2, yellow: true },
  { label: 'Адаптивність', icon: Smartphone },
  { label: 'Чистий код', icon: CodeXml },
]
```

Для збереження поточного макета рекомендовано залишати чотири елементи.

## 6. Назва сайту та метадані

Після зміни власника оновіть:

- `index.html` — заголовок сторінки й опис для пошукових систем;
- `src/router/index.js` — ім’я у динамічному заголовку вкладки;
- `src/components/layout/AppHeader.vue` — назва бренду в хедері;
- `src/components/interactive/DesktopPanel.vue` — ім’я та ініціали в інтерактивному просторі;
- `package.json` і `package-lock.json` — технічна назва пакета.

Технічна назва пакета має складатися з малих латинських літер, цифр і дефісів, наприклад `name-surname-portfolio`.

## 7. Дані термінала

Файл: `src/composables/useTerminal.js`

Команди `about`, `projects` і `contact` уже використовують дані з `profile.js` та `projects.js`. Тексти команди `skills` потрібно змінювати вручну, якщо змінюється стек.

## 8. Резюме та PDF

HTML-версія резюме: `public/resume.html`

У цьому файлі вручну оновлюються:

- ім’я, роль і короткий опис;
- email, телефон, місцезнаходження та URL портфоліо;
- статистика, досвід, проєкти й технології;
- перелік послуг і професійні принципи.

Після редагування HTML обов’язково перегенеруйте PDF:

```bash
npm run resume:pdf
```

Готовий файл буде створено як `public/resume.pdf`.

## 9. Контактна форма

Контакти на сторінці беруться з `src/data/profile.js`.

Для реального надсилання форми скопіюйте `.env.example` у `.env` і задайте endpoint:

```env
VITE_CONTACT_ENDPOINT=https://example.com/api/contact
```

Без endpoint форма працює у демонстраційному режимі та не надсилає дані назовні.

## 10. Перевірка після змін

Запустіть:

```bash
npm test
npm run build
```

Також вручну перевірте:

1. Головну сторінку на desktop і mobile.
2. Усі соціальні посилання.
3. Фільтри та зовнішні посилання у портфоліо.
4. Email і телефон на сторінках «Про мене» та «Контакти».
5. HTML- і PDF-версії резюме.
6. Заголовок вкладки та метаопис.

## Коротка карта файлів

| Що змінюється | Файл |
| --- | --- |
| Ім’я, контакти, опис, статистика, соцмережі | `src/data/profile.js` |
| Проєкти, категорії, посилання | `src/data/projects.js` |
| Прев’ю проєктів | `public/projects/` |
| Послуги | `src/data/services.js` |
| Портрет | `src/assets/images/` і `ProfileCard.vue` |
| Компетенції на головній | `HeroVisual.vue` |
| Бренд у хедері | `AppHeader.vue` |
| Заголовки браузера | `index.html`, `src/router/index.js` |
| Термінал | `src/composables/useTerminal.js` |
| HTML-резюме | `public/resume.html` |
| PDF-резюме | `public/resume.pdf` |
