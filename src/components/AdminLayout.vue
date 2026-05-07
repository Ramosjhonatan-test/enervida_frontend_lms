<template>
  <div class="min-h-screen bg-background text-on-surface">
    <Sidebar />
    <div class="ml-64 min-h-screen">
      <Topbar />
      <main class="p-6">
        <slot />
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
</script>
