<template>
  <div class="space-y-10 animate-in fade-in">
    <StudentPageHeader
      eyebrow="Logros academicos"
      title="Mis"
      highlight="Certificados"
      description="Mantiene visibles tus certificados aprobados y deja la descarga a un paso, tambien desde movil."
      :stats="headerStats"
    />

    <div v-if="loading" class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="i in 3" :key="i" class="h-80 rounded-[40px] admin-card loading-pulse"></div>
    </div>

    <div v-else-if="certificates.length === 0" class="student-empty flex flex-col items-center justify-center px-8 py-16 text-center">
      <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-on-surface/5 text-on-surface/20">
        <span class="material-symbols-outlined text-4xl">workspace_premium</span>
      </div>
      <h2 class="font-lexend text-2xl font-black uppercase tracking-tight">Sin certificados aun</h2>
      <p class="mt-4 max-w-xl text-sm leading-7 text-on-surface/35">
        Completa tus cursos al cien por ciento y esta seccion se convertira en tu repositorio de diplomas listos para descargar.
      </p>
      <router-link to="/student/my-courses" class="btn-premium btn-primary-neon mt-8 !px-8 !py-4">Ver mis cursos</router-link>
    </div>

    <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="cert in certificates"
        :key="cert.id"
        class="admin-card group flex h-full flex-col overflow-hidden rounded-[40px] border-admin-border transition-all duration-500 hover:border-accent-neon/30"
      >
        <div class="relative aspect-[4/3] overflow-hidden bg-on-surface/5 p-8">
          <div class="absolute inset-0 bg-gradient-to-br from-accent-neon/10 via-transparent to-accent-solar/10"></div>
          <span class="material-symbols-outlined absolute right-6 top-6 text-5xl text-accent-neon/20 transition-opacity group-hover:opacity-40">verified</span>
          <div class="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p class="text-[9px] font-black uppercase tracking-[0.24em] text-accent-neon">Certificado oficial</p>
              <h3 class="mt-4 font-lexend text-lg font-black leading-tight text-on-surface/80">{{ cert.curso?.titulo }}</h3>
            </div>
            <div class="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
              <p class="text-[8px] font-black uppercase tracking-[0.28em] text-on-surface/35">Codigo</p>
              <p class="mt-2 text-xs font-black uppercase tracking-[0.18em] text-accent-neon">{{ cert.codigo_certificado }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col p-8">
          <div class="mb-6 flex items-center justify-between gap-4">
            <span class="rounded-lg bg-accent-neon/10 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-accent-neon">Emitido</span>
            <span class="text-[9px] font-black uppercase tracking-widest text-on-surface/30">{{ formatDate(cert.fecha_emision) }}</span>
          </div>

          <p class="mb-6 text-sm leading-6 text-on-surface/45">
            Descarga el archivo PDF y mantenlo listo para validaciones, postulaciones o respaldo personal.
          </p>

          <button @click="downloadCertificate(cert)" class="btn-premium btn-primary-neon mt-auto !w-full !py-4 !text-[10px]">
            Descargar certificado
            <span class="material-symbols-outlined text-sm">download</span>
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import api from '@/services/api'
import StudentPageHeader from '@/components/student/StudentPageHeader.vue'

const certificates = ref([])
const loading = ref(true)

const headerStats = computed(() => [
  {
    label: 'Emitidos',
    value: loading.value ? '...' : certificates.value.length,
    help: 'Diplomas disponibles para descarga',
    icon: 'workspace_premium',
  },
  {
    label: 'Entrega',
    value: 'PDF',
    help: 'Apertura directa desde la tarjeta',
    icon: 'description',
  },
])

onMounted(async () => {
  try {
    const response = await api.get('/certificados/me')
    certificates.value = response.data
  } catch (error) {
    console.warn('Error loading certificates:', error)
  } finally {
    loading.value = false
  }
})

async function downloadCertificate(cert) {
  try {
    const response = await api.get(`/certificados/${cert.id}/download`, {
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `Certificado-${cert.curso?.titulo || cert.id}.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Download error:', error)
    alert('No se pudo descargar el certificado en este momento.')
  }
}

function formatDate(value) {
  if (!value) return 'Sin fecha'
  return new Date(value).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>
