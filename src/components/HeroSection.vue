<template>
  <section class="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img alt="Renewable Energy Background" class="w-full h-full object-cover opacity-[0.08] dark:opacity-20 scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYqEN0yv9-xDfGML8BKVaLeKMnIqE6-OkjzGKoFXPJiU9FFw9zhnC1q8mFipr3w9iO0l9J6HhoDTOOHd9NOhFA2Cukv90x29ok1bgv7ZhfNMGcRrnlgUOuJkrmLXQtc1X054fmQDRsa1HUvfUSao1VGcxKpSNz-SUI_kbb68TGASCSti4Ls-uncakV98Yo42l9mVA8SrOtzZNlUSQOqQFUaJxJ9CAcKG7iWL9pbkSXizSMkipm2ui5xkzQTxjPZKpHUXZQEq2PHxML"/>
      <div class="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
    </div>
    <div class="container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
      <!-- Contenido Principal con animación de entrada -->
      <div class="space-y-6 lg:space-y-12 animate-in slide-in-from-left fade-in duration-1000">
        <div class="inline-flex items-center gap-3 px-5 py-2.5 glass-premium rounded-full">
          <span class="w-2.5 h-2.5 bg-accent-neon rounded-full glow-neon animate-pulse"></span>
          <span class="text-[12px] font-black tracking-[0.3em] uppercase text-on-surface">Líderes en Innovación Solar</span>
        </div>
        <h1 class="font-lexend font-black text-5xl md:text-7xl text-on-surface leading-tight tracking-tighter">
          El Futuro es <br/>
          <span class="text-gradient-neon italic drop-shadow-2xl">Sostenible.</span>
        </h1>
        <p class="text-lg text-on-surface/60 max-w-lg leading-relaxed font-light">
          Domina las tecnologías que están transformando la matriz energética global. Educación técnica de élite con estándares europeos.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 md:gap-8 pt-4">
          <button class="btn-premium btn-primary-neon !px-12 !py-5 !text-sm shadow-[0_20px_50px_rgba(16,255,157,0.3)] hover:shadow-[0_20px_60px_rgba(16,255,157,0.5)]">
            Explorar Academia
          </button>
          <button class="btn-premium btn-secondary-glass !px-12 !py-5 !text-sm border-on-surface/20 shadow-premium">
            Ver Proyectos
          </button>
        </div>
      </div>
      <!-- Imagen y Mini Badge con animación de entrada -->
      <div class="hidden lg:block relative animate-in slide-in-from-right fade-in duration-1000 delay-200">
        <div class="w-full aspect-[4/5] glass-premium rounded-premium rotate-3 relative overflow-hidden group floating-element">
          <img alt="Tech Hero" class="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCddjxVlUOd7L2eWfILd8Ze7gG7_oOQ1llSZKOOoox6ouPmqXXHVlsaBch1cdGWimZdAndUSgWT12XMqsEra67n7q4bweVeHEaWyQh6qwbbLV5vcveqRtFnG52ogDwMmzb2g8ndmC5K2ikMliyC1YG7VtWv6qmnTneAvqreq61iSvB-NJqYj_BAIjxyL5L_2d84UZDUEQ6w7V4O5hH4xDHxQZF5n1wSxy12U-lt4cIh2rqVKOHmYLGm2_5Z9eWi1DvDwD02aznper-y"/>
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"></div>
        </div>
        <div class="absolute -bottom-10 -left-10 w-52 h-52 glass-premium rounded-premium -rotate-6 flex flex-col items-center justify-center p-6 text-center border-accent-neon/30">
          <div class="text-4xl font-black text-accent-neon glow-neon">500+</div>
          <div class="text-[11px] font-black uppercase tracking-[0.2em] text-on-surface/60 mt-2">Expertos<br/>Certificados</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
@keyframes float {
    0%, 100% { transform: translateY(0) rotate(3deg); }
    50% { transform: translateY(-15px) rotate(1deg); }
}
.floating-element {
    animation: float 5s ease-in-out infinite;
}
</style>
