<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  BatteryMedium,
  BriefcaseBusiness,
  FolderKanban,
  Gamepad2,
  Mail,
  Power,
  Search,
  TerminalSquare,
  Trophy,
  UserRound,
  Volume2,
  Wifi,
  Wrench,
} from '@lucide/vue'

defineProps({
  activeApp: { type: String, default: null },
})

const emit = defineEmits(['open-app'])
const search = ref('')
const now = ref(new Date())
let clockId = null

const shortcuts = [
  { id: 'about', label: 'Про мене', kind: 'route', to: '/about', icon: UserRound, tone: 'blue' },
  { id: 'portfolio', label: 'Портфоліо', kind: 'route', to: '/portfolio', icon: FolderKanban, tone: 'yellow' },
  { id: 'services', label: 'Послуги', kind: 'route', to: '/services', icon: Wrench, tone: 'orange' },
  { id: 'contact', label: 'Контакти', kind: 'route', to: '/contact', icon: Mail, tone: 'cyan' },
  { id: 'terminal', label: 'Термінал', kind: 'app', icon: TerminalSquare, tone: 'dark' },
  { id: 'achievements', label: 'Досягнення', kind: 'app', icon: Trophy, tone: 'gold' },
  { id: 'game', label: 'Мінігра', kind: 'app', icon: Gamepad2, tone: 'purple' },
  { id: 'home', label: 'На головну', kind: 'route', to: '/', icon: BriefcaseBusiness, tone: 'blue' },
]

const visibleShortcuts = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('uk')
  if (!query) return shortcuts
  return shortcuts.filter((shortcut) => shortcut.label.toLocaleLowerCase('uk').includes(query))
})

