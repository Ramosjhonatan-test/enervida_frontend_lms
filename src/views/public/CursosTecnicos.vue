<template>
  <div class="mesh-gradient min-h-screen w-full overflow-x-hidden">
    <Navbar />
    <main class="pt-28 sm:pt-32 md:pt-40 pb-20 relative">
      <!-- Background decorations -->
      <div class="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-neon/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">

        <!-- Top Navigation Bar (centered) -->
        <div class="flex justify-center mb-8 md:mb-12 animate-in fade-in duration-500">
          <div class="glass-topbar rounded-2xl sm:rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-3 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
            <router-link to="/cursos/vivenciales" class="nav-pill">
              <span class="material-symbols-outlined text-base sm:text-lg">sunny</span>
              <span class="hidden sm:inline">Vivenciales</span>
            </router-link>
            <router-link to="/cursos/online" class="nav-pill">
              <span class="material-symbols-outlined text-base sm:text-lg">laptop_mac</span>
              <span class="hidden sm:inline">Online</span>
            </router-link>
            <router-link to="/cursos/tecnicos" class="nav-pill nav-pill-active">
              <span class="material-symbols-outlined text-base sm:text-lg">engineering</span>
              <span class="hidden sm:inline">Técnicos</span>
            </router-link>
            <div class="hidden md:block w-px h-6 bg-on-surface/10 mx-1"></div>
            <router-link to="/" class="nav-pill nav-pill-back">
              <span class="material-symbols-outlined text-base sm:text-lg">arrow_back</span>
              <span class="hidden sm:inline">Inicio</span>
            </router-link>
          </div>
        </div>

        <!-- Page Header (centered) -->
        <div class="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-top duration-700">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span class="material-symbols-outlined text-blue-400 text-base">engineering</span>
              <span class="text-[10px] font-black tracking-[0.3em] uppercase text-blue-400">Avanzado</span>
            </span>
          </div>
          <h1 class="font-lexend text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-on-surface leading-[1.1] tracking-tight mb-4">
            Cursos <span class="text-gradient-neon">Para Técnicos</span>
          </h1>
          <p class="text-on-surface-variant text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Especialización avanzada en diseño, dimensionamiento e implementación de sistemas solares profesionales.
          </p>
        </div>

        <!-- Course Cards Grid - 2 columns on desktop -->
        <div class="grid sm:grid-cols-2 gap-6 md:gap-8">
          <div 
            v-for="(course, index) in cursosTecnicos" 
            :key="index"
            class="group animate-in fade-in slide-in-from-bottom duration-700"
            :style="{ 'animation-delay': `${index * 100}ms` }"
          >
            <div class="glass-card rounded-2xl sm:rounded-[1.5rem] overflow-hidden border border-on-surface/5 hover:border-blue-400/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] h-full flex flex-col">
              <!-- Image -->
              <div class="relative overflow-hidden">
                <div class="aspect-[16/9]">
                  <img 
                    :src="course.image" 
                    :alt="course.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                </div>
                <div class="absolute top-3 left-3 sm:top-4 sm:left-4 glass-premium rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 border border-blue-400/20 shadow-lg">
                  {{ course.badge }}
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 p-5 sm:p-6 md:p-7 flex flex-col">
                <div class="flex items-center gap-2 mb-2">
                  <span class="material-symbols-outlined text-blue-400 text-lg">{{ course.icon }}</span>
                  <span class="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-blue-400">Especialización</span>
                </div>

                <h2 class="font-lexend text-lg sm:text-xl md:text-2xl font-black text-on-surface mb-3 leading-tight tracking-tight">
                  {{ course.title }}
                </h2>

                <p class="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-5 flex-1">
                  {{ course.description }}
                </p>

                <div class="flex flex-wrap gap-1.5 mb-5" v-if="course.features">
                  <span 
                    v-for="(feat, fi) in course.features" 
                    :key="fi"
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[9px] sm:text-[10px] font-semibold text-on-surface"
                  >
                    <span class="material-symbols-outlined text-blue-400 text-xs">check_circle</span>
                    {{ feat }}
                  </span>
                </div>

                <button class="btn-premium btn-primary-tech !px-6 !py-3 !text-[10px] sm:!text-[11px] shadow-lg group/btn w-full text-center mt-auto">
                  <span>{{ course.cta }}</span>
                  <span class="material-symbols-outlined text-sm ml-2 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </button>

                <div class="w-12 h-1 rounded-full bg-blue-400 mt-5 group-hover:w-full transition-all duration-700 ease-out opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/public/Navbar.vue'
