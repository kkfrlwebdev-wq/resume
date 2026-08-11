<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
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
const { locale, t } = useI18n()
const search = ref('')
const now = ref(new Date())
let clockId = null

const shortcuts = [
  { id: 'about', labelKey: 'desktop.shortcuts.about', kind: 'route', to: '/about', icon: UserRound, tone: 'blue' },
  { id: 'portfolio', labelKey: 'desktop.shortcuts.portfolio', kind: 'route', to: '/portfolio', icon: FolderKanban, tone: 'yellow' },
  { id: 'services', labelKey: 'desktop.shortcuts.services', kind: 'route', to: '/services', icon: Wrench, tone: 'orange' },
  { id: 'contact', labelKey: 'desktop.shortcuts.contact', kind: 'route', to: '/contact', icon: Mail, tone: 'cyan' },
  { id: 'terminal', labelKey: 'desktop.shortcuts.terminal', kind: 'app', icon: TerminalSquare, tone: 'dark' },
  { id: 'achievements', labelKey: 'desktop.shortcuts.achievements', kind: 'app', icon: Trophy, tone: 'gold' },
  { id: 'game', labelKey: 'desktop.shortcuts.game', kind: 'app', icon: Gamepad2, tone: 'purple' },
  { id: 'home', labelKey: 'desktop.shortcuts.home', kind: 'route', to: '/', icon: BriefcaseBusiness, tone: 'blue' },
]

const localizedShortcuts = computed(() => shortcuts.map((shortcut) => ({ ...shortcut, label: t(shortcut.labelKey) })))

const visibleShortcuts = computed(() => {
  const query = search.value.trim().toLocaleLowerCase(locale.value)
  if (!query) return localizedShortcuts.value
  return localizedShortcuts.value.filter((shortcut) => shortcut.label.toLocaleLowerCase(locale.value).includes(query))
})

const browserLocale = computed(() => locale.value === 'en' ? 'en-US' : 'uk-UA')
const time = computed(() => now.value.toLocaleTimeString(browserLocale.value, { hour: '2-digit', minute: '2-digit' }))
const date = computed(() => now.value.toLocaleDateString(browserLocale.value, { day: '2-digit', month: '2-digit', year: 'numeric' }))

onMounted(() => {
  clockId = window.setInterval(() => {
    now.value = new Date()
  }, 30_000)
})

onUnmounted(() => window.clearInterval(clockId))
</script>

<template>
  <section class="desktop" :aria-label="t('desktop.aria')">
    <div class="desktop__glow desktop__glow--one" aria-hidden="true"></div>
    <div class="desktop__glow desktop__glow--two" aria-hidden="true"></div>

    <div class="start-menu">
      <label class="search-box">
        <Search aria-hidden="true" />
        <span class="sr-only">{{ t('desktop.searchLabel') }}</span>
        <input v-model="search" type="search" :placeholder="t('desktop.search')" autocomplete="off" />
      </label>

      <div class="start-menu__heading">
        <h2>{{ t('desktop.pinned') }}</h2>
        <span>{{ t('desktop.apps', { count: visibleShortcuts.length }) }}</span>
      </div>

      <div v-if="visibleShortcuts.length" class="shortcut-grid">
        <template v-for="shortcut in visibleShortcuts" :key="shortcut.id">
          <RouterLink
            v-if="shortcut.kind === 'route'"
            class="shortcut"
            :to="shortcut.to"
            :aria-label="t('desktop.open', { name: shortcut.label })"
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
            :aria-label="t('desktop.open', { name: shortcut.label })"
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
        {{ t('desktop.empty') }}
      </p>

      <footer class="start-menu__footer">
        <div class="profile-chip">
          <span class="profile-chip__avatar" aria-hidden="true">МК</span>
          <span>
            <strong>{{ t('profile.name') }}</strong>
            <small>{{ t('desktop.developer') }}</small>
          </span>
        </div>
        <RouterLink to="/" :aria-label="t('desktop.backHome')">
          <Power aria-hidden="true" />
        </RouterLink>
      </footer>
    </div>

    <footer class="taskbar" :aria-label="t('desktop.taskbar')">
      <button class="windows-button" type="button" :aria-label="t('desktop.menuOpen')">
        <span aria-hidden="true"></span><span aria-hidden="true"></span>
        <span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>

      <button
        v-for="app in localizedShortcuts.filter((item) => item.kind === 'app')"
        :key="app.id"
        :class="['taskbar__app', { 'taskbar__app--active': activeApp === app.id }]"
        type="button"
        :aria-label="t('desktop.open', { name: app.label })"
        @click="emit('open-app', app.id)"
      >
        <component :is="app.icon" aria-hidden="true" />
      </button>

      <div class="taskbar__spacer"></div>

      <div class="system-tray" :aria-label="t('desktop.system')">
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
  min-height: calc(100dvh - 6.375rem);
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 2rem 1.5rem 5.75rem;
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
  filter: blur(.125rem);
  transform: rotate(-18deg);
}