const time = computed(() => now.value.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }))
const date = computed(() => now.value.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' }))

onMounted(() => {
  clockId = window.setInterval(() => {
    now.value = new Date()
  }, 30_000)
})

onUnmounted(() => window.clearInterval(clockId))
</script>

<template>
  <section class="desktop" aria-label="Інтерактивний робочий стіл">
    <div class="desktop__glow desktop__glow--one" aria-hidden="true"></div>
    <div class="desktop__glow desktop__glow--two" aria-hidden="true"></div>

    <div class="start-menu">
      <label class="search-box">
        <Search aria-hidden="true" />
        <span class="sr-only">Пошук ярликів</span>
        <input v-model="search" type="search" placeholder="Пошук" autocomplete="off" />
      </label>

      <div class="start-menu__heading">
        <h2>Закріплено</h2>
        <span>{{ visibleShortcuts.length }} застосунків</span>
      </div>

      <div v-if="visibleShortcuts.length" class="shortcut-grid">
        <template v-for="shortcut in visibleShortcuts" :key="shortcut.id">
          <RouterLink
            v-if="shortcut.kind === 'route'"
            class="shortcut"
            :to="shortcut.to"
            :aria-label="`Відкрити: ${shortcut.label}`"
          >
            <span :class="['shortcut__icon', `shortcut__icon--${shortcut.tone}`]">
              <component :is="shortcut.icon" aria-hidden="true" />
            </span>
            <span>{{ shortcut.label }}</span>
          </RouterLink>

          <button
            v-else
            class="shortcut"
            type="button"
            :aria-label="`Відкрити: ${shortcut.label}`"
            @click="emit('open-app', shortcut.id)"
          >
            <span :class="['shortcut__icon', `shortcut__icon--${shortcut.tone}`]">
              <component :is="shortcut.icon" aria-hidden="true" />
            </span>
            <span>{{ shortcut.label }}</span>
          </button>
        </template>
      </div>

      <p v-else class="start-menu__empty">
        Нічого не знайдено. Спробуйте інший запит.
      </p>

      <footer class="start-menu__footer">
        <div class="profile-chip">
          <span class="profile-chip__avatar" aria-hidden="true">ІП</span>
          <span>
            <strong>Іван Петренко</strong>
            <small>Веброзробник</small>
          </span>
        </div>
        <RouterLink to="/" aria-label="Повернутися на головну">
          <Power aria-hidden="true" />
        </RouterLink>
      </footer>
    </div>

    <footer class="taskbar" aria-label="Панель завдань">
      <button class="windows-button" type="button" aria-label="Меню вже відкрите">
        <span aria-hidden="true"></span><span aria-hidden="true"></span>
        <span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>

      <button
        v-for="app in shortcuts.filter((item) => item.kind === 'app')"
        :key="app.id"
        :class="['taskbar__app', { 'taskbar__app--active': activeApp === app.id }]"
        type="button"
        :aria-label="`Відкрити ${app.label}`"
        @click="emit('open-app', app.id)"
      >
        <component :is="app.icon" aria-hidden="true" />
      </button>

      <div class="taskbar__spacer"></div>

      <div class="system-tray" aria-label="Стан системи">
        <span class="system-tray__icons" aria-hidden="true">
          <Wifi /><Volume2 /><BatteryMedium />
        </span>
        <span class="system-tray__clock">
          <time :datetime="now.toISOString()">{{ time }}</time>
          <span>{{ date }}</span>
        </span>
      </div>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.desktop {
  position: relative;
  height: 100%;
  min-height: calc(100dvh - 102px);
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 32px 24px 92px;
  background:
    linear-gradient(140deg, rgba(0, 26, 76, 0.2), rgba(0, 7, 24, 0.68)),
    radial-gradient(ellipse at 76% 48%, #1487ff 0, #0753c5 17%, #042b7c 31%, transparent 48%),
    radial-gradient(ellipse at 62% 52%, rgba(0, 176, 255, 0.8), transparent 32%),
    linear-gradient(135deg, #06142f, #020817 70%);
  isolation: isolate;
}

.desktop::before,
.desktop::after,
.desktop__glow {
  position: absolute;
  z-index: -1;
  content: '';
  pointer-events: none;
  filter: blur(2px);
  transform: rotate(-18deg);
}

.desktop::before {
  width: 42vw;
  height: 78vh;
  right: 1%;
  border: 4px solid rgba(72, 185, 255, 0.3);
  border-radius: 45% 55% 68% 32% / 53% 36% 64% 47%;
  box-shadow: inset 38px 0 80px rgba(24, 137, 255, 0.22), 0 0 70px rgba(0, 146, 255, 0.24);
}

.desktop::after {
  width: 28vw;
  height: 66vh;
  right: 16%;
  border: 3px solid rgba(104, 205, 255, 0.32);
  border-radius: 54% 46% 37% 63% / 41% 55% 45% 59%;
}

.desktop__glow {
  border-radius: 50%;
  background: rgba(41, 137, 255, 0.16);
  filter: blur(22px);

  &--one { width: 380px; height: 140px; right: 8%; top: 14%; }
  &--two { width: 300px; height: 180px; left: 11%; bottom: 18%; }
}

.start-menu {
  width: min(100%, 620px);
  max-height: calc(100% - 28px);
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid rgba(210, 231, 255, 0.16);
  border-radius: 18px;
  background: linear-gradient(150deg, rgba(19, 48, 86, 0.86), rgba(5, 17, 39, 0.91));
  box-shadow: 0 30px 90px rgba(0, 5, 20, 0.58), inset 0 1px rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px) saturate(1.2);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 26px 32px 20px;
  padding: 0 14px;
  border-bottom: 2px solid #4eb4ff;
  border-radius: 8px;
  background: rgba(3, 15, 35, 0.65);

  svg { width: 18px; color: #c6d7e8; }

  input {
    width: 100%;
    min-height: 42px;
    border: 0;
    outline: 0;
    background: transparent;
    color: #fff;

    &::placeholder { color: #aebed0; }
  }
}

.start-menu__heading {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  padding: 0 38px;

  h2 { font-size: 0.94rem; }
  span { color: #a8bad0; font-size: 0.72rem; }
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px 4px;
  padding: 19px 27px 28px;
}

.shortcut {
  min-width: 0;
  min-height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 4px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #f6f9ff;
  cursor: pointer;
  font-size: 0.72rem;
  text-align: center;
  text-decoration: none;
  transition: background var(--transition), transform var(--transition);

  &:hover { background: rgba(255, 255, 255, 0.08); transform: translateY(-2px); }
}

.shortcut__icon {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 11px;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.2), 0 8px 16px rgba(0, 0, 0, 0.25);

  svg { width: 23px; }
  &--blue { background: linear-gradient(145deg, #1b8cff, #0750ba); }
  &--yellow { background: linear-gradient(145deg, #ffcc35, #d6810c); color: #332000; }
  &--orange { background: linear-gradient(145deg, #ff9f36, #cb4611); }
  &--cyan { background: linear-gradient(145deg, #23ddeb, #008995); }
  &--dark { background: linear-gradient(145deg, #294055, #0a111b); color: #57f7ff; }
  &--gold { background: linear-gradient(145deg, #f8cc37, #ae6f00); color: #251800; }
  &--purple { background: linear-gradient(145deg, #9c64ff, #4923aa); }
}

.start-menu__empty {
  min-height: 215px;
  display: grid;
  place-items: center;
  padding: 30px;
  color: #b5c5d8;
  text-align: center;
}

.start-menu__footer {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 38px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(4, 14, 31, 0.48);

  > a {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 7px;
    color: #dceafa;

    &:hover { background: rgba(255, 255, 255, 0.08); }
    svg { width: 18px; }
  }
}

.profile-chip {
  display: flex;
  align-items: center;
  gap: 11px;

  > span:last-child { display: flex; flex-direction: column; }
  strong { font-size: 0.78rem; }
  small { color: #9fb2c7; font-size: 0.68rem; }
}

.profile-chip__avatar {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(145deg, #19dce8, #0867a1);
  font-size: 0.72rem;
  font-weight: 800;
}

.taskbar {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-top: 1px solid rgba(221, 238, 255, 0.16);
  background: rgba(8, 25, 49, 0.83);
  backdrop-filter: blur(20px);
}

.windows-button,
.taskbar__app {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #d7eaff;
  cursor: pointer;
  transition: background var(--transition);

  &:hover { background: rgba(255, 255, 255, 0.09); }
  svg { width: 20px; }
}

.windows-button {
  grid-template-columns: repeat(2, 8px);
  grid-template-rows: repeat(2, 8px);
  gap: 2px;

  span { width: 8px; height: 8px; background: #56bfff; }
}

.taskbar__app { position: relative; }
.taskbar__app--active::after {
  position: absolute;
  right: 11px;
  bottom: 2px;
  left: 11px;
  height: 2px;
  border-radius: 99px;
  background: #55c7ff;
  content: '';
}

.taskbar__spacer { flex: 1; }

.system-tray {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #e3effc;
}

.system-tray__icons {
  display: flex;
  gap: 7px;
  svg { width: 15px; }
}

.system-tray__clock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.66rem;
  line-height: 1.35;
}

@media (max-width: 640px) {
  .desktop {
    min-height: calc(100dvh - var(--header-height) - 82px);
    padding: 18px 10px 72px;
    place-items: start center;
  }

  .start-menu { border-radius: 14px; }
  .search-box { margin: 18px 18px 16px; }
  .start-menu__heading { padding-inline: 22px; }
  .shortcut-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 14px 12px 20px; }
  .start-menu__footer { padding-inline: 20px; }
  .system-tray__icons { display: none; }
}

@media (max-width: 390px) {
  .shortcut-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
