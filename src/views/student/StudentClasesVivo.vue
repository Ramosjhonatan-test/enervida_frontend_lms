<template>
  <div class="space-y-10 animate-in fade-in">
    <StudentPageHeader
      eyebrow="Calendario academico"
      title="Clases en"
      highlight="Vivo"
      description="Revisa rapidamente que sesion viene, a que curso pertenece y entra sin perder contexto."
      :stats="headerStats"
    />

    <div v-if="loading" class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="i in 3" :key="i" class="h-64 rounded-[40px] admin-card loading-pulse"></div>
    </div>

    <div v-else-if="liveClasses.length === 0" class="student-empty flex flex-col items-center justify-center px-8 py-16 text-center">
      <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-on-surface/5 text-on-surface/20">
        <span class="material-symbols-outlined text-4xl">event_busy</span>
      </div>
      <h2 class="font-lexend text-2xl font-black uppercase tracking-tight">Sin sesiones programadas</h2>
      <p class="mt-4 max-w-xl text-sm leading-7 text-on-surface/35">
        Cuando se agenden nuevas clases, aqui apareceran con una lectura mas rapida para telefono, tablet y escritorio.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="clase in liveClasses"
        :key="clase.id"
        class="admin-card group flex h-full flex-col rounded-[40px] border-admin-border p-8 transition-all hover:border-accent-neon/30 hover:shadow-neon-sm"
      >
        <div class="mb-6 flex items-center justify-between gap-4">
          <div class="flex flex-col">
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-accent-neon">{{ formatDate(clase.fecha_inicio) }}</span>
            <span class="mt-1 text-sm font-bold text-on-surface/40">{{ formatTime(clase.fecha_inicio) }}</span>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-neon/10 text-accent-neon shadow-inner">
            <span class="material-symbols-outlined">videocam</span>
          </div>
        </div>

        <h3 class="font-lexend text-xl font-black leading-tight group-hover:text-accent-neon">{{ clase.titulo }}</h3>
        <p class="mt-4 line-clamp-3 text-sm leading-6 text-on-surface/50">
          {{ clase.descripcion || 'Sesion interactiva en vivo para resolver dudas y profundizar en el contenido del curso.' }}
        </p>

        <div class="mt-8 flex items-center gap-3 rounded-2xl border admin-line admin-soft-bg px-4 py-3">
          <div class="h-10 w-10 overflow-hidden rounded-xl bg-on-surface/5">
            <img :src="getImageUrl(clase.curso?.miniatura_url)" class="h-full w-full object-cover" />
          </div>
          <div class="min-w-0">
            <p class="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface/30">Curso asociado</p>
            <span class="block truncate text-xs font-black uppercase tracking-widest text-on-surface/60">{{ clase.curso?.titulo || 'Curso' }}</span>
          </div>
        </div>

        <div class="mt-auto pt-6">
          <a v-if="clase.url_clase" :href="clase.url_clase" target="_blank" class="btn-premium btn-primary-neon !w-full !py-4 !text-[10px]">
            Unirme ahora
            <span class="material-symbols-outlined text-sm">open_in_new</span>
          </a>
          <button v-else disabled class="btn-premium !w-full !cursor-not-allowed !bg-on-surface/5 !py-4 !text-[10px] !text-on-surface/20">
            Link no disponible
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import api from '@/services/api'
import StudentPageHeader from '@/components/student/StudentPageHeader.vue'

const liveClasses = ref([])
const loading = ref(true)

const headerStats = computed(() => [
  {
    label: 'Sesiones',
    value: loading.value ? '...' : liveClasses.value.length,
    help: 'Programadas para tus cursos',
    icon: 'calendar_month',
  },
  {
    label: 'Acceso',
    value: '1 clic',
    help: 'Entrada directa desde cada tarjeta',
    icon: 'rocket_launch',
  },
])

onMounted(async () => {
  try {
    const response = await api.get('/clases-en-vivo')
    liveClasses.value = response.data
  } catch (error) {
    console.warn('Error loading live classes:', error)
  } finally {
    loading.value = false
  }
})

function getImageUrl(url) {
  if (!url) return null
  const value = String(url).trim().replaceAll('\\', '/')
  if (!value) return null
  if (value.startsWith('http')) return value
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')
  return `${baseUrl}${value.startsWith('/') ? value : '/' + value}`
}

function formatDate(value) {
  if (!value) return 'Sin fecha'
  return new Date(value).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(value) {
  if (!value) return ''
  return new Date(value).toLocaleTimeString('es-BO', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
