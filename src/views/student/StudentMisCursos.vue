<template>
  <div class="space-y-10 animate-in fade-in">
    <StudentPageHeader
      eyebrow="Panel de estudio"
      title="Mis"
      highlight="Cursos"
      description="Retoma lo pendiente, revisa el avance y entra al curso correcto sin perder tiempo."
      :stats="headerStats"
    />

    <div v-if="loading" class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="i in 3" :key="i" class="h-96 rounded-[40px] admin-card loading-pulse"></div>
    </div>

    <div v-else-if="inscripciones.length === 0" class="student-empty flex flex-col items-center justify-center px-8 py-16 text-center">
      <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-on-surface/5 text-on-surface/20">
        <span class="material-symbols-outlined text-4xl">school</span>
      </div>
      <h2 class="font-lexend text-2xl font-black uppercase tracking-tight">Sin cursos activos</h2>
      <p class="mt-4 max-w-xl text-sm leading-7 text-on-surface/35">
        Explora el catalogo y suma una nueva ruta. Cuando tengas inscripciones activas, esta pantalla quedara mucho mas util para seguir tu progreso.
      </p>
      <router-link to="/student/catalog" class="btn-premium btn-primary-neon mt-8 !px-8 !py-4">Ir al catalogo</router-link>
    </div>

    <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="ins in inscripciones"
        :key="ins.id"
        class="admin-card group flex h-full flex-col overflow-hidden rounded-[40px] border-admin-border transition-all duration-500 hover:border-accent-neon/30"
      >
        <div class="relative h-48 overflow-hidden">
          <img :src="getImageUrl(ins.curso?.miniatura_url)" class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span
              :class="[
                'rounded-lg px-2.5 py-1 text-[8px] font-black uppercase tracking-widest shadow-lg',
                ins.estado === 'COMPLETADO' ? 'bg-emerald-500 text-white shadow-emerald-500/30' :
                ins.estado === 'ACTIVO' ? 'bg-accent-neon text-primary shadow-accent-neon/20' :
                'bg-accent-solar text-primary shadow-accent-solar/20'
              ]"
            >
              {{ ins.estado === 'COMPLETADO' ? '✓ Completado' : ins.estado }}
            </span>
            <span class="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-white/80">
              {{ ins.curso?.nivel || 'Ruta guiada' }}
            </span>
          </div>
        </div>

        <div class="flex flex-1 flex-col p-8">
          <div class="flex items-start justify-between gap-4">
            <h3 class="font-lexend text-xl font-black leading-tight group-hover:text-accent-neon">{{ ins.curso?.titulo }}</h3>
            <span :class="[
              'rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.22em]',
              ins.estado === 'COMPLETADO' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-accent-neon/20 bg-accent-neon/10 text-accent-neon'
            ]">
              {{ ins.estado === 'COMPLETADO' ? '100%' : Math.round(ins.porcentaje_progreso || 0) + '%' }}
            </span>
          </div>

          <div class="mt-6 flex flex-col gap-2">
            <div class="flex justify-between text-[10px] font-black uppercase tracking-widest text-on-surface/40">
              <span>Progreso</span>
              <span :class="ins.estado === 'COMPLETADO' ? 'text-emerald-400' : 'text-accent-neon'">
                {{ ins.estado === 'COMPLETADO' ? '100%' : Math.round(ins.porcentaje_progreso || 0) + '%' }}
              </span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full admin-soft-bg">
              <div
                :class="[
                  'h-full rounded-full transition-all duration-1000',
                  ins.estado === 'COMPLETADO' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-accent-neon shadow-[0_0_10px_var(--accent-neon)]'
                ]"
                :style="{ width: ins.estado === 'COMPLETADO' ? '100%' : `${ins.porcentaje_progreso || 0}%` }"
              ></div>
            </div>
          </div>

          <p class="mt-6 text-sm leading-6 text-on-surface/45">
            {{ ins.estado === 'COMPLETADO' ? 'Has finalizado este curso exitosamente. Tu certificado ya esta disponible.' :
               ins.estado === 'ACTIVO' ? 'Listo para continuar donde lo dejaste desde cualquier dispositivo.' :
               'Tu solicitud sigue en revision y quedara habilitada cuando sea aprobada.' }}
          </p>

          <div class="mt-auto pt-8">
            <!-- COMPLETADO: mostrar estado y link a certificados -->
            <div v-if="ins.estado === 'COMPLETADO'" class="flex flex-col gap-3">
              <div class="flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <span class="material-symbols-outlined text-emerald-400">verified</span>
                <span class="text-[10px] font-black uppercase tracking-widest text-emerald-400">Curso completado</span>
              </div>
              <router-link to="/student/certificates" class="btn-premium btn-secondary-glass !w-full !py-3 !text-[10px] gap-2">
                <span class="material-symbols-outlined text-sm">workspace_premium</span>
                Ver certificado
              </router-link>
            </div>

            <!-- ACTIVO: continuar curso -->
            <router-link
              v-else-if="ins.estado === 'ACTIVO'"
              :to="'/student/course/' + ins.curso_id"
              class="btn-premium btn-primary-neon !w-full !py-4 !text-[10px]"
            >
              {{ (ins.porcentaje_progreso || 0) > 0 ? 'Continuar curso' : 'Empezar curso' }}
              <span class="material-symbols-outlined text-sm">play_arrow</span>
            </router-link>

            <!-- PENDIENTE: esperando aprobación -->
            <div v-else class="rounded-2xl border border-dashed border-on-surface/10 bg-on-surface/5 p-4 text-center">
              <span class="text-[9px] font-black uppercase tracking-widest text-on-surface/30">Esperando aprobacion</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StudentPageHeader from '@/components/student/StudentPageHeader.vue'

const props = defineProps({
  inscripciones: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const headerStats = computed(() => {
  const active = props.inscripciones.filter((item) => item.estado === 'ACTIVO').length
  const avg = props.inscripciones.length
    ? Math.round(props.inscripciones.reduce((acc, item) => acc + Number(item.porcentaje_progreso || 0), 0) / props.inscripciones.length)
    : 0

  return [
    {
      label: 'Activos',
      value: props.loading ? '...' : active,
      help: 'Cursos listos para retomar',
      icon: 'play_circle',
    },
    {
      label: 'Avance medio',
      value: `${avg}%`,
      help: 'Promedio general del campus',
      icon: 'trending_up',
    },
  ]
})

function getImageUrl(url) {
  if (!url) return null
  const value = String(url).trim().replaceAll('\\', '/')
  if (!value) return null
  if (value.startsWith('http')) return value
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')
  return `${baseUrl}${value.startsWith('/') ? value : '/' + value}`
}
</script>
