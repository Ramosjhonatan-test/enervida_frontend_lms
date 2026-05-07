<template>
  <header class="student-page-header">
    <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-3xl">
        <p class="student-page-eyebrow">{{ eyebrow }}</p>
        <h1 class="student-page-title">
          {{ title }}
          <span v-if="highlight" class="text-gradient-neon italic">{{ highlight }}</span>
        </h1>
        <p v-if="description" class="student-page-description">{{ description }}</p>
      </div>

      <div v-if="$slots.actions" class="flex shrink-0 flex-wrap gap-3">
        <slot name="actions" />
      </div>
    </div>

    <div
      v-if="stats.length"
      class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <article
        v-for="stat in stats"
        :key="stat.label"
        class="student-stat-card"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="student-stat-label">{{ stat.label }}</p>
            <p class="student-stat-value">{{ stat.value }}</p>
          </div>
          <div
            v-if="stat.icon"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-neon/10 text-accent-neon"
          >
            <span class="material-symbols-outlined text-[20px]">{{ stat.icon }}</span>
          </div>
        </div>
        <p v-if="stat.help" class="student-stat-help">{{ stat.help }}</p>
      </article>
    </div>
  </header>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  highlight: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  stats: {
    type: Array,
    default: () => [],
  },
})
</script>
