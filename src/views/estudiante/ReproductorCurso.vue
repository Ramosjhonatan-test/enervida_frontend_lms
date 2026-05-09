<template>
  <div class="min-h-screen bg-background text-on-surface">
    <transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 z-40 bg-background/75 backdrop-blur-xl lg:hidden"
        @click="isSidebarOpen = false"
      ></div>
    </transition>

    <div class="flex min-h-screen">
      <aside
        :class="[
          'fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-sm flex-col border-r border-on-surface/5 bg-background/95 backdrop-blur-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-[360px] lg:max-w-none lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <div class="border-b border-on-surface/5 p-6">
          <div class="mb-6 flex items-center justify-between gap-4">
            <router-link to="/student/dashboard" class="flex items-center gap-3 text-accent-neon transition hover:gap-4">
              <span class="material-symbols-outlined text-sm font-black">arrow_back</span>
              <span class="text-[10px] font-black uppercase tracking-[0.3em]">Volver al portal</span>
            </router-link>
            <button
              type="button"
              class="grid h-10 w-10 place-items-center rounded-2xl bg-on-surface/5 text-on-surface/60 lg:hidden"
              @click="isSidebarOpen = false"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <h2 class="line-clamp-2 font-lexend text-xl font-black tracking-tight">{{ curso?.titulo }}</h2>
          <p class="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-on-surface/30">Curso certificado</p>

          <div class="mt-6 space-y-2">
            <div class="flex items-end justify-between">
              <span class="text-[9px] font-black uppercase tracking-widest text-on-surface/40">Tu progreso</span>
              <span class="text-sm font-black text-accent-neon">{{ Math.round(progresoGeneral) }}%</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-on-surface/5">
              <div class="h-full bg-accent-neon shadow-[0_0_10px_var(--accent-neon)] transition-all duration-1000" :style="{ width: progresoGeneral + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
          <div v-for="(modulo, mIdx) in curso?.modulos" :key="modulo.id" class="space-y-2">
            <div class="flex items-center gap-3 px-3 py-2 opacity-60">
              <span class="text-[10px] font-black uppercase tracking-widest text-accent-solar">Modulo {{ mIdx + 1 }}</span>
              <div class="h-px flex-1 bg-on-surface/10"></div>
            </div>
            <h3 class="px-3 text-xs font-black uppercase tracking-widest">{{ modulo.titulo }}</h3>

            <div class="space-y-1">
              <button
                v-for="leccion in modulo.lecciones"
                :key="leccion.id"
                @click="selectLeccion(leccion)"
                :class="[
                  'w-full rounded-2xl px-3 py-3 text-left transition-all',
                  activeLeccion?.id === leccion.id ? 'bg-accent-neon/10 border border-accent-neon/20 shadow-lg' : 'hover:bg-on-surface/5'
                ]"
              >
                <div class="flex items-start gap-3">
                  <div
                    :class="[
                      'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors',
                      leccionCompletada(leccion.id) ? 'bg-accent-neon text-primary' : (activeLeccion?.id === leccion.id ? 'bg-accent-neon/20 text-accent-neon' : 'bg-on-surface/5 text-on-surface/40')
                    ]"
                  >
                    <span class="material-symbols-outlined text-sm font-black">{{ leccionCompletada(leccion.id) ? 'check' : getIcon(leccion.tipo_contenido) }}</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p :class="['line-clamp-2 text-sm font-bold leading-snug transition-colors', activeLeccion?.id === leccion.id ? 'text-accent-neon' : 'text-on-surface/70']">
                      {{ leccion.titulo }}
                    </p>
                    <p class="mt-1 text-[9px] font-medium uppercase tracking-wider text-on-surface/35">
                      {{ leccion.duracion_minutos || 0 }} min · {{ leccion.tipo_contenido }}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div v-if="curso?.evaluaciones?.length > 0 && progresoGeneral >= 100" class="mt-6 rounded-[28px] border border-accent-neon/20 bg-accent-neon/5 p-4">
            <p class="mb-4 text-center text-[9px] font-black uppercase tracking-widest text-accent-neon">Contenido completado</p>
            <router-link :to="'/student/exam/' + curso.evaluaciones[0].id" class="btn-premium btn-primary-neon !w-full !py-4 gap-2">
              <span class="material-symbols-outlined text-sm">assignment</span>
              Tomar evaluacion
            </router-link>
          </div>
        </div>
      </aside>

      <main class="flex min-w-0 flex-1 flex-col">
        <header class="sticky top-0 z-30 border-b border-on-surface/5 bg-background/85 px-4 py-4 backdrop-blur-xl md:px-6 lg:px-10">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div class="flex min-w-0 items-center gap-3">
              <button @click="isSidebarOpen = !isSidebarOpen" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-on-surface/5 text-on-surface/60 hover:text-accent-neon transition-all">
                <span class="material-symbols-outlined">{{ isSidebarOpen ? 'menu_open' : 'menu' }}</span>
              </button>
              <div class="min-w-0">
                <p class="text-[9px] font-black uppercase tracking-[0.2em] text-accent-neon opacity-70">{{ curso?.categoria?.nombre || 'Curso' }}</p>
                <h1 class="truncate text-sm font-black uppercase tracking-widest md:text-base">{{ activeLeccion?.titulo || 'Cargando curso...' }}</h1>
              </div>
            </div>

            <div class="flex items-center justify-between gap-3 md:justify-end">
              <div class="rounded-2xl border border-on-surface/5 bg-on-surface/[0.03] px-4 py-2">
                <p class="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface/30">Avance</p>
                <p class="text-sm font-black text-accent-neon">{{ Math.round(progresoGeneral) }}%</p>
              </div>
              <div class="flex items-center gap-2">
                <button @click="prevLeccion" :disabled="!hasPrev" class="flex h-10 w-10 items-center justify-center rounded-xl bg-on-surface/5 text-on-surface/60 transition-all hover:text-accent-neon disabled:opacity-20">
                  <span class="material-symbols-outlined">navigate_before</span>
                </button>
                <button @click="nextLeccion" :disabled="!hasNext" class="flex h-10 w-10 items-center justify-center rounded-xl bg-on-surface/5 text-on-surface/60 transition-all hover:text-accent-neon disabled:opacity-20">
                  <span class="material-symbols-outlined">navigate_next</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div class="custom-scrollbar flex-1 overflow-y-auto bg-black/20">
          <div v-if="loading" class="flex h-full min-h-[60vh] flex-col items-center justify-center gap-6 p-6">
            <div class="h-16 w-16 animate-spin rounded-full border-t-2 border-accent-neon shadow-[0_0_20px_var(--accent-neon)]"></div>
            <p class="text-[10px] font-black uppercase tracking-[0.4em] text-accent-neon">Cargando contenido...</p>
          </div>

          <div v-else-if="activeLeccion" class="mx-auto flex w-full max-w-6xl flex-col gap-8 p-4 md:p-6 lg:p-10">
            <div v-if="activeLeccion.tipo_contenido === 'VIDEO'" class="aspect-video w-full overflow-hidden rounded-[28px] border border-on-surface/5 bg-black shadow-2xl">
              <iframe
                v-if="isYoutube(activeLeccion.video_url)"
                :src="getYoutubeEmbed(activeLeccion.video_url)"
                class="h-full w-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <video v-else-if="activeLeccion.video_url" :src="getFileUrl(activeLeccion.video_url)" controls class="h-full w-full"></video>
              <div v-else class="flex h-full items-center justify-center text-on-surface/20">
                <p class="text-xs font-black uppercase tracking-widest">Video no disponible</p>
              </div>
            </div>

            <div v-else-if="activeLeccion.tipo_contenido === 'PDF'" class="h-[68vh] min-h-[460px] w-full overflow-hidden rounded-[28px] border border-on-surface/5 bg-on-surface/[0.03]">
              <iframe :src="getFileUrl(activeLeccion.pdf_url)" class="h-full w-full" frameborder="0"></iframe>
            </div>

            <div v-else class="glass-card-premium min-h-[320px] rounded-[36px] border-on-surface/5 p-6 md:p-10 lg:p-14">
              <div class="prose max-w-none prose-headings:text-on-surface prose-p:text-on-surface/70" v-html="activeLeccion.descripcion || 'No hay descripcion adicional para esta leccion.'"></div>
            </div>

            <section class="student-panel p-6 md:p-8">
              <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="text-[10px] font-black uppercase tracking-[0.24em] text-accent-neon">Leccion activa</p>
                  <h2 class="mt-2 font-lexend text-2xl font-black tracking-tight">{{ activeLeccion.titulo }}</h2>
                  <p class="mt-3 text-sm leading-7 text-on-surface/50">
                    Instructor: {{ curso?.instructor?.nombres }} {{ curso?.instructor?.apellidos }}
                  </p>
                </div>

                <button
                  @click="toggleComplete"
                  :disabled="marking"
                  :class="[
                    'btn-premium !w-full md:!w-auto !justify-center !py-4 !px-8 gap-3',
                    leccionCompletada(activeLeccion.id) ? 'btn-secondary-glass border-accent-neon text-accent-neon' : 'btn-primary-neon'
                  ]"
                >
                  <span class="material-symbols-outlined text-sm font-black">{{ leccionCompletada(activeLeccion.id) ? 'check_circle' : 'task_alt' }}</span>
                  {{ leccionCompletada(activeLeccion.id) ? 'Completado' : 'Marcar como completado' }}
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import { getFileUrl } from '@/config'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const curso = ref(null)
const activeLeccion = ref(null)
const loading = ref(true)
const marking = ref(false)
const isSidebarOpen = ref(false)
const completadas = ref([])

