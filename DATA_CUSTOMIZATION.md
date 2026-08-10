# Як змінювати дані портфоліо

Цей документ описує структуру контенту, перекладів і медіафайлів проєкту. Після змін обов’язково перевіряйте обидві мови — UA та EN.

## 1. Локалізація (Vue I18n)

У проєкті використовується `vue-i18n` у Composition API mode (`legacy: false`). Основні файли:

- `src/i18n/index.js` — створення i18n, перелік підтримуваних мов і збереження вибору;
- `src/i18n/messages/uk.js` — усі українські тексти;
- `src/i18n/messages/en.js` — усі англійські тексти;
- `src/components/layout/LanguageSwitcher.vue` — перемикач UA / EN;
- `src/components/layout/AppHeader.vue` — місце перемикача в хедері.

Вибрана мова зберігається в `localStorage` під ключем `portfolio-locale`, тому після перезавантаження сторінки вона не скидається. Одночасно оновлюються атрибут `<html lang>`, заголовок вкладки та meta description.

### Як змінити переклад

Знайдіть однаковий ключ у двох словниках і змініть значення:

```js
// src/i18n/messages/uk.js
about: {
  title: 'Хто я?',
}

// src/i18n/messages/en.js
about: {
  title: 'Who am I?',
}
```

У компонентах простий текст виводиться через `$t`:

```vue
<h1>{{ $t('about.title') }}</h1>
```

У `<script setup>` використовується `useI18n`:

```js
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const label = t('about.title')
```

Не додавайте видимий текст безпосередньо в `.vue` або `.js` файли. Створіть однаковий ключ у `uk.js` та `en.js`, інакше спрацює українська fallback-мова.

### Де знаходиться перемикач мови

Перемикач додано в `src/components/layout/AppHeader.vue` у контейнер `.header-actions`, безпосередньо перед кнопкою мінігри — це зона, позначена червоним прямокутником на макеті:

```vue
<div class="header-actions">
  <LanguageSwitcher />
  <RouterLink class="game-link" to="/desktop?app=game">
    <!-- кнопка мінігри -->
  </RouterLink>
</div>
```

Щоб змінити вигляд кнопок UA / EN, редагуйте scoped-стилі в `LanguageSwitcher.vue`. Щоб перенести перемикач, перемістіть `<LanguageSwitcher />` у шаблоні `AppHeader.vue`.

### Як додати третю мову

1. Скопіюйте `src/i18n/messages/en.js`, наприклад у `pl.js`, і перекладіть усі значення без зміни ключів.
2. Імпортуйте словник у `src/i18n/index.js`.
3. Додайте код мови до `supportedLocales` і об’єкта `messages`.
4. Додайте підпис, наприклад `language.pl`, в усі словники.
5. Додайте код у масив мов у `LanguageSwitcher.vue`.

## 2. Основні дані профілю

Файл `src/data/profile.js` містить дані, які не потребують перекладу:

```js
export const profile = {
  email: 'name@example.com',
  phone: '+38 (000) 000 00 00',
  stats: [
    { value: '3+', labelKey: 'profile.stats.experience' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/username' },
  ],
}
```

Ім’я, роль, місцезнаходження, мови, опис і доступність тепер змінюються у словниках `uk.js` та `en.js` у секції `profile`. Значення `labelKey` у статистиці повинно посилатися на наявний ключ перекладу.

Підтримувані назви соцмереж: `GitHub`, `LinkedIn`, `Instagram`, `Telegram`, `Discord`. Відповідні іконки визначені в `src/components/home/SocialIcon.vue`.

## 3. Портрет

Поточний файл: `src/assets/images/kolya-kolchenko.webp`.

Імпорт розміщений у `src/components/about/ProfileCard.vue`. Для заміни:

1. Додайте нове зображення в `src/assets/images/`.
2. Змініть шлях імпорту в `ProfileCard.vue`.
3. За потреби відкоригуйте `object-position` у стилях компонента.

Рекомендований формат — WebP або JPEG, орієнтовний розмір файлу до 500 КБ. Компонент адаптивний, тому перевірте кадрування на desktop і mobile.

## 4. Проєкти та категорії

Технічні дані зберігаються у `src/data/projects.js`:

```js
{
  id: 1,
  title: 'Project name',
  translationKey: 'projectName',
  category: 'landing',
  stack: ['HTML5', 'SCSS', 'JavaScript'],
  image: projectImage('project-name.webp'),
  href: 'https://example.com/',
}
```

Для кожного проєкту:

