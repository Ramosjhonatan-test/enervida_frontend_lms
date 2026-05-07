<template>
  <div class="min-h-screen bg-background text-on-surface">
    <Topbar />
    <div class="max-w-7xl mx-auto p-6">
      <slot />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Topbar from '@/components/Topbar.vue'
</script>