const fetchCourseData = async () => {
  loading.value = true
  try {
    const [cursoRes, progresoRes] = await Promise.all([
      api.get(`/cursos/${route.params.id}`),
      api.get('/progreso'),
    ])

    curso.value = cursoRes.data
    completadas.value = progresoRes.data.map((p) => p.leccion_id)

    if (curso.value.modulos?.length > 0 && curso.value.modulos[0].lecciones?.length > 0) {
      activeLeccion.value = curso.value.modulos[0].lecciones[0]
    }
    isSidebarOpen.value = window.innerWidth >= 1024
  } catch (error) {
    console.error('Error fetching course details:', error)
  } finally {
    loading.value = false
  }
}

const leccionesList = computed(() => {
  if (!curso.value) return []
  return curso.value.modulos.flatMap((m) => m.lecciones)
})

const currentLeccionIdx = computed(() => {
  if (!activeLeccion.value) return -1
  return leccionesList.value.findIndex((l) => l.id === activeLeccion.value.id)
})

const hasNext = computed(() => currentLeccionIdx.value < leccionesList.value.length - 1)
const hasPrev = computed(() => currentLeccionIdx.value > 0)

const progresoGeneral = computed(() => {
  if (!leccionesList.value.length) return 0
  const completadasEnCurso = leccionesList.value.filter((l) => leccionCompletada(l.id)).length
  return (completadasEnCurso / leccionesList.value.length) * 100
})

