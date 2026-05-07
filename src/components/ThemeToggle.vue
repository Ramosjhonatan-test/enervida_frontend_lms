<template>
  <button 
    @click="toggleTheme" 
    class="relative w-14 h-8 rounded-full p-1 transition-colors duration-500 ease-in-out focus:outline-none"
    :class="isDark ? 'bg-accent-neon/20 border border-accent-neon/30' : 'bg-gray-200 border border-gray-300'"
    aria-label="Toggle theme"
  >
    <!-- Toggle background effects -->
    <div class="absolute inset-0 rounded-full overflow-hidden">
      <div 
        class="absolute inset-0 transition-opacity duration-500"
        :class="isDark ? 'opacity-100' : 'opacity-0'"
      >
        <div class="stars absolute inset-0 opacity-50"></div>
      </div>
    </div>

    <!-- Knob -->
    <div 
      class="relative w-6 h-6 rounded-full transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg flex items-center justify-center overflow-hidden"
      :class="isDark ? 'translate-x-6 bg-primary' : 'translate-x-0 bg-white'"
    >
      <transition name="icon-swap" mode="out-in">
        <span v-if="isDark" key="dark" class="material-symbols-outlined text-[16px] text-accent-neon select-none">dark_mode</span>
        <span v-else key="light" class="material-symbols-outlined text-[16px] text-accent-solar select-none">light_mode</span>
      </transition>
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

const toggleTheme = () => {
  const updateTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Si el navegador soporta View Transitions API
  if (document.startViewTransition) {
    document.startViewTransition(updateTheme)
  } else {
    updateTheme()
  }
}

onMounted(() => {
  checkTheme()
})
</script>

<style scoped>
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 0.3s ease;
}

.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.stars {
  background-image: 
    radial-gradient(1px 1px at 20px 10px, white, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 40px 20px, white, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 10px 25px, white, rgba(0,0,0,0));
  background-size: 100% 100%;
}
</style>
