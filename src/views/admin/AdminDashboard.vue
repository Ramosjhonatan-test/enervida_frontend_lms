<template>
  <div class="mx-auto max-w-[1400px] space-y-8">
    <section class="admin-card overflow-hidden rounded-[28px] p-6 md:p-8">
      <div class="grid gap-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
        <div>
          <div class="mb-5 flex flex-wrap items-center gap-3">
            <span class="admin-chip rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.26em]">En vivo</span>
            <span class="text-xs font-bold text-on-surface-variant">Resumen actualizado hace un momento</span>
          </div>
          <h2 class="font-lexend text-3xl font-black tracking-tight text-on-surface md:text-5xl">
            Gestion academica
          </h2>
          <p class="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
            Un tablero tranquilo para seguir inscripciones, cursos y rendimiento de la academia.
          </p>
        </div>

        <div class="admin-soft-bg rounded-3xl border admin-line p-5">
          <div class="mb-5 flex items-center justify-between">
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.24em] text-on-surface-variant">Avance promedio</p>
              <p class="mt-1 text-2xl font-black text-accent-neon">74%</p>
            </div>
            <span class="material-symbols-outlined text-4xl text-accent-neon">school</span>
          </div>
          <div class="grid h-24 grid-cols-12 items-end gap-2">
            <div v-for="(bar, index) in pulseBars" :key="index" class="rounded-t-full bg-accent-neon/20" :style="{ height: `${bar}%` }">
              <div class="h-full rounded-t-full bg-gradient-to-t from-accent-neon to-accent-solar opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 gap-5 md:grid-cols-3">
      <article v-for="stat in metrics" :key="stat.title" class="admin-card rounded-[24px] p-5 transition hover:-translate-y-1 hover:border-accent-neon/40">
        <div class="mb-8 flex items-start justify-between gap-4">
          <div class="grid h-12 w-12 place-items-center rounded-2xl bg-accent-neon/10 text-accent-neon">
            <span class="material-symbols-outlined">{{ stat.icon }}</span>
          </div>
          <span class="admin-soft-bg rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant">{{ stat.badge }}</span>
        </div>
        <p class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">{{ stat.title }}</p>
        <h3 class="mt-2 font-lexend text-3xl font-black tracking-tight md:text-4xl">{{ stat.value }}</h3>
        <div class="admin-soft-bg mt-5 h-2 overflow-hidden rounded-full">
          <div class="h-full rounded-full bg-gradient-to-r from-accent-neon to-accent-solar" :style="{ width: stat.progress }"></div>
        </div>
      </article>
    </section>

    <section class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <article class="admin-card rounded-[28px] p-6">
        <div class="mb-6 flex items-center justify-between gap-4">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.24em] text-accent-neon">Prioridades</p>
            <h3 class="mt-2 font-lexend text-2xl font-black">Hoy</h3>
          </div>
          <span class="material-symbols-outlined text-3xl text-on-surface-variant">rule</span>
        </div>

        <div class="space-y-3">
          <div v-for="item in priorities" :key="item.title" class="admin-soft-bg rounded-2xl border admin-line p-4">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="font-bold">{{ item.title }}</p>
                <p class="mt-1 text-sm text-on-surface-variant">{{ item.detail }}</p>
              </div>
              <span :class="['rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]', item.tone]">{{ item.status }}</span>
            </div>
          </div>
        </div>
      </article>

      <article class="admin-card rounded-[28px] p-6">
        <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.24em] text-accent-neon">Actividad reciente</p>
            <h3 class="mt-2 font-lexend text-2xl font-black">Movimiento de la academia</h3>
          </div>
          <button class="rounded-2xl border admin-line px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant transition hover:border-accent-neon/40 hover:text-accent-neon">
            Ver todo
          </button>
        </div>

        <div class="overflow-hidden rounded-2xl border admin-line">
          <div v-for="activity in activities" :key="activity.title" class="admin-soft-bg grid gap-3 border-b admin-line p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
            <div class="flex items-start gap-3">
              <div class="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-neon/10 text-accent-neon">
                <span class="material-symbols-outlined text-[19px]">{{ activity.icon }}</span>
              </div>
              <div>
                <p class="font-bold">{{ activity.title }}</p>
                <p class="mt-1 text-sm text-on-surface-variant">{{ activity.detail }}</p>
              </div>
            </div>
            <span class="text-xs font-bold text-on-surface-variant">{{ activity.time }}</span>
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
  { title: 'Ingresos totales', get value() { return `${(stats.value.totalVentas || 0).toFixed(2)} Bs` }, icon: 'payments', badge: 'Finanzas', progress: '76%' },
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
