<template>
  <header class="h-16 bg-surface-glass border-b border-input-border flex items-center justify-between px-6 sticky top-0 z-20">
    <div class="flex items-center gap-4">
      <button class="md:hidden p-2 rounded-md hover:bg-primary/5">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <div class="relative">
        <input placeholder="Buscar..." class="bg-input-bg border border-input-border rounded-lg px-3 py-2 w-72 text-sm focus:outline-none" />
      </div>
    </div>
    <div class="flex items-center gap-4">
      <ThemeToggle />
      <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5">
        <div class="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-xs font-bold">AD</div>
        <span class="text-sm">Admin</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>
