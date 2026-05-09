<template>
  <div class="relative min-h-screen">
    <!-- Orbes decorativos de fondo -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-accent-neon/5 blur-[120px]"></div>
      <div class="absolute -right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-accent-solar/5 blur-[100px]"></div>
    </div>

    <div class="relative z-10 space-y-12">
      <EstudiantePageHeader
        eyebrow="Programas de formación"
        title="Catálogo de"
        highlight="Cursos"
        description="Explora las rutas disponibles, compara niveles y envía tu solicitud desde una vista más clara y cómoda."
      />

      <div v-if="loading" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="i in 8" :key="i" class="h-80 rounded-[32px] course-card-premium loading-pulse"></div>
      </div>

      <div v-else-if="availableCourses.length === 0" class="student-empty flex flex-col items-center justify-center p-16 text-center">
        <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-accent-neon/10 text-accent-neon">
          <span class="material-symbols-outlined text-5xl">explore</span>
        </div>
        <h2 class="font-lexend text-3xl font-black">No hay cursos disponibles</h2>
        <p class="mx-auto mt-4 max-w-md text-on-surface/50">
          Cuando se publiquen nuevas rutas formativas, aparecerán aquí con sus niveles, precios y acceso rápido.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article
          v-for="curso in availableCourses"
          :key="curso.id"
          class="course-card-premium group"
        >
          <div class="relative h-56 overflow-hidden">
            <img :src="getFileUrl(curso.miniatura_url)" class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <span class="absolute bottom-6 left-6 rounded-full bg-accent-neon px-4 py-2 text-[9px] font-black uppercase tracking-widest text-primary shadow-xl">
              {{ curso.nivel || 'Básico' }}
            </span>
          </div>

          <div class="flex flex-1 flex-col p-8">
            <div class="mb-6 flex items-center justify-between gap-3">
              <span class="rounded-full border border-accent-neon/20 bg-accent-neon/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-accent-neon">
                {{ curso.categoria?.nombre || 'Curso' }}
              </span>
              <span class="text-[10px] font-black uppercase tracking-widest text-on-surface/30">Acceso guiado</span>
            </div>

            <h3 class="font-lexend text-2xl font-black leading-tight text-on-surface group-hover:text-accent-neon transition-colors">
              {{ curso.titulo }}
            </h3>
            <p class="mt-4 line-clamp-3 text-sm leading-relaxed text-on-surface/50">
              {{ curso.descripcion_corta || 'Formación técnica especializada para avanzar con criterio y buen ritmo.' }}
            </p>

            <div class="mt-auto flex items-end justify-between gap-4 pt-10">
              <div>
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/30">Inversión</p>
                <span class="text-2xl font-black text-accent-neon">{{ curso.precio || '0.00' }} <span class="text-[10px]">BS</span></span>
              </div>
              <button @click="$emit('enroll', curso.id)" class="btn-premium btn-primary-neon !rounded-2xl !px-8 !py-4 !text-[11px]">
                Inscribirme
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import EstudiantePageHeader from '@/components/estudiante/EstudiantePageHeader.vue'
import { getFileUrl } from '@/config'

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

</script>
