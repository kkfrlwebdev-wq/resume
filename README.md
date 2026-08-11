# Kolya Kolchenko — Frontend Portfolio

Адаптивне SPA-портфоліо у темній cyan-естетиці. Проєкт створено на Vue 3 без TypeScript, із Composition API, Vite, Pinia та SCSS.

Докладна інструкція з оновлення особистих даних, проєктів, зображень і резюме: [DATA_CUSTOMIZATION.md](DATA_CUSTOMIZATION.md). Принципи організації коду описані в [ARCHITECTURE.md](ARCHITECTURE.md).

## Можливості

- шість lazy-loaded маршрутів і сторінка 404;
- адаптивний desktop/mobile layout на Flexbox і CSS Grid;
- портфоліо з фільтрами й доступним модальним вікном;
- контактна форма з валідацією, honeypot та API-ready сервісом;
- інтерактивний desktop, термінал, досягнення, пасхалка й мінігра;
- режим невагомості через `Ctrl + Shift + D`;
- підтримка `prefers-reduced-motion`, клавіатурної навігації та focus-visible;
- локальні оптимізовані assets без зовнішніх CDN.

## Запуск

```bash
npm install
npm run dev
```

Production-перевірка:

```bash
npm run lint
npm test
npm run build
```

## GitHub Pages

Проєкт публікується за допомогою `.github/workflows/deploy.yml`. Після push у `main` GitHub Actions запускає lint і тести, створює `dist` та передає його в GitHub Pages.

У налаштуваннях репозиторію виберіть `Settings → Pages → Source → GitHub Actions`. У `Settings → Secrets and variables → Actions` створіть Repository secret `VITE_WEB3FORMS_ACCESS_KEY` зі значенням ключа Web3Forms.

Для репозиторію `resume` встановлено `base: '/resume/'`, тому стандартна адреса сайту — `https://kkfrlwebdev-wq.github.io/resume/`. Маршрути використовують hash-формат, наприклад `/resume/#/about`, щоб пряме відкриття внутрішніх сторінок не повертало GitHub Pages 404.

## Контактна форма

Форма надсилає повідомлення через [Web3Forms](https://web3forms.com/) і працює на статичному GitHub Pages без власного бекенду.

Для локального запуску скопіюйте `.env.example` у `.env` та вкажіть отриманий Web3Forms Access Key:

```env
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

Для GitHub Pages додайте значення `VITE_WEB3FORMS_ACCESS_KEY` до середовища команди `npm run build` у GitHub Actions. Без ключа форма покаже помилку й не імітуватиме успішне надсилання.

## Персоналізація

- особисті дані: `src/data/profile.js`;
- послуги: `src/data/services.js`;
- проєкти: `src/data/projects.js`;
- кольори й дизайн-токени: `src/assets/styles/abstracts/_variables.scss`;
- резюме для друку/PDF: `public/resume.html`;
- готовий PDF: `public/resume.pdf` (оновлення командою `npm run resume:pdf`);
- портрет: `src/assets/images/developer-portrait.jpg`.

Перед публікацією замініть демонстраційні ім’я, контакти, посилання соцмереж і описи робіт на реальні дані.

## Основна структура

```text
src/
├── app/router/      # конфігурація Vue Router
├── assets/          # SCSS і зображення
├── components/      # base, layout та feature-компоненти
├── composables/     # повторно використовувана логіка
├── data/            # контент портфоліо
├── i18n/            # локалізація
├── layouts/         # спільні оболонки сторінок
├── pages/           # route-level компоненти, як у Nuxt
├── plugins/         # реєстрація Pinia, i18n та router
├── services/        # інтеграції API
└── stores/          # Pinia stores
```
