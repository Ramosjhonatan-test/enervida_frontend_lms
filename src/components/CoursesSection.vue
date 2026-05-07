<template>
  <section class="py-20 md:py-40 relative overflow-hidden">
    <!-- Decoración de fondo -->
    <div class="absolute top-1/4 -right-20 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-1/4 -left-20 w-96 h-96 bg-tertiary-container/10 blur-[120px] rounded-full"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24 animate-in slide-in-from-top fade-in duration-1000">
        <div class="max-w-2xl">
          <span class="text-accent-neon font-black tracking-[0.4em] uppercase text-[10px] mb-4 block drop-shadow-sm opacity-60">Especializaciones Técnicas</span>
          <h2 class="font-lexend text-4xl md:text-6xl font-bold text-on-surface leading-tight tracking-tighter">Formación de <br/><span class="text-gradient-neon italic">Clase Mundial</span></h2>
        </div>
        <div class="flex gap-4 md:gap-6">
          <button class="w-14 h-14 md:w-16 md:h-16 rounded-full glass-premium flex items-center justify-center border-on-surface/5 text-on-surface group hover:scale-110 active:scale-95 transition-all shadow-xl">
            <span class="material-symbols-outlined text-2xl group-hover:-translate-x-1 transition-transform">west</span>
          </button>
          <button class="w-14 h-14 md:w-16 md:h-16 rounded-full glass-premium flex items-center justify-center border-on-surface/5 text-on-surface group hover:scale-110 active:scale-95 transition-all shadow-xl">
            <span class="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        <div v-for="(course, index) in courses" :key="index" 
             :class="['group relative animate-in fade-in slide-in-from-bottom duration-1000', course.extraClass]"
             :style="{ 'animation-delay': `${index * 150}ms` }">
          <div :class="['relative h-[550px] md:h-[650px] glass-card overflow-hidden group/card card-premium-hover border-on-surface/10', course.roundedClass]">
            <!-- Image Overlay -->
            <div class="absolute inset-0 overflow-hidden">
              <img :alt="course.title" class="w-full h-full object-cover opacity-60 group-hover/card:opacity-80 group-hover/card:scale-110 transition-all duration-1000 ease-out" :src="course.image"/>
              <div class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
            </div>
            
            <div :class="['absolute top-8 left-8 glass-premium rounded-full px-6 py-2.5 text-[10px] md:text-[11px] font-black uppercase tracking-widest border-on-surface/10 shadow-lg', course.accentTextClass]">
              {{ course.duration }}
            </div>

            <div class="absolute bottom-10 left-8 right-8 flex flex-col items-start transform group-hover/card:translate-y-[-10px] transition-transform duration-500">
              <h3 class="font-lexend text-2xl md:text-4xl text-on-surface font-black mb-4 md:mb-6 leading-[1.1] tracking-tighter" v-html="course.title"></h3>
              <p class="text-on-surface/70 text-sm md:text-lg font-medium mb-10 line-clamp-3 leading-relaxed">{{ course.description }}</p>
              
              <div class="w-full flex items-center justify-between gap-4 mt-auto">
                 <button class="btn-premium btn-primary-neon !px-8 !py-4 !text-[10px] shadow-lg flex-1">
                   Inscribirse Ahora
                 </button>
                 <button class="w-12 h-12 rounded-full glass-premium flex items-center justify-center border-on-surface/10 text-on-surface hover:bg-accent-neon hover:text-primary transition-all">
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                 </button>
              </div>
              <div :class="['w-16 h-1.5 rounded-full mt-8 group-hover/card:w-full transition-all duration-700 ease-in-out', course.accentBgClass]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const courses = ref([
  {
    title: 'Fundamentos <br/>Fotovoltaicos',
    description: 'El inicio de tu carrera en energías renovables de alto nivel.',
    duration: '4 Semanas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFTJY9YYK9FjBUBdFYddUZ4k_V9b4LsWZ81LHc2-9JKALSxqQ-CztyCMMfampOT2j_iWirfuc4tPv-79UYZeiCZC5EubxmXpfV8nKfPaNOF9bkPtxxAvUw6diIWcK06C9L8b5kElLwAvCcQ7uvIa5flXr7FEVR6lcG-uN-ok8tCvabk200p8FLabcy1J8aB-nRb_fqT24QpdIHmTgNk1emuz3UuFlvGk6Brs7VsDx4f1OLvNejHOnp7sC49bJFrjM0qvDUxoSKaHiK',
    roundedClass: 'rounded-organic-1',
    accentTextClass: 'text-accent-neon',
    accentGlowClass: 'glow-neon',
    accentBorderClass: 'border-accent-neon/30',
    accentBgClass: 'bg-accent-neon',
    extraClass: ''
  },
  {
    title: 'Certificación <br/>Industrial',
    description: 'Práctica avanzada en plantas de generación masiva.',
    duration: '6 Semanas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnlgl-Vp4qg2tOiAuz8sVfgGbq1P8NF1jg5wcCkjzAhew9aq1K-hoEbx4gmwNSUUzedcpIGzR1IxB9zXqIsrtuRmXdIkcG54zg0QBWZPcBFUglFfvVx4DwdG9aU0fUyPv1kr9HcUG9lLfqiJ47KwrjwovzeQmx7XJnAdPQ1DNGUJ0MWEO-EYeg__zOHqqdBoHL-puC6wQS-kvB9XM7ywpUwqOnlA2XCOPL6FtGc9qFXd8WupKacb9xxBZMZK8ehlNojjKNVSYDdxOP',
    roundedClass: 'rounded-premium',
    borderClass: 'border-accent-solar/20',
    accentTextClass: 'text-accent-solar',
    accentGlowClass: 'glow-solar',
    accentBorderClass: 'border-accent-solar/30',
    accentBgClass: 'bg-accent-solar',
    extraClass: 'md:mt-12'
  },
  {
    title: 'Smart Grids <br/>& IoT',
    description: 'La digitalización total de la infraestructura energética.',
    duration: '8 Semanas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf3xExhOznmJLKKBrTNSNe9PIbvNhfEV2vS3Bfcv4n27nFwSq-JJ6EIu9uk8n-xEeunLTXu3v42DSXz9BTPe1WLnxhzdGD8YAPv8M9T1Otw7pYO-Vw_zfOPrr7AhWx8CNeI8cjWMx8Bz_Cv42OgypSVJjrpr-h5wtKxVDxZ1tfiDBtmtez50kK9s5etWOcDgH-mzUSKQGu0qOPwIrcUpalnBdAIHkXvbnhoTFu_yYJc7dQAGSR0laNCQBqXRVqRkEMoe14bK2ZQfsa',
    roundedClass: 'rounded-organic-2',
    accentTextClass: 'text-accent-neon',
    accentGlowClass: 'glow-neon',
    accentBorderClass: 'border-accent-neon/30',
    accentBgClass: 'bg-accent-neon',
    extraClass: ''
  }
])
</script>