.desktop::before {
  width: 42vw;
  height: 78vh;
  right: 1%;
  border: .25rem solid rgba(72, 185, 255, 0.3);
  border-radius: 45% 55% 68% 32% / 53% 36% 64% 47%;
  box-shadow: inset 2.375rem 0 5rem rgba(24, 137, 255, 0.22), 0 0 4.375rem rgba(0, 146, 255, 0.24);
}

.desktop::after {
  width: 28vw;
  height: 66vh;
  right: 16%;
  border: .1875rem solid rgba(104, 205, 255, 0.32);
  border-radius: 54% 46% 37% 63% / 41% 55% 45% 59%;
}

.desktop__glow {
  border-radius: 50%;
  background: rgba(41, 137, 255, 0.16);
  filter: blur(1.375rem);

  &--one { width: 23.75rem; height: 8.75rem; right: 8%; top: 14%; }
  &--two { width: 18.75rem; height: 11.25rem; left: 11%; bottom: 18%; }
}

.start-menu {
  width: min(100%, 38.75rem);
  max-height: calc(100% - 1.75rem);
  overflow-x: hidden;
  overflow-y: auto;
  border: .0625rem solid rgba(210, 231, 255, 0.16);
  border-radius: 1.125rem;
  background: linear-gradient(150deg, rgba(19, 48, 86, 0.86), rgba(5, 17, 39, 0.91));
  box-shadow: 0 1.875rem 5.625rem rgba(0, 5, 20, 0.58), inset 0 .0625rem rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(1.5rem) saturate(1.2);
}