- `id` має бути унікальним;
- `translationKey` має відповідати ключу в `portfolio.projects` обох словників;
- `category` має відповідати `id` категорії;
- `href` має містити повну адресу з `https://` або `http://`;
- файл `image` зберігається в `public/projects/`.

Локалізовані `category` і `description` додаються в `portfolio.projects.<translationKey>` у `uk.js` та `en.js`. Підписи фільтрів зберігаються в `portfolio.categories`.

## 5. Послуги

Файл `src/data/services.js` містить лише технічну конфігурацію:

```js
{
  translationKey: 'development',
  icon: Braces,
  accent: 'cyan',
}
```

Назва, опис і `features` зберігаються в `services.items.<translationKey>` обох словників. `icon` імпортується з `@lucide/vue`, а `accent` підтримує `cyan` або `yellow`.

## 6. Головна сторінка та компетенції

Тексти головної сторінки зберігаються в секції `home` словників. Масив карток компетенцій у `src/components/home/HeroVisual.vue` використовує `labelKey`; для нової картки створіть відповідний переклад у `home.capabilities`.

## 7. Навігація, метадані й інтерактивні модулі

- `src/data/navigation.js` — маршрути та їхні `labelKey`;
- `src/router/index.js` — `titleKey` сторінок;
- секції `desktop`, `terminal`, `achievements` і `game` у словниках — тексти інтерактивного простору;
- `meta.description` — локалізований meta description;
- `profile.name` — ім’я в заголовку вкладки.

Назва бренду `Kolya Kolchenko` у `AppHeader.vue` залишена латиницею для обох мов. Ініціали в інтерактивному просторі налаштовуються в `DesktopPanel.vue`.

## 8. Резюме та PDF

HTML-версія резюме: `public/resume.html`. Це окрема статична сторінка, тому її текст не керується Vue I18n і редагується вручну.

### Як змінити адресу портфоліо в резюме

У файлі `public/resume.html` знайдіть поточну адресу, наприклад `afix-ua.github.io/portfolio`, і замініть її на актуальну. Щоб адреса була клікабельною, використовуйте повний URL у `href`:

```html
<li>
  <span class="contact-icon" aria-hidden="true">↗</span>
  <a href="https://username.github.io/repository/">
    username.github.io/repository
  </a>
</li>
```

Редагувати `public/resume.pdf` вручну не потрібно. Спочатку змініть адресу в HTML, а потім перегенеруйте PDF наведеною нижче командою — нова адреса потрапить в обидві версії резюме.

Після зміни HTML перегенеруйте PDF:

```bash
npm run resume:pdf
```

Готовий файл буде створено як `public/resume.pdf`.

## 9. Контактна форма

Контакти беруться з `src/data/profile.js`, а підписи, placeholder-и, валідація та сповіщення — із секцій `contact`, `validation` і `notifications` у словниках.

Форма використовує Web3Forms. Для локального запуску скопіюйте `.env.example` у `.env` і задайте Access Key:

```env
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

Запити надсилаються на `https://api.web3forms.com/submit`. Для GitHub Pages передайте `VITE_WEB3FORMS_ACCESS_KEY` у середовище production-збірки через GitHub Actions. Файл `.env` ігнорується Git та використовується лише локально. Без ключа форма повертає помилку і не показує фальшивий успішний результат.

## 10. Перевірка після змін

Запустіть:

```bash
npm test
npm run build
```

Вручну перевірте:

1. Перемикання UA / EN на всіх маршрутах.
2. Збереження вибраної мови після перезавантаження.
3. Desktop і mobile хедер без переповнення.
4. Картки послуг, проєкти, модальні вікна, форму, термінал, досягнення та мінігру.
5. Заголовок вкладки, meta description і атрибут `<html lang>`.
6. Посилання соцмереж, резюме та зовнішні посилання портфоліо.

## Коротка карта файлів

| Що змінюється | Файл |
| --- | --- |
| Українські тексти | `src/i18n/messages/uk.js` |
| Англійські тексти | `src/i18n/messages/en.js` |
| Конфігурація мов | `src/i18n/index.js` |
| Перемикач UA / EN | `src/components/layout/LanguageSwitcher.vue` |
| Позиція перемикача | `src/components/layout/AppHeader.vue` |
| Email, телефон, статистика, соцмережі | `src/data/profile.js` |
| Проєкти та посилання | `src/data/projects.js` |
| Прев’ю проєктів | `public/projects/` |
| Послуги | `src/data/services.js` і словники |
| Портрет | `src/assets/images/` і `ProfileCard.vue` |
| HTML-резюме | `public/resume.html` |
| PDF-резюме | `public/resume.pdf` |
