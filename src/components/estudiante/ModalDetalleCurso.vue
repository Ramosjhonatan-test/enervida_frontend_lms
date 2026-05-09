<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <!-- Backdrop with premium blur -->
      <div class="absolute inset-0 bg-background/40 backdrop-blur-3xl transition-opacity duration-700" @click="close"></div>

      <!-- Modal Content -->
      <Transition name="scale" appear>
        <div 
          v-show="isOpen"
          class="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[48px] border border-white/10 bg-[#0b1220]/80 backdrop-blur-2xl shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
        >
          <!-- Decoration Orbs -->
          <div class="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent-neon/10 blur-[100px]"></div>
          <div class="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent-solar/5 blur-[100px]"></div>

          <!-- Close Button -->
          <button 
            @click="close"
            class="absolute top-8 right-8 z-50 h-12 w-12 rounded-2xl bg-white/5 text-white/40 hover:bg-accent-neon hover:text-primary transition-all duration-300 backdrop-blur-md border border-white/10 flex items-center justify-center group"
          >
            <span class="material-symbols-outlined transition-transform group-hover:rotate-90">close</span>
          </button>

          <!-- Left Side: Hero Visualization -->
          <div class="relative w-full md:w-[45%] h-72 md:h-auto overflow-hidden shrink-0 group/hero">
            <img 
              :src="getFileUrl(course?.miniatura_url)" 
              class="h-full w-full object-cover transition-transform duration-1000 group-hover/hero:scale-110" 
              :alt="course?.titulo"
            />
            <!-- Multi-layer gradient for depth -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/20 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-transparent to-transparent hidden md:block"></div>
            
            <div class="absolute bottom-12 left-10 right-10 space-y-6">
              <div class="flex flex-wrap gap-2">
                <span class="inline-flex items-center rounded-full bg-accent-neon/20 backdrop-blur-md border border-accent-neon/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-accent-neon shadow-neon-sm">
                  {{ course?.categoria?.nombre || 'Especialidad' }}
                </span>
                <span class="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                  {{ course?.nivel }}
                </span>
              </div>
              
              <h2 class="font-lexend text-4xl md:text-5xl font-black leading-[1.1] text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                {{ course?.titulo }}
              </h2>

              <div class="flex items-center gap-6 pt-4 border-t border-white/10">
                <div class="flex flex-col">
                  <span class="text-[9px] font-black uppercase tracking-widest text-white/30">Duración</span>
                  <span class="text-sm font-black text-white">{{ course?.duracion || '--' }}</span>
                </div>
                <div class="w-px h-8 bg-white/10"></div>
                <div class="flex flex-col">
                  <span class="text-[9px] font-black uppercase tracking-widest text-white/30">Módulos</span>
                  <span class="text-sm font-black text-white">{{ course?.modulos?.length || course?.clases_count || '--' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side: Structured Information -->
          <div class="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-16 space-y-16 flex flex-col">
            <!-- Navigation Tabs -->
            <div class="flex items-center gap-8 border-b border-white/5 pb-2 shrink-0">
              <button 
                @click="activeTab = 'general'"
                :class="[
                  'relative pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300',
                  activeTab === 'general' ? 'text-accent-neon' : 'text-on-surface/30 hover:text-on-surface/60'
                ]"
              >
                General
                <div v-if="activeTab === 'general'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-neon shadow-[0_0_10px_#059669]"></div>
              </button>
              <button 
                @click="activeTab = 'contenido'"
                :class="[
                  'relative pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300',
                  activeTab === 'contenido' ? 'text-accent-neon' : 'text-on-surface/30 hover:text-on-surface/60'
                ]"
              >
                Contenido
                <div v-if="activeTab === 'contenido'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-neon shadow-[0_0_10px_#059669]"></div>
              </button>
              <button 
                @click="activeTab = 'instructor'"
                :class="[
                  'relative pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300',
                  activeTab === 'instructor' ? 'text-accent-neon' : 'text-on-surface/30 hover:text-on-surface/60'
                ]"
              >
                Instructor
                <div v-if="activeTab === 'instructor'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-neon shadow-[0_0_10px_#059669]"></div>
              </button>
            </div>

            <!-- Tab Content Area -->
            <div class="flex-1 min-h-0">
              <!-- General Tab -->
              <div v-if="activeTab === 'general'" class="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <!-- Detailed Description Section -->
                <section class="space-y-8">
                  <div class="flex items-center gap-4">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-neon/10 border border-accent-neon/20">
                      <span class="material-symbols-outlined text-accent-neon">subject</span>
                    </div>
                    <div>
                      <h3 class="font-lexend text-2xl font-black text-on-surface">Descripción <span class="text-accent-neon">General</span></h3>
                      <p class="text-[9px] font-bold uppercase tracking-widest text-on-surface/30">Todo lo que necesitas saber sobre el programa</p>
                    </div>
                  </div>
                  
                  <div class="prose prose-invert max-w-none">
                    <p class="text-on-surface/60 text-lg leading-relaxed whitespace-pre-line font-medium">
                      {{ course?.descripcion || course?.descripcion_corta || 'Este programa ha sido diseñado meticulosamente para proporcionar las herramientas necesarias para dominar el campo, combinando teoría rigurosa con aplicaciones prácticas de alto impacto.' }}
                    </p>
                  </div>
                </section>

                <!-- Key Features / What's Included -->
                <section class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div class="flex flex-col gap-4 rounded-[32px] bg-white/[0.03] border border-white/5 p-8 group hover:bg-white/[0.05] transition-all duration-500">
                    <div class="h-14 w-14 rounded-2xl bg-accent-neon/10 flex items-center justify-center border border-accent-neon/20 group-hover:scale-110 transition-transform">
                      <span class="material-symbols-outlined text-accent-neon text-3xl">verified</span>
                    </div>
                    <div>
                      <h4 class="text-xs font-black text-on-surface uppercase tracking-widest">Certificación</h4>
                      <p class="mt-2 text-[10px] leading-relaxed text-on-surface/40">Título oficial avalado por la institución tras aprobación.</p>
                    </div>
                  </div>
                  
                  <div class="flex flex-col gap-4 rounded-[32px] bg-white/[0.03] border border-white/5 p-8 group hover:bg-white/[0.05] transition-all duration-500">
                    <div class="h-14 w-14 rounded-2xl bg-accent-solar/10 flex items-center justify-center border border-accent-solar/20 group-hover:scale-110 transition-transform">
                      <span class="material-symbols-outlined text-accent-solar text-3xl">all_inclusive</span>
                    </div>
                    <div>
                      <h4 class="text-xs font-black text-on-surface uppercase tracking-widest">Acceso Vitalicio</h4>
                      <p class="mt-2 text-[10px] leading-relaxed text-on-surface/40">Consulta el material en cualquier momento, sin límites.</p>
                    </div>
                  </div>

                  <div class="flex flex-col gap-4 rounded-[32px] bg-white/[0.03] border border-white/5 p-8 group hover:bg-white/[0.05] transition-all duration-500">
                    <div class="h-14 w-14 rounded-2xl bg-accent-neon/10 flex items-center justify-center border border-accent-neon/20 group-hover:scale-110 transition-transform">
                      <span class="material-symbols-outlined text-accent-neon text-3xl">devices</span>
                    </div>
                    <div>
                      <h4 class="text-xs font-black text-on-surface uppercase tracking-widest">Multiplataforma</h4>
                      <p class="mt-2 text-[10px] leading-relaxed text-on-surface/40">Aprende desde tu PC, Tablet o Smartphone cómodamente.</p>
                    </div>
                  </div>
                </section>

                <!-- Prerequisites -->
                <section class="rounded-[40px] bg-accent-neon/5 border border-accent-neon/10 p-10 space-y-8">
                  <div class="flex items-center gap-4">
                     <span class="material-symbols-outlined text-accent-neon">info</span>
                     <h4 class="text-[11px] font-black uppercase tracking-[0.4em] text-accent-neon">Requisitos previos</h4>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div class="flex items-center gap-4">
                      <div class="h-2 w-2 rounded-full bg-accent-neon shadow-[0_0_10px_#059669]"></div>
                      <span class="text-sm font-medium text-on-surface/60">Conexión a internet estable de alta velocidad.</span>
                    </div>
                    <div class="flex items-center gap-4">
                      <div class="h-2 w-2 rounded-full bg-accent-neon shadow-[0_0_10px_#059669]"></div>
                      <span class="text-sm font-medium text-on-surface/60">Conocimientos básicos del sector energético.</span>
                    </div>
                  </div>
                </section>
              </div>

              <!-- Contenido Tab -->
              <div v-if="activeTab === 'contenido'" class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div class="space-y-2">
                  <h3 class="font-lexend text-2xl font-black text-on-surface">¿Qué <span class="text-accent-solar">aprenderás</span>?</h3>
                  <p class="text-[9px] font-bold uppercase tracking-widest text-on-surface/30">Módulos y objetivos de aprendizaje</p>
                </div>

                <div class="grid grid-cols-1 gap-4">
                  <template v-if="course?.modulos?.length">
                    <div v-for="(modulo, index) in course.modulos" :key="modulo.id" class="flex items-center gap-5 p-6 rounded-[24px] bg-white/[0.02] border border-white/5 group hover:border-accent-solar/30 transition-all">
                      <div class="h-12 w-12 shrink-0 rounded-xl bg-accent-solar/10 flex items-center justify-center text-accent-solar font-black text-lg group-hover:bg-accent-solar group-hover:text-primary transition-all">
                        {{ index + 1 }}
                      </div>
                      <div>
                        <h5 class="text-sm font-black text-on-surface uppercase tracking-wider">{{ modulo.titulo }}</h5>
                        <p class="text-xs font-medium text-on-surface/40 mt-1">{{ modulo.lecciones?.length || 0 }} lecciones en este módulo.</p>
                      </div>
                      <div class="ml-auto">
                        <span class="material-symbols-outlined text-white/10 group-hover:text-accent-solar transition-colors">lock</span>
                      </div>
                    </div>
                  </template>
                  <div v-else class="flex flex-col items-center justify-center p-12 text-center border border-white/5 rounded-[24px] bg-white/[0.02]">
                    <span class="material-symbols-outlined text-4xl text-on-surface/20 mb-3">auto_stories</span>
                    <p class="text-sm font-medium text-on-surface/40">El contenido detallado de los módulos estará disponible pronto.</p>
                  </div>
                </div>
              </div>

              <!-- Instructor Tab -->
              <div v-if="activeTab === 'instructor'" class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div class="flex items-center gap-8 p-10 rounded-[40px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                  <div class="h-32 w-32 rounded-3xl overflow-hidden border-2 border-accent-neon/30 p-1">
                    <div class="h-full w-full rounded-2xl bg-white/5 flex items-center justify-center">
                      <span class="material-symbols-outlined text-5xl text-white/20">person</span>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <div>
                      <span class="text-[10px] font-black uppercase tracking-[0.3em] text-accent-neon">Instructor Principal</span>
                      <h4 class="font-lexend text-3xl font-black text-on-surface mt-1">Dr. Alejandro Energías</h4>
                    </div>
                    <p class="text-sm text-on-surface/60 max-w-md leading-relaxed">
                      Experto internacional con más de 15 años de experiencia en el sector. Ha liderado proyectos de transformación energética en 3 continentes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA Footer -->
            <div class="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-10 mt-auto shrink-0">
              <div class="flex items-center gap-8">
                <div class="flex flex-col">
                  <span class="text-[9px] font-black uppercase tracking-widest text-on-surface/30">Precio del curso</span>
                  <div class="flex items-baseline gap-2">
                    <span class="text-5xl font-black text-on-surface tracking-tighter">{{ course?.precio || '0' }}</span>
                    <span class="text-xs font-black text-accent-neon uppercase">BS</span>
                  </div>
                </div>
                <div class="h-12 w-px bg-white/10"></div>
                <div class="flex flex-col">
                  <span class="text-[9px] font-black uppercase tracking-widest text-on-surface/30">Duración total</span>
                  <span class="text-lg font-black text-on-surface/80">{{ course?.duracion || '--' }}</span>
                </div>
              </div>
              
              <div class="flex w-full sm:w-auto gap-4">
                <button 
                  v-if="!isEnrolled"
                  @click="$emit('enroll', course)"
                  class="btn-premium btn-primary-neon !h-16 !px-16 !rounded-2xl shadow-neon transition-transform hover:scale-105 active:scale-95 group/cta"
                >
                  <span class="flex items-center gap-3 text-xs">
                    INSCRIBIRME AHORA
                    <span class="material-symbols-outlined transition-transform group-hover/cta:translate-x-2">arrow_forward</span>
                  </span>
                </button>
                <div 
                  v-else
                  class="h-16 flex items-center px-12 rounded-2xl border border-accent-neon/30 bg-accent-neon/10 text-accent-neon text-[10px] font-black uppercase tracking-widest"
                >
                  YA ESTÁS INSCRITO
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { Transition, onMounted, onUnmounted, ref, watch } from 'vue'
import { getFileUrl } from '@/config'

const props = defineProps({
  isOpen: Boolean,
  course: Object,
  isEnrolled: Boolean
})

const activeTab = ref('general')

const emit = defineEmits(['close', 'enroll'])

function close() {
  emit('close')
}

// Lock scroll when open
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-enter-active, .scale-leave-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.scale-enter-from { opacity: 0; transform: scale(0.9) translateY(20px); }
.scale-leave-to { opacity: 0; transform: scale(0.95); }

.shadow-neon {
  box-shadow: 0 0 30px -10px var(--accent-neon);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
