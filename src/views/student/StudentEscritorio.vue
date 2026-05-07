<template>
  <div class="grid grid-cols-1 gap-10 animate-in fade-in xl:grid-cols-[minmax(0,1.7fr)_380px]">
    <div class="space-y-10">
      <StudentPageHeader
        eyebrow="Campus del estudiante"
        title="Tu"
        highlight="Escritorio"
        description="Reorganicé el inicio para que lo urgente quede arriba: continuar un curso, ver nuevas opciones y no perder notificaciones o clases."
        :stats="headerStats"
      />

      <section v-if="ultimoCurso" class="panel-hero p-7 md:p-10">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div class="aspect-video w-full shrink-0 overflow-hidden rounded-3xl border admin-line shadow-2xl lg:w-80">
            <img :src="getImageUrl(ultimoCurso.curso?.miniatura_url)" class="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
          </div>
          <div class="flex-grow">
            <p class="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-accent-neon">Retomar curso</p>
            <h2 class="font-lexend text-3xl font-black leading-none tracking-tight md:text-5xl">{{ ultimoCurso.curso?.titulo }}</h2>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-on-surface/55">
              {{ (ultimoCurso.porcentaje_progreso || 0) > 0 ? 'Continua desde donde lo dejaste y sigue avanzando con una lectura mas limpia del progreso.' : 'Empieza esta ruta hoy y convierte este espacio en tu panel principal de seguimiento.' }}
            </p>
            <div class="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <router-link :to="'/student/course/' + ultimoCurso.curso.id" class="btn-premium btn-primary-neon !justify-center !px-10 !py-5 !text-[11px]">
                {{ (ultimoCurso.porcentaje_progreso || 0) > 0 ? 'Reanudar ahora' : 'Empezar ahora' }}
                <span class="material-symbols-outlined text-sm">play_arrow</span>
              </router-link>
              <div class="w-full max-w-sm">
                <div class="mb-2 flex justify-between text-[10px] font-black uppercase tracking-widest text-on-surface/40">
                  <span>Progreso actual</span>
                  <span class="text-accent-neon">{{ Math.round(ultimoCurso.porcentaje_progreso || 0) }}%</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full admin-soft-bg">
                  <div class="h-full rounded-full bg-accent-neon shadow-[0_0_10px_var(--accent-neon)]" :style="{ width: `${ultimoCurso.porcentaje_progreso || 0}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-else class="panel-hero p-8 md:p-10">
        <p class="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-accent-neon">Bienvenido al campus</p>
        <h2 class="font-lexend text-3xl font-black leading-none tracking-tight md:text-5xl">Empieza tu aprendizaje</h2>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-on-surface/55">
          Explora los cursos disponibles y manda tu solicitud desde una pantalla mucho mas ordenada para avanzar sin friccion.
        </p>
        <router-link to="/student/catalog" class="btn-premium btn-primary-neon mt-8 inline-flex !px-10 !py-5 !text-[11px]">Ver cursos</router-link>
      </section>

      <section class="student-panel p-6 md:p-8">
        <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-accent-neon">Cursos publicados</p>
            <h2 class="font-lexend text-2xl font-black uppercase tracking-tight">Disponibles para ti</h2>
          </div>
          <router-link to="/student/catalog" class="text-[10px] font-black uppercase tracking-widest text-on-surface/35 transition hover:text-accent-neon">Explorar todo</router-link>
        </div>

        <div v-if="loading" class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div v-for="i in 3" :key="i" class="h-80 rounded-[32px] admin-card loading-pulse"></div>
        </div>

        <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="curso in availableCourses.slice(0, 3)" :key="curso.id" class="admin-card group overflow-hidden rounded-[36px] border-admin-border transition-all duration-500 hover:-translate-y-1 hover:border-accent-neon/30">
            <div class="relative h-52 overflow-hidden">
              <img :src="getImageUrl(curso.miniatura_url)" class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <span class="absolute left-4 top-4 rounded-lg border border-accent-neon/20 bg-surface-container/80 px-3 py-1.5 text-[8px] font-black uppercase tracking-widest text-accent-neon">
                {{ curso.categoria?.nombre || curso.nivel || 'Curso' }}
              </span>
            </div>
            <div class="p-7">
              <h3 class="font-lexend text-xl font-black leading-tight transition-colors group-hover:text-accent-neon">{{ curso.titulo }}</h3>
              <p class="mt-3 line-clamp-3 text-sm leading-6 text-on-surface/45">{{ curso.descripcion_corta || curso.descripcion || 'Formacion tecnica especializada.' }}</p>
              <div class="mt-8 flex items-center justify-between gap-4">
                <span class="text-lg font-black text-accent-neon">{{ curso.precio || '0.00' }} <span class="text-[10px]">BS</span></span>
                <button @click="$emit('enroll', curso.id)" class="btn-premium btn-primary-neon !rounded-xl !px-5 !py-3 !text-[10px]">Inscribirme</button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <aside class="space-y-8">
      <section class="student-panel p-7">
        <h2 class="mb-7 flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-on-surface/65">
          <span class="material-symbols-outlined text-accent-neon">notifications</span>
          Notificaciones
        </h2>
        <div v-if="notifications.length === 0" class="py-10 text-center text-[10px] font-black uppercase tracking-widest text-on-surface/25">
          Todo al dia
        </div>
        <div v-else class="space-y-4">
          <div v-for="notif in notifications.slice(0, 5)" :key="notif.id" class="flex gap-4 rounded-2xl border admin-line admin-soft-bg p-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-neon/10 text-accent-neon">
              <span class="material-symbols-outlined text-sm">info</span>
            </div>
            <div class="min-w-0">
              <h3 class="truncate text-xs font-black">{{ notif.titulo }}</h3>
              <p class="mt-1 line-clamp-2 text-[11px] leading-5 text-on-surface/45">{{ notif.mensaje }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="student-panel p-7">
        <h2 class="mb-7 flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-on-surface/65">
          <span class="material-symbols-outlined text-accent-solar">calendar_month</span>
          Calendario
        </h2>
        <div v-if="liveClasses.length === 0" class="py-10 text-center text-[10px] font-black uppercase tracking-widest text-on-surface/25">
          No hay clases programadas
        </div>
        <div v-else class="space-y-4">
          <div v-for="clase in liveClasses.slice(0, 3)" :key="clase.id" class="rounded-2xl border admin-line admin-soft-bg p-5">
            <div class="mb-2 flex items-center justify-between gap-3">
              <span class="text-[9px] font-black uppercase tracking-widest text-accent-neon">{{ formatDate(clase.fecha_inicio) }}</span>
              <span class="text-[9px] font-black text-on-surface/25">{{ formatTime(clase.fecha_inicio) }}</span>
            </div>
            <h3 class="text-xs font-black uppercase tracking-widest text-on-surface/70">{{ clase.titulo }}</h3>
          </div>
        </div>
      </section>
    </aside>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StudentPageHeader from '@/components/student/StudentPageHeader.vue'

const props = defineProps({
  ultimoCurso: {
    type: Object,
    default: null,
  },
  availableCourses: {
    type: Array,
    default: () => [],
  },
  notifications: {
    type: Array,
    default: () => [],
  },
  liveClasses: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['enroll'])

const headerStats = computed(() => [
  {
    label: 'Cursos sugeridos',
    value: props.loading ? '...' : props.availableCourses.length,
    help: 'Oferta visible para continuar tu ruta',
    icon: 'menu_book',
  },
  {
    label: 'Alertas',
    value: props.notifications.length,
    help: 'Mensajes recientes del campus',
    icon: 'notifications',
  },
  {
    label: 'En vivo',
    value: props.liveClasses.length,
    help: 'Sesiones proximas de tus cursos',
    icon: 'videocam',
  },
])

function getImageUrl(url) {
  if (!url) return null
  const value = String(url).trim().replaceAll('\\', '/')
  if (!value) return null
  if (value.startsWith('http')) return value
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')
  const cleanUrl = value.startsWith('/') ? value : `/${value}`
  return `${baseUrl}${cleanUrl}`
}

function formatDate(value) {
  if (!value) return 'Sin fecha'
  return new Date(value).toLocaleDateString('es-BO', { day: '2-digit', month: 'short' })
}

function formatTime(value) {
  if (!value) return ''
  return new Date(value).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
}
</script>