const selectLeccion = (leccion) => {
  activeLeccion.value = leccion
  if (window.innerWidth < 1024) isSidebarOpen.value = false
}

const nextLeccion = () => {
  if (hasNext.value) {
    activeLeccion.value = leccionesList.value[currentLeccionIdx.value + 1]
  }
}

const prevLeccion = () => {
  if (hasPrev.value) {
    activeLeccion.value = leccionesList.value[currentLeccionIdx.value - 1]
  }
}

const leccionCompletada = (id) => completadas.value.includes(id)

const toggleComplete = async () => {
  if (!activeLeccion.value || marking.value) return

  const isComp = leccionCompletada(activeLeccion.value.id)
  marking.value = true

  try {
    if (!isComp) {
      await api.post('/progreso', {
        usuario_id: authStore.user.id,
        leccion_id: activeLeccion.value.id,
        completado: true,
      })
      completadas.value.push(activeLeccion.value.id)
      if (hasNext.value) {
        setTimeout(nextLeccion, 1000)
      }
    }
  } catch (error) {
    console.error('Error toggling progress:', error)
  } finally {
    marking.value = false
  }
}

const getIcon = (tipo) => {
  switch (tipo) {
    case 'VIDEO':
      return 'play_circle'
    case 'PDF':
      return 'description'
    case 'TEXTO':
      return 'article'
    default:
      return 'play_arrow'
  }
}

const isYoutube = (url) => url?.includes('youtube.com') || url?.includes('youtu.be')

const getYoutubeEmbed = (url) => {
  let id = ''
  if (url.includes('v=')) id = url.split('v=')[1].split('&')[0]
  else if (url.includes('youtu.be/')) id = url.split('youtu.be/')[1]
  return `https://www.youtube.com/embed/${id}`
}

// ... (rest of the functions)

onMounted(() => {
  fetchCourseData()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.16); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.3); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