import Footer from '@/components/public/Footer.vue'

const cursosTecnicos = ref([
  {
    title: 'Diseño en PVSyst',
    description: 'Simula, dimensiona y optimiza sistemas solares profesionales con el software líder de la industria.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    icon: 'desktop_windows',
    badge: 'Software',
    cta: 'Domina PVSyst',
    features: ['Simulación avanzada', 'Optimización', 'Reportes profesionales']
  },
  {
    title: 'Generación Distribuida',
    description: 'Aprende a inyectar energía a la red y aprovechar la normativa vigente para proyectos rentables.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
    icon: 'electric_meter',
    badge: 'Grid-Tied',
    cta: 'Empieza a inyectar energía',
    features: ['Net metering', 'Normativa', 'Diseño on-grid']
  },
  {
    title: 'Sistemas Aislados',
    description: 'Diseña soluciones off-grid eficientes y confiables para zonas sin acceso a la red eléctrica.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop',
    icon: 'battery_charging_full',
    badge: 'Off-Grid',
    cta: 'Diseña sin red',
    features: ['Baterías', 'Controladores', 'Autonomía energética']
  },
  {
    title: 'Sistemas Híbridos',
    description: 'Combina fuentes de energía y garantiza suministro continuo con sistemas híbridos inteligentes.',
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=2070&auto=format&fit=crop',
    icon: 'electric_bolt',
    badge: 'Híbrido',
    cta: 'Garantiza energía total',
    features: ['Multi-fuente', 'Respaldo', 'Gestión inteligente']
  },
  {
    title: 'Sistemas de Bombeo Solar',
    description: 'Diseña sistemas de agua eficientes sin costo energético para agricultura y ganadería.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop',
    icon: 'water_pump',
    badge: 'Bombeo',
    cta: 'Implementa bombeo solar',
    features: ['Bombas sumergibles', 'Riego solar', 'Dimensionamiento']
  },
  {
    title: 'Sistemas Termosolares',
    description: 'Implementa soluciones de calor con energía solar para aplicaciones residenciales e industriales.',
    image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?q=80&w=2070&auto=format&fit=crop',
    icon: 'thermostat',
    badge: 'Térmico',
    cta: 'Genera calor gratis',
    features: ['Colectores solares', 'Calor industrial', 'ACS solar']
  },
  {
    title: 'Luminarias Solares',
    description: 'Diseña e instala iluminación autónoma y eficiente para espacios públicos y privados.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2070&auto=format&fit=crop',
    icon: 'light',
    badge: 'Iluminación',
    cta: 'Ilumina con el sol',
    features: ['LED solar', 'Autonomía total', 'Diseño fotométrico']
  }
])
</script>

<style scoped>
.glass-topbar {
  background: color-mix(in srgb, var(--surface-container, #1a1a2e) 90%, transparent);
  backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-premium);
}

.nav-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--on-surface-variant);
  transition: all 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
}

.nav-pill:hover {
  background: rgba(96, 165, 250, 0.08);
  color: var(--on-surface);
}

.nav-pill-active {
  background: rgba(96, 165, 250, 0.15) !important;
  color: #60a5fa !important;
  font-weight: 800;
}

.nav-pill-back {
  opacity: 0.6;
}

.nav-pill-back:hover {
  opacity: 1;
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(160%);
}

.glass-premium {
  background: var(--glass-bg);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-premium);
}

.text-gradient-tech {
  background: linear-gradient(135deg, #60a5fa 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.btn-primary-tech {
  background: linear-gradient(135deg, #60a5fa 0%, #818cf8 100%) !important;
  color: #fff !important;
  border: none !important;
}

.btn-primary-tech:hover {
  filter: brightness(1.1);
  box-shadow: 0 8px 30px rgba(96, 165, 250, 0.3) !important;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-bottom {
  from { transform: translateY(30px); }
  to { transform: translateY(0); }
}

@keyframes slide-in-from-top {
  from { transform: translateY(-20px); }
  to { transform: translateY(0); }
}

.animate-in {
  animation: fade-in 0.7s ease-out both, slide-in-from-bottom 0.7s ease-out both;
}

.animate-in.slide-in-from-top {
  animation: fade-in 0.7s ease-out both, slide-in-from-top 0.7s ease-out both;
}
</style>
