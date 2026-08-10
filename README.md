# Kolya Kolchenko — Frontend Portfolio

Адаптивне SPA-портфоліо у темній cyan-естетиці. Проєкт створено на Vue 3 без TypeScript, із Composition API, Vite, Pinia та SCSS.

Докладна інструкція з оновлення особистих даних, проєктів, зображень і резюме: [DATA_CUSTOMIZATION.md](DATA_CUSTOMIZATION.md).

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

## Контактна форма

Скопіюйте `.env.example` у `.env` та задайте endpoint:

```env
VITE_CONTACT_ENDPOINT=https://example.com/api/contact
```

Очікується `POST` із JSON:

```json
{
  "name": "Ім’я",
  "email": "name@example.com",
  "message": "Текст повідомлення"
}
```

Без endpoint форма працює в демонстраційному режимі: перевіряє дані та показує успішний локальний результат, не надсилаючи їх назовні.

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
├── assets/          # SCSS і зображення
├── components/      # base, layout та feature-компоненти
├── composables/     # повторно використовувана логіка
├── data/            # контент портфоліо
├── router/          # маршрутизація
├── services/        # інтеграції API
├── stores/          # Pinia stores
└── views/           # сторінки маршрутизатора
```
