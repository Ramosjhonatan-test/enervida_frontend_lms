<template>
  <div class="space-y-10 animate-in fade-in">
    <StudentPageHeader
      eyebrow="Centro de ayuda"
      title="Soporte"
      highlight="Tecnico"
      description="Esta vista ahora prioriza accesos rapidos, lectura limpia y contacto claro desde cualquier tamano de pantalla."
      :stats="headerStats"
    />

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      <section class="course-card-premium group rounded-[40px] border-admin-border p-8 text-center transition-all hover:border-accent-neon/30">
        <div class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-neon/10 text-accent-neon shadow-inner">
          <span class="material-symbols-outlined text-4xl">contact_support</span>
        </div>
        <h2 class="text-xl font-black uppercase tracking-tight">Preguntas frecuentes</h2>
        <p class="mt-4 text-sm leading-6 text-on-surface/40">Respuestas rapidas para acceso, evaluaciones, certificados y navegacion del campus.</p>
        <button class="btn-premium btn-primary-neon mt-8 !w-full !py-4 !text-[10px]">Ir a FAQs</button>
      </section>

      <section class="course-card-premium group rounded-[40px] border-admin-border bg-gradient-to-b from-accent-neon/5 to-transparent p-8 text-center transition-all hover:border-accent-neon/30">
        <div class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-neon text-primary shadow-neon-sm">
          <span class="material-symbols-outlined text-4xl">chat</span>
        </div>
        <h2 class="text-xl font-black uppercase tracking-tight">Chat directo</h2>
        <p class="mt-4 text-sm leading-6 text-on-surface/40">Contacto inmediato por WhatsApp para dudas tecnicas o apoyo con tu ruta academica.</p>
        <a href="https://wa.me/591XXXXXXXX" target="_blank" class="btn-premium btn-primary-neon mt-8 !w-full !py-4 !text-[10px]">
          Iniciar chat
          <span class="material-symbols-outlined text-sm">rocket_launch</span>
        </a>
      </section>

      <section class="course-card-premium group rounded-[40px] border-admin-border p-8 text-center transition-all hover:border-accent-neon/30">
        <div class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-neon/10 text-accent-neon shadow-inner">
          <span class="material-symbols-outlined text-4xl">mail</span>
        </div>
        <h2 class="text-xl font-black uppercase tracking-tight">Correo</h2>
        <p class="mt-4 text-sm leading-6 text-on-surface/40">Envianos un detalle mas largo y manten una referencia formal de tu incidencia.</p>
        <a href="mailto:soporte@enervida.com" class="btn-premium btn-primary-neon mt-8 !w-full !py-4 !text-[10px]">Enviar ticket</a>
      </section>
    </div>

    <section class="course-card-premium p-8 md:p-10">
      <div class="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-[10px] font-black uppercase tracking-[0.24em] text-accent-neon">Monitoreo</p>
          <h3 class="mt-2 font-lexend text-2xl font-black tracking-tight">Estado de servicios</h3>
        </div>
        <span class="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-green-500">
          Todo operativo
        </span>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="service in services" :key="service.name" class="flex items-center justify-between rounded-2xl border admin-line admin-soft-bg p-4">
          <div class="flex items-center gap-4">
            <div class="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span class="text-xs font-black uppercase tracking-widest text-on-surface/60">{{ service.name }}</span>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest text-green-500">Operativo</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import StudentPageHeader from '@/components/student/StudentPageHeader.vue'

const headerStats = [
  {
    label: 'Canales',
    value: '3',
    help: 'FAQ, chat y correo desde la misma vista',
    icon: 'support_agent',
  },
  {
    label: 'Respuesta',
    value: '<24h',
    help: 'Escalado simple y lectura mas clara',
    icon: 'schedule',
  },
]

const services = [
  { name: 'Aula virtual' },
  { name: 'Base de datos' },
  { name: 'Servicio de video' },
  { name: 'Generador de certificados' },
]
</script>