.search-box {
  display: flex;
  align-items: center;
  gap: .625rem;
  margin: 1.625rem 2rem 1.25rem;
  padding: 0 .875rem;
  border-bottom: .125rem solid #4eb4ff;
  border-radius: .5rem;
  background: rgba(3, 15, 35, 0.65);

  svg { width: 1.125rem; color: #c6d7e8; }

  input {
    width: 100%;
    min-height: 2.625rem;
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
  gap: 1.25rem;
  padding: 0 2.375rem;

  h2 { font-size: 0.94rem; }
  span { color: #a8bad0; font-size: 0.72rem; }
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .5rem .25rem;
  padding: 1.1875rem 1.6875rem 1.75rem;
}

.shortcut {
  min-width: 0;
  min-height: 5.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  padding: .5rem .25rem;
  border: 0;
  border-radius: .5rem;
  background: transparent;
  color: #f6f9ff;
  cursor: pointer;
  font-size: 0.72rem;
  text-align: center;
  text-decoration: none;
  transition: background var(--transition), transform var(--transition);

  &:hover { background: rgba(255, 255, 255, 0.08); transform: translateY(-.125rem); }
}

.shortcut__icon {
  width: 2.6875rem;
  height: 2.6875rem;
  display: grid;
  place-items: center;
  border: .0625rem solid rgba(255, 255, 255, 0.12);
  border-radius: .6875rem;
  box-shadow: inset 0 .0625rem rgba(255, 255, 255, 0.2), 0 .5rem 1rem rgba(0, 0, 0, 0.25);

  svg { width: 1.4375rem; }
  &--blue { background: linear-gradient(145deg, #1b8cff, #0750ba); }
  &--yellow { background: linear-gradient(145deg, #ffcc35, #d6810c); color: #332000; }
  &--orange { background: linear-gradient(145deg, #ff9f36, #cb4611); }
  &--cyan { background: linear-gradient(145deg, #23ddeb, #008995); }
  &--dark { background: linear-gradient(145deg, #294055, #0a111b); color: #57f7ff; }
  &--gold { background: linear-gradient(145deg, #f8cc37, #ae6f00); color: #251800; }
  &--purple { background: linear-gradient(145deg, #9c64ff, #4923aa); }
}

.start-menu__empty {
  min-height: 13.4375rem;
  display: grid;
  place-items: center;
  padding: 1.875rem;
  color: #b5c5d8;
  text-align: center;
}

.start-menu__footer {
  min-height: 4.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .75rem 2.375rem;
  border-top: .0625rem solid rgba(255, 255, 255, 0.08);
  background: rgba(4, 14, 31, 0.48);

  > a {
    width: 2.375rem;
    height: 2.375rem;
    display: grid;
    place-items: center;
    border-radius: .4375rem;
    color: #dceafa;

    &:hover { background: rgba(255, 255, 255, 0.08); }
    svg { width: 1.125rem; }
  }
}

.profile-chip {
  display: flex;
  align-items: center;
  gap: .6875rem;

  > span:last-child { display: flex; flex-direction: column; }
  strong { font-size: 0.78rem; }
  small { color: #9fb2c7; font-size: 0.68rem; }
}

.profile-chip__avatar {
  width: 2.375rem;
  height: 2.375rem;
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
  min-height: 3.375rem;
  display: flex;
  align-items: center;
  gap: .25rem;
  padding: .3125rem .75rem;
  border-top: .0625rem solid rgba(221, 238, 255, 0.16);
  background: rgba(8, 25, 49, 0.83);
  backdrop-filter: blur(1.25rem);
}

.windows-button,
.taskbar__app {
  width: 2.625rem;
  height: 2.625rem;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: .4375rem;
  background: transparent;
  color: #d7eaff;
  cursor: pointer;
  transition: background var(--transition);

  &:hover { background: rgba(255, 255, 255, 0.09); }
  svg { width: 1.25rem; }
}

.windows-button {
  grid-template-columns: repeat(2, .5rem);
  grid-template-rows: repeat(2, .5rem);
  place-content: center;
  gap: .125rem;

  span { width: .5rem; height: .5rem; background: #56bfff; }
}

.taskbar__app { position: relative; }
.taskbar__app--active::after {
  position: absolute;
  right: .6875rem;
  bottom: .125rem;
  left: .6875rem;
  height: .125rem;
  border-radius: 6.1875rem;
  background: #55c7ff;
  content: '';
}

.taskbar__spacer { flex: 1; }

.system-tray {
  display: flex;
  align-items: center;
  gap: .875rem;
  color: #e3effc;
}

.system-tray__icons {
  display: flex;
  gap: .4375rem;
  svg { width: .9375rem; }
}

.system-tray__clock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.66rem;
  line-height: 1.35;
}

@media (max-width: 40em) {
  .desktop {
    min-height: calc(100dvh - var(--header-height) - 5.125rem);
    padding: 1.125rem .625rem 4.5rem;
    place-items: start center;
  }

  .start-menu { border-radius: .875rem; }
  .search-box { margin: 1.125rem 1.125rem 1rem; }
  .start-menu__heading { padding-inline: 1.375rem; }
  .shortcut-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); padding: .875rem .75rem 1.25rem; }
  .start-menu__footer { padding-inline: 1.25rem; }
  .system-tray__icons { display: none; }
}

@media (max-width: 24.375em) {
  .shortcut-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
