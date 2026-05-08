<template>
  <header class="fixed top-0 w-full z-[999] transition-all duration-500" :class="[isScrolled ? 'py-2 px-2 md:py-4 md:px-6' : 'py-4 px-4 md:py-8 md:px-12']">
    <nav class="max-w-7xl mx-auto glass-premium rounded-full h-14 md:h-20 px-4 md:px-10 flex items-center justify-between shadow-2xl relative">
      <!-- Logo -->
      <div @click="$router.push('/')" class="flex items-center cursor-pointer shrink-0">
        <AppLogo img-class="logo-img w-auto object-contain" />
      </div>
 
      <!-- Desktop Menu -->
      <div class="hidden lg:flex gap-10 items-center font-lexend text-[11px] font-bold tracking-[0.3em] uppercase">
        <router-link to="/" class="text-accent-neon hover:scale-110 transition-all">Inicio</router-link>
        <a class="text-on-surface/60 hover:text-on-surface hover:scale-110 transition-all" href="#">Cursos</a>
        <a class="text-on-surface/60 hover:text-on-surface hover:scale-110 transition-all" href="#">Proyectos</a>
        <a class="text-on-surface/60 hover:text-on-surface hover:scale-110 transition-all" href="#">Nosotros</a>
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
          
          <router-link to="/" class="relative z-10 text-accent-neon font-black uppercase tracking-[0.3em] text-xs py-2" @click="isMenuOpen = false">Inicio</router-link>
          <a class="relative z-10 text-on-surface font-black uppercase tracking-[0.3em] text-xs py-2 hover:text-accent-neon transition-colors" href="#" @click="isMenuOpen = false">Cursos</a>
          <a class="relative z-10 text-on-surface font-black uppercase tracking-[0.3em] text-xs py-2 hover:text-accent-neon transition-colors" href="#" @click="isMenuOpen = false">Proyectos</a>
          <a class="relative z-10 text-on-surface font-black uppercase tracking-[0.3em] text-xs py-2 hover:text-accent-neon transition-colors" href="#" @click="isMenuOpen = false">Nosotros</a>
          
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
import ThemeToggle from './ThemeToggle.vue'
import AppLogo from './AppLogo.vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
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
    height: clamp(1.75rem, 4vw, 2.75rem);
}
</style>
