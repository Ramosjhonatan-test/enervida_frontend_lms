<template>
  <header class="fixed top-0 w-full z-[999] transition-all duration-500" :class="[isScrolled ? 'py-2 px-2 md:py-4 md:px-6' : 'py-4 px-4 md:py-8 md:px-12']">
    <nav class="max-w-7xl mx-auto glass-premium rounded-full h-16 md:h-24 px-4 md:px-10 flex items-center justify-between shadow-2xl relative">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 z-50 group">
        <AppLogo 
          :img-style="{ height: isScrolled ? '2.5rem' : 'clamp(3.5rem, 8vw, 5rem)' }" 
          img-class="w-auto object-contain drop-shadow-md transition-all duration-500 ease-out origin-left" 
        />
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex gap-5 xl:gap-8 items-center font-lexend text-[10px] xl:text-[13px] font-bold tracking-[0.15em] xl:tracking-[0.2em] uppercase">
        <a @click.prevent="scrollTo('#inicio')" :class="[currentSection === 'inicio' ? 'text-accent-neon scale-110' : 'text-on-surface/60 hover:text-on-surface hover:scale-110', 'transition-all cursor-pointer']">INICIO</a>
        <a @click.prevent="scrollTo('#cursos')" :class="[currentSection === 'cursos' ? 'text-accent-neon scale-110' : 'text-on-surface/60 hover:text-on-surface hover:scale-110', 'transition-all cursor-pointer']">CURSOS</a>
        <a @click.prevent="scrollTo('#impacto')" :class="[currentSection === 'impacto' ? 'text-accent-neon scale-110' : 'text-on-surface/60 hover:text-on-surface hover:scale-110', 'transition-all cursor-pointer']">IMPACTO</a>
        <a @click.prevent="scrollTo('#socios')" :class="[currentSection === 'socios' ? 'text-accent-neon scale-110' : 'text-on-surface/60 hover:text-on-surface hover:scale-110', 'transition-all cursor-pointer']">SOCIOS</a>
        <a @click.prevent="scrollTo('#nosotros')" :class="[currentSection === 'nosotros' ? 'text-accent-neon scale-110' : 'text-on-surface/60 hover:text-on-surface hover:scale-110', 'transition-all cursor-pointer']">NOSOTROS</a>
        <a @click.prevent="scrollTo('#contacto')" :class="[currentSection === 'contacto' ? 'text-accent-neon scale-110' : 'text-on-surface/60 hover:text-on-surface hover:scale-110', 'transition-all cursor-pointer']">CONTACTO</a>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 md:gap-6">
        <ThemeToggle />
        <button @click="$router.push('/login')" class="btn-premium btn-primary-neon !px-4 md:!px-8 !py-2.5 md:!py-3 !text-[10px] md:!text-[12px] shadow-neon-sm whitespace-nowrap">Iniciar Sesión</button>
        
        <!-- Mobile Toggle -->
        <button @click="isMenuOpen = !isMenuOpen" 
                class="text-on-surface w-10 h-10 lg:hidden flex items-center justify-center rounded-full hover:bg-on-surface/5 transition-colors" 
                aria-label="Toggle Menu">
          <span class="material-symbols-outlined text-2xl md:text-3xl transition-transform duration-300" :class="{'rotate-90': isMenuOpen}">
            {{ isMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>

      <!-- Mobile Menu Dropdown -->
      <transition name="mobile-menu">
        <div v-if="isMenuOpen" 
             class="absolute top-[calc(100%+0.75rem)] left-0 w-full glass-premium rounded-[2.5rem] p-8 flex flex-col gap-6 lg:hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] z-[1000] overflow-hidden transition-all duration-300">
          <div class="absolute inset-0 bg-accent-neon/5 pointer-events-none"></div>
          
          <a @click.prevent="scrollTo('#inicio')" :class="[currentSection === 'inicio' ? 'text-accent-neon' : 'text-on-surface hover:text-accent-neon', 'relative z-10 font-black uppercase tracking-[0.2em] text-sm py-2 cursor-pointer transition-colors']">INICIO</a>
          <a @click.prevent="scrollTo('#cursos')" :class="[currentSection === 'cursos' ? 'text-accent-neon' : 'text-on-surface hover:text-accent-neon', 'relative z-10 font-black uppercase tracking-[0.2em] text-sm py-2 cursor-pointer transition-colors']">CURSOS</a>
          <a @click.prevent="scrollTo('#impacto')" :class="[currentSection === 'impacto' ? 'text-accent-neon' : 'text-on-surface hover:text-accent-neon', 'relative z-10 font-black uppercase tracking-[0.2em] text-sm py-2 cursor-pointer transition-colors']">IMPACTO</a>
          <a @click.prevent="scrollTo('#socios')" :class="[currentSection === 'socios' ? 'text-accent-neon' : 'text-on-surface hover:text-accent-neon', 'relative z-10 font-black uppercase tracking-[0.2em] text-sm py-2 cursor-pointer transition-colors']">SOCIOS</a>
          <a @click.prevent="scrollTo('#nosotros')" :class="[currentSection === 'nosotros' ? 'text-accent-neon' : 'text-on-surface hover:text-accent-neon', 'relative z-10 font-black uppercase tracking-[0.2em] text-sm py-2 cursor-pointer transition-colors']">NOSOTROS</a>
          <a @click.prevent="scrollTo('#contacto')" :class="[currentSection === 'contacto' ? 'text-accent-neon' : 'text-on-surface hover:text-accent-neon', 'relative z-10 font-black uppercase tracking-[0.2em] text-sm py-2 cursor-pointer transition-colors']">CONTACTO</a>
          
          <hr class="border-on-surface/10 relative z-10 my-2" />
          
          <button @click="$router.push('/login'); isMenuOpen = false" class="relative z-10 btn-premium btn-primary-neon !w-full !py-5 text-center text-[11px] font-black shadow-lg">
            Entrar a la Academia
          </button>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ThemeToggle from '@/components/global/ThemeToggle.vue'
import AppLogo from '@/components/global/AppLogo.vue'

const router = useRouter()
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const currentSection = ref('inicio')

const scrollTo = (hash) => {
  isMenuOpen.value = false;
  
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => performScroll(hash), 300);
    });
  } else {
    setTimeout(() => performScroll(hash), 100);
  }
}

const performScroll = (hash) => {
  const el = document.querySelector(hash);
  if (el) {
    const yOffset = -80; // offset for fixed navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  if (route.path === '/') {
    const sections = ['inicio', 'cursos', 'impacto', 'socios', 'nosotros', 'contacto'];
    let current = '';
    
    // We iterate backwards to find the last section that we have scrolled past
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        // Adjust threshold based on typical header height and some padding
        if (rect.top <= 150) {
          current = section;
          break;
        }
      }
    }
    
    if (current && currentSection.value !== current) {
      currentSection.value = current;
    }
  }
}

// Bloquear scroll cuando el menú móvil está abierto
watch(isMenuOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // Asegurar que el scroll se restaure si el componente se desmonta con el menú abierto
  document.body.style.overflow = ''
})
</script>

<style scoped>
.glass-premium {
    background: var(--glass-bg);
    backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-premium);
}

.mobile-menu-enter-active, .mobile-menu-leave-active { 
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
}
.mobile-menu-enter-from, .mobile-menu-leave-to { 
    opacity: 0; 
    transform: translateY(-20px) scale(0.95); 
}

.logo-img {
    height: clamp(4rem, 8vw, 6.5rem);
}
</style>
