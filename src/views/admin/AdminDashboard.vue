<template>
  <div class="mx-auto max-w-[1400px] space-y-10 animate-fade-in text-on-surface">
    <!-- Hero Section -->
    <section class="panel-hero overflow-hidden rounded-[40px] p-10 relative group">
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-accent-neon/10 rounded-full blur-[120px] group-hover:bg-accent-neon/20 transition-all duration-1000"></div>
      
      <div class="grid gap-10 xl:grid-cols-[1.25fr_0.75fr] xl:items-center relative z-10">
        <div>
          <div class="mb-6 flex flex-wrap items-center gap-4">
            <span class="px-4 py-1.5 rounded-full bg-accent-neon/20 text-accent-neon text-[10px] font-black uppercase tracking-[0.3em] border border-accent-neon/30 animate-pulse-slow">
              SISTEMA ACTIVO
            </span>
            <span class="text-xs font-bold text-on-surface/40 flex items-center gap-2 italic">
              <span class="material-symbols-outlined text-sm">schedule</span>
              Resumen actualizado en tiempo real
            </span>
          </div>
          <h2 class="font-lexend text-4xl md:text-6xl font-black tracking-tighter text-on-surface leading-none">
            Gestión <span class="text-accent-neon">Académica</span>
          </h2>
          <p class="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-on-surface/60 font-medium italic">
            Control total sobre inscripciones, cursos y rendimiento de la academia. 
            Optimiza los procesos de aprendizaje con datos precisos.
          </p>
        </div>

        <div class="glass-card-premium rounded-[32px] p-8 shadow-2xl relative overflow-hidden group/card">
          <div class="absolute inset-0 bg-gradient-to-br from-accent-neon/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
          <div class="mb-6 flex items-center justify-between relative z-10">
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40">Avance Promedio</p>
              <p class="mt-2 text-4xl font-black text-accent-neon font-lexend tracking-tighter italic">74.8%</p>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-accent-neon/10 flex items-center justify-center text-accent-neon border border-accent-neon/20">
              <span class="material-symbols-outlined text-3xl">school</span>
            </div>
          </div>
          <div class="grid h-28 grid-cols-12 items-end gap-2 relative z-10">
            <div v-for="(bar, index) in pulseBars" :key="index" class="rounded-t-xl bg-accent-neon/10 group-hover/card:bg-accent-neon/20 transition-all" :style="{ height: `${bar}%` }">
              <div class="h-full rounded-t-xl bg-gradient-to-t from-accent-neon/40 to-accent-neon opacity-60 group-hover/card:opacity-100 transition-all"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics Grid -->
    <section class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <article v-for="stat in metrics" :key="stat.title" class="glass-card rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 group hover:border-accent-neon/30 shadow-xl">
        <div class="mb-10 flex items-start justify-between gap-4">
          <div class="grid h-16 w-16 place-items-center rounded-2xl bg-on-surface/5 text-on-surface/40 group-hover:bg-accent-neon/10 group-hover:text-accent-neon transition-all duration-500 group-hover:shadow-neon-sm">
            <span class="material-symbols-outlined text-3xl">{{ stat.icon }}</span>
          </div>
          <span class="px-4 py-1.5 rounded-full bg-on-surface/5 text-[9px] font-black uppercase tracking-[0.2em] text-on-surface/40 group-hover:bg-accent-neon/5 group-hover:text-accent-neon transition-all">
            {{ stat.badge }}
          </span>
        </div>
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 mb-2">{{ stat.title }}</p>
        <h3 class="font-lexend text-4xl font-black tracking-tighter group-hover:text-accent-neon transition-colors">{{ stat.value }}</h3>
        <div class="mt-8 h-2.5 overflow-hidden rounded-full bg-on-surface/5 p-0.5">
          <div class="h-full rounded-full bg-gradient-to-r from-accent-neon to-accent-solar shadow-neon-sm" :style="{ width: stat.progress }"></div>
        </div>
      </article>
    </section>

    <!-- Detailed Insights -->
    <section class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <!-- Priorities -->
      <article class="glass-card-premium rounded-[40px] p-8 flex flex-col h-full">
        <div class="mb-8 flex items-center justify-between gap-4">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-accent-neon">Prioridades</p>
            <h3 class="mt-2 font-lexend text-3xl font-black tracking-tight">Acciones Hoy</h3>
          </div>
          <div class="w-12 h-12 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/30">
            <span class="material-symbols-outlined">rule</span>
          </div>
        </div>

        <div class="space-y-4 flex-1">
          <div v-for="item in priorities" :key="item.title" class="group/item relative overflow-hidden rounded-[24px] bg-on-surface/[0.02] p-6 hover:bg-on-surface/[0.04] transition-all duration-300">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-accent-neon/20 group-hover/item:bg-accent-neon transition-all"></div>
            <div class="flex items-start justify-between gap-6 relative z-10">
              <div>
                <p class="font-black text-on-surface tracking-tight leading-none mb-2">{{ item.title }}</p>
                <p class="text-sm text-on-surface/40 font-medium italic">{{ item.detail }}</p>
              </div>
              <span :class="['px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest', item.tone]">
                {{ item.status }}
              </span>
            </div>
          </div>
        </div>
      </article>

      <!-- Activity -->
      <article class="glass-card-premium rounded-[40px] p-8">
        <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-accent-neon italic">Feed de Actividad</p>
            <h3 class="mt-2 font-lexend text-3xl font-black tracking-tight leading-none">Movimiento de la Academia</h3>
          </div>
          <button class="btn-premium !py-3 !px-6 text-[10px] font-black uppercase tracking-widest text-on-surface/60 hover:text-accent-neon transition-all bg-on-surface/5 hover:bg-accent-neon/5">
            Ver Registro Completo
          </button>
        </div>

        <div class="overflow-hidden rounded-[2.5rem] bg-on-surface/[0.01]">
          <div v-for="activity in activities" :key="activity.title" class="group/act grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-center hover:bg-on-surface/[0.03] transition-all duration-300">
            <div class="flex items-center gap-5">
              <div class="shrink-0 grid h-12 w-12 place-items-center rounded-[18px] bg-on-surface/5 text-on-surface/30 group-hover/act:bg-accent-neon/10 group-hover/act:text-accent-neon transition-all duration-500">
                <span class="material-symbols-outlined text-xl">{{ activity.icon }}</span>
              </div>
              <div>
                <p class="font-black text-on-surface tracking-tight">{{ activity.title }}</p>
                <p class="mt-1 text-sm text-on-surface/40 italic font-medium">{{ activity.detail }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-on-surface/30 uppercase tracking-widest italic sm:text-right">
              <span class="w-1.5 h-1.5 rounded-full bg-accent-neon animate-pulse"></span>
              {{ activity.time }}
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const stats = ref({})
const loading = ref(true)

const fetchStats = async () => {
  loading.value = true
  try {
    const res = await api.get('/reportes/dashboard')
    stats.value = res.data
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})

const pulseBars = [42, 48, 55, 62, 58, 66, 71, 68, 74, 79, 76, 84]

const metrics = [
  { title: 'Ingresos totales', get value() { return `${Number(stats.value.totalVentas || 0).toFixed(2)} Bs` }, icon: 'payments', badge: 'Finanzas', progress: '76%' },
  { title: 'Estudiantes activos', get value() { return stats.value.totalEstudiantes || 0 }, icon: 'groups', badge: 'Comunidad', progress: '62%' },
  { title: 'Cursos disponibles', get value() { return stats.value.totalCursos || 0 }, icon: 'auto_stories', badge: 'Academia', progress: '84%' },
]

const priorities = [
  { title: 'Revisar nuevas solicitudes', detail: 'Validar postulaciones pendientes antes del cierre diario.', status: 'Alta', tone: 'bg-red-500/10 text-red-500' },
  { title: 'Actualizar cupos de cursos', detail: 'Ajustar disponibilidad segun demanda y avance de cohortes.', status: 'Media', tone: 'bg-accent-solar/10 text-accent-solar' },
  { title: 'Revisar progreso estudiantil', detail: 'Detectar estudiantes con baja actividad esta semana.', status: 'Normal', tone: 'bg-accent-neon/10 text-accent-neon' },
]

const activities = [
  { title: 'Nuevo estudiante registrado', detail: 'Se agrego un perfil a la cohorte solar.', time: 'Hace 4 min', icon: 'person_add' },
  { title: 'Contenido actualizado', detail: 'Una leccion recibio material nuevo para estudiantes.', time: 'Hace 18 min', icon: 'edit_note' },
  { title: 'Reporte academico generado', detail: 'Resumen de avance exportado correctamente.', time: 'Hace 1 h', icon: 'analytics' },
]
</script>
