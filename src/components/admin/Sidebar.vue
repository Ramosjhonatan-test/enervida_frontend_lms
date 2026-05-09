<template>
  <aside class="w-64 bg-surface-container h-screen border-r border-input-border fixed top-0 left-0 pt-6">
    <div class="px-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="min-w-0">
          <AppLogo :img-style="{ height: 'clamp(2rem, 4vw, 2.5rem)' }" img-class="w-auto object-contain" />
          <div class="text-xs text-on-surface-variant mt-1">Admin panel</div>
        </div>
      </div>
      <nav class="space-y-1">
        <router-link to="/admin" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-primary/5">
          <span class="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/admin/cursos" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-primary/5">
          <span class="material-symbols-outlined">school</span>
          <span>Cursos</span>
        </router-link>
        <router-link to="/admin/estudiantes" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-primary/5">
          <span class="material-symbols-outlined">people</span>
          <span>Estudiantes</span>
        </router-link>
        <router-link to="/admin/solicitudes" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-primary/5">
          <span class="material-symbols-outlined">assignment</span>
          <span>Solicitudes</span>
        </router-link>
        <router-link to="/admin/auditoria" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-primary/5">
          <span class="material-symbols-outlined">history</span>
          <span>Auditoría</span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import AppLogo from '@/components/global/AppLogo.vue'
// Sidebar for admin sections
</script>
