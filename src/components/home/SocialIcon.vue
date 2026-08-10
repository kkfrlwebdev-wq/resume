<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <template v-if="name === 'GitHub'">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4a5 5 0 0 0-.1-3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
      <path d="M8 19c-3 .9-3-1.5-4.2-2" />
    </template>

    <template v-else-if="name === 'LinkedIn'">
      <rect x="3" y="9" width="4" height="12" rx="1" />
      <path d="M5 3.2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
      <path d="M11 21V9h4v1.8c1-1.4 2.2-2.2 4-2.2 3 0 4 2 4 5.2V21h-4v-6.3c0-1.5-.5-2.5-1.9-2.5-1.5 0-2.1 1.1-2.1 2.8v6" />
    </template>

    <template v-else-if="name === 'Instagram'">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </template>

    <template v-else-if="name === 'Telegram'">
      <path d="m21 3-7.4 18-4.1-6.5L3 11.5 21 3Z" />
      <path d="m9.5 14.5 4-3.5" />
    </template>

    <template v-else-if="name === 'Discord'">
      <path d="M8.5 7.5A12 12 0 0 1 12 7c1.2 0 2.4.2 3.5.5" />
      <path d="M7.4 18.4c-2.2-.7-3.1-1.6-3.1-1.6A16.5 16.5 0 0 1 6.8 7l2.6-1 1 1.5" />
      <path d="M16.6 18.4c2.2-.7 3.1-1.6 3.1-1.6A16.5 16.5 0 0 0 17.2 7l-2.6-1-1 1.5" />
      <path d="M8 17c1.2.8 2.5 1.2 4 1.2s2.8-.4 4-1.2" />
      <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
    </template>
  </svg>
</template>
