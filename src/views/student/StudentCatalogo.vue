<template>
  <section class="space-y-10 animate-in fade-in">
    <StudentPageHeader
      eyebrow="Programas de formacion"
      title="Catalogo de"
      highlight="Cursos"
      description="Explora las rutas disponibles, compara niveles y envia tu solicitud desde una vista mas clara y comoda."
      :stats="headerStats"
    />

    <div v-if="loading" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="i in 8" :key="i" class="h-80 rounded-[32px] admin-card loading-pulse"></div>
    </div>

    <div v-else-if="availableCourses.length === 0" class="student-empty px-6 py-14 text-center sm:px-10">
      <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-neon/10 text-accent-neon">
        <span class="material-symbols-outlined text-4xl">explore</span>
      </div>
      <h2 class="font-lexend text-2xl font-black uppercase tracking-tight">No hay cursos disponibles</h2>
      <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-on-surface/45">
        Cuando se publiquen nuevas rutas formativas, apareceran aqui con sus niveles, precios y acceso rapido.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <article
        v-for="curso in availableCourses"
        :key="curso.id"
        class="admin-card group flex h-full flex-col overflow-hidden rounded-[36px] border-admin-border transition-all duration-500 hover:-translate-y-1 hover:border-accent-neon/30"
      >
        <div class="relative h-52 overflow-hidden">
          <img :src="getImageUrl(curso.miniatura_url)" class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <span class="absolute bottom-4 left-4 rounded-xl bg-accent-neon px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-primary">
            {{ curso.nivel || 'Basico' }}
          </span>
        </div>

        <div class="flex flex-1 flex-col p-7">
          <div class="mb-4 flex items-center justify-between gap-3">
            <span class="rounded-full border border-accent-neon/20 bg-accent-neon/10 px-3 py-1 text-[8px] font-black uppercase tracking-[0.22em] text-accent-neon">
              {{ curso.categoria?.nombre || 'Curso' }}
            </span>
            <span class="text-[10px] font-black uppercase tracking-widest text-on-surface/30">Acceso guiado</span>
          </div>

          <h3 class="font-lexend text-xl font-black leading-tight transition-colors group-hover:text-accent-neon">
            {{ curso.titulo }}
          </h3>
          <p class="mt-3 line-clamp-3 text-sm leading-6 text-on-surface/45">
            {{ curso.descripcion_corta || 'Formacion tecnica especializada para avanzar con criterio y buen ritmo.' }}
          </p>

          <div class="mt-auto flex items-end justify-between gap-4 pt-8">
            <div>
              <p class="text-[9px] font-black uppercase tracking-[0.22em] text-on-surface/30">Inversion</p>
              <span class="text-lg font-black text-accent-neon">{{ curso.precio || '0.00' }} <span class="text-[10px]">BS</span></span>
            </div>
            <button @click="$emit('enroll', curso.id)" class="btn-premium btn-primary-neon !rounded-xl !px-5 !py-3 !text-[10px]">
              Inscribirme
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import StudentPageHeader from '@/components/student/StudentPageHeader.vue'

const props = defineProps({
  availableCourses: {
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
    label: 'Cursos abiertos',
    value: props.loading ? '...' : props.availableCourses.length,
    help: 'Oferta visible para solicitudes',
    icon: 'school',
  },
  {
    label: 'Lectura rapida',
    value: '4 columnas',
    help: 'La grilla se adapta mejor en tablet y movil',
    icon: 'dashboard',
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
</script>
