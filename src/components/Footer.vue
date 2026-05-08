<template>
  <footer class="bg-background pt-32 pb-16 border-t border-on-surface/5">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-20 mb-24">
        <div class="col-span-2">
          <div class="mb-10">
            <AppLogo img-class="h-14 w-auto object-contain" />
          </div>
          <p class="text-on-surface/70 max-w-sm font-medium text-lg leading-relaxed">
            Elevando los estándares de la educación técnica en energías renovables para un futuro boliviano más limpio y tecnológicamente avanzado.
          </p>
        </div>
        <div>
          <h6 class="font-black uppercase tracking-[0.3em] text-[11px] text-accent-neon mb-10">Navegación</h6>
          <ul class="space-y-6 text-on-surface/60 font-medium">
            <li><a class="hover:text-accent-neon transition-colors" href="#">Programas Académicos</a></li>
            <li><a class="hover:text-accent-neon transition-colors" href="#">Certificaciones</a></li>
            <li><a class="hover:text-accent-neon transition-colors" href="#">Proyectos Industriales</a></li>
            <li><a class="hover:text-accent-neon transition-colors" href="#">Bolsa de Trabajo</a></li>
          </ul>
        </div>
        <div>
          <h6 class="font-black uppercase tracking-[0.3em] text-[11px] text-accent-neon mb-10">Conectar</h6>
          <div class="flex gap-6">
            <a class="w-14 h-14 glass-premium rounded-2xl flex items-center justify-center text-on-surface hover:text-accent-neon hover:border-accent-neon/50 transition-all" href="#">
              <span class="material-symbols-outlined">public</span>
            </a>
            <a class="w-14 h-14 glass-premium rounded-2xl flex items-center justify-center text-on-surface hover:text-accent-neon hover:border-accent-neon/50 transition-all" href="#">
              <span class="material-symbols-outlined">hub</span>
            </a>
            <a class="w-14 h-14 glass-premium rounded-2xl flex items-center justify-center text-on-surface hover:text-accent-neon hover:border-accent-neon/50 transition-all" href="#">
              <span class="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>
      </div>
      <div class="pt-16 border-t border-on-surface/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p class="text-[11px] font-black tracking-[0.4em] uppercase text-on-surface/30">© {{ currentYear }} ENERVIDA ACADEMY. desarrollado by jhonatan.</p> 
        <div class="flex gap-10 text-[11px] font-black tracking-[0.4em] uppercase text-on-surface/30">
          <a class="hover:text-accent-neon transition-all" href="#">Privacy</a>
          <a class="hover:text-accent-neon transition-all" href="#">Terms</a>
          <a class="hover:text-accent-neon transition-all" href="#">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import AppLogo from './AppLogo.vue'
const currentYear = new Date().getFullYear();
</script>

