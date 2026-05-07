<script setup>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import CoursesSection from '@/components/CoursesSection.vue'
import BenefitsSection from '@/components/BenefitsSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import CTASection from '@/components/CTASection.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="mesh-gradient min-h-screen w-full overflow-x-hidden">
    <Navbar />
    <main>
      <HeroSection />
      <CoursesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
    <Footer />
  </div>
</template>

