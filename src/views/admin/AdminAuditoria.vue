<template>
  <div class="space-y-10 animate-fade-in text-on-surface">
    <!-- Header -->
    <div class="panel-hero p-6 sm:p-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tighter">Bitácora de <span class="text-accent-neon ">Auditoría</span></h2>
          <p class="text-on-surface/40 mt-1 text-xs font-bold uppercase tracking-widest">Registro de todas las acciones realizadas en el sistema</p>
        </div>
        <button @click="fetchLogs" class="btn-premium btn-secondary-glass !py-4 gap-2">
          <span class="material-symbols-outlined text-sm">refresh</span>
          Actualizar
        </button>
      </div>
    </div>

    <!-- Logs Table -->
    <div class="glass-card-premium rounded-[40px] overflow-hidden border-accent-neon/10">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[980px] text-left border-collapse">
          <thead>
            <tr class="bg-on-surface/[0.03]">
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Fecha y Hora</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Usuario</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Acción</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Entidad</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Descripción</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-on-surface/[0.06]">
            <tr v-for="log in logs" :key="log.id" class="group hover:bg-on-surface/[0.03] transition-colors">
              <td class="p-6 whitespace-nowrap">
                <p class="text-xs font-bold text-on-surface">{{ formatDateTime(log.fecha_creacion).date }}</p>
                <p class="text-[10px] text-accent-neon font-black">{{ formatDateTime(log.fecha_creacion).time }}</p>
              </td>
              <td class="p-6">
                <div v-if="log.usuario" class="flex flex-col">
                  <span class="text-xs font-black">{{ log.usuario.nombres }} {{ log.usuario.apellidos }}</span>
                  <span class="text-[10px] text-on-surface/40 font-bold">{{ log.usuario.correo }}</span>
                </div>
                <span v-else class="text-[10px] font-black text-on-surface/20 uppercase">Sistema</span>
              </td>
              <td class="p-6">
                <span :class="['px-3 py-1 text-[9px] font-black rounded-full border uppercase tracking-widest', getActionClass(log.accion)]">
                  {{ log.accion }}
                </span>
              </td>
              <td class="p-6">
                <span class="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">{{ log.entidad }}</span>
                <span v-if="log.entidad_id" class="text-[10px] text-accent-neon ml-2">#{{ log.entidad_id }}</span>
              </td>
              <td class="p-6">
                <p class="text-[11px] text-on-surface/60 max-w-md line-clamp-2">{{ log.descripcion || 'Sin descripción' }}</p>
              </td>
            </tr>
            <tr v-if="logs.length === 0 && !loading">
              <td colspan="5" class="p-20 text-center">
                <div class="flex flex-col items-center gap-4 text-on-surface/20">
                  <span class="material-symbols-outlined text-6xl">history</span>
                  <p class="text-sm font-black uppercase tracking-widest">No hay registros de auditoría</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-background/60 backdrop-blur-md z-[200] flex items-center justify-center">
      <div class="flex flex-col items-center gap-6">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-neon shadow-[0_0_20px_var(--accent-neon)]"></div>
        <p class="text-[10px] font-black text-accent-neon uppercase tracking-[0.4em]">Cargando Bitácora...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const logs = ref([])
const loading = ref(true)

const fetchLogs = async () => {
  loading.value = true
  try {
    const res = await api.get('/auditoria')
    logs.value = res.data
  } catch (error) {
    console.error('Error fetching logs:', error)
  } finally {
    loading.value = false
  }
}

const formatDateTime = (dateStr) => {
  const d = new Date(dateStr)
  return {
    date: d.toLocaleDateString(),
    time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }
}

const getActionClass = (accion) => {
  const a = accion.toLowerCase()
  if (a.includes('crear') || a.includes('create')) return 'bg-green-500/10 text-green-500 border-green-500/20'
  if (a.includes('eliminar') || a.includes('delete') || a.includes('remove')) return 'bg-red-500/10 text-red-500 border-red-500/20'
  if (a.includes('actualizar') || a.includes('update') || a.includes('patch')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  return 'bg-on-surface/5 text-on-surface/40 border-on-surface/10'
}

onMounted(() => {
  fetchLogs()
})
</script>
