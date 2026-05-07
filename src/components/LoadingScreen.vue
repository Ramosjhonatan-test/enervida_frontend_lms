<template>
  <transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center">
      <div class="relative">
        <!-- Logo animado -->
        <div class="w-20 h-20 bg-accent-neon rounded-2xl rotate-12 flex items-center justify-center text-primary text-4xl font-black glow-neon-strong animate-pulse-slow">
          E
        </div>
        <!-- Círculos de carga -->
        <div class="absolute inset-0 w-20 h-20 border-4 border-accent-neon/20 rounded-2xl rotate-12 scale-110 animate-ping"></div>
      </div>
      <div class="mt-8 flex flex-col items-center">
        <p class="text-white font-lexend font-bold tracking-[0.5em] uppercase text-xs animate-pulse">Cargando Sistema</p>
        <div class="w-48 h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
          <div class="h-full bg-accent-neon shadow-[0_0_15px_#10FF9D] animate-progress"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({ isLoading: Boolean })
</script>

<style scoped>
.glow-neon-strong { box-shadow: 0 0 30px rgba(16, 255, 157, 0.6); }
.animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; transform: rotate(12deg) scale(1); } 50% { opacity: .8; transform: rotate(12deg) scale(0.95); } }
@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
.animate-progress { animation: progress 2s ease-in-out infinite; }
.fade-leave-active { transition: opacity 0.8s ease; }
.fade-leave-to { opacity: 0; }
</style>
