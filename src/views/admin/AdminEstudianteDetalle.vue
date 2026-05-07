<template>
  <div v-if="estudiante" class="space-y-10 animate-fade-in text-on-surface">
    <!-- Header with Back Button -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex items-center gap-6">
        <button @click="$router.back()" class="w-12 h-12 rounded-2xl bg-on-surface/5 flex items-center justify-center text-on-surface/60 hover:bg-accent-neon/10 hover:text-accent-neon transition-all">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tighter">Detalle del <span class="text-accent-neon italic">Estudiante</span></h2>
          <p class="text-on-surface/40 mt-1 text-xs font-bold uppercase tracking-widest">Expediente académico y actividad reciente</p>
        </div>
      </div>
      <div class="flex gap-4">
        <button @click="toggleStatus" :class="['btn-premium !py-4 gap-2 border border-on-surface/10', estudiante.estado === 'ACTIVO' ? 'btn-secondary-glass hover:!text-red-500' : 'btn-primary-neon']">
          <span class="material-symbols-outlined text-sm">{{ estudiante.estado === 'ACTIVO' ? 'block' : 'check_circle' }}</span>
          {{ estudiante.estado === 'ACTIVO' ? 'Desactivar Cuenta' : 'Activar Cuenta' }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Profile Card -->
      <div class="lg:col-span-1 space-y-8">
        <div class="glass-card p-10 rounded-[40px] border-accent-neon/5 text-center relative overflow-hidden">
          <div class="relative z-10">
            <div class="w-32 h-32 rounded-[40px] border-4 border-accent-neon/20 p-1 mx-auto mb-6 shadow-2xl overflow-hidden group">
              <img :src="estudiante.imagen_perfil || 'https://i.pravatar.cc/150?u=' + estudiante.id" class="w-full h-full object-cover rounded-[32px] group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h3 class="text-2xl font-black text-on-surface font-lexend leading-tight">{{ estudiante.nombres }} {{ estudiante.apellidos }}</h3>
            <p class="text-accent-neon font-black text-[10px] uppercase tracking-[0.3em] mt-2">{{ estudiante.rol?.nombre }}</p>
            
            <div class="mt-10 space-y-4 text-left">
              <div class="flex items-center gap-4 p-4 rounded-2xl bg-on-surface/5 border border-on-surface/5">
                <span class="material-symbols-outlined text-on-surface/40">mail</span>
                <span class="text-xs font-bold text-on-surface/60">{{ estudiante.correo }}</span>
              </div>
              <div class="flex items-center gap-4 p-4 rounded-2xl bg-on-surface/5 border border-on-surface/5">
                <span class="material-symbols-outlined text-on-surface/40">calendar_today</span>
                <div class="flex flex-col">
                  <span class="text-[9px] font-black text-on-surface/30 uppercase tracking-widest">Miembro desde</span>
                  <span class="text-xs font-bold text-on-surface/60">{{ new Date(estudiante.fecha_creacion).toLocaleDateString() }}</span>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 rounded-2xl bg-on-surface/5 border border-on-surface/5">
                <span class="material-symbols-outlined text-on-surface/40">login</span>
                <div class="flex flex-col">
                  <span class="text-[9px] font-black text-on-surface/30 uppercase tracking-widest">Último acceso</span>
                  <span class="text-xs font-bold text-on-surface/60">{{ estudiante.ultimo_login ? new Date(estudiante.ultimo_login).toLocaleString() : 'Nunca' }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-accent-neon/5 rounded-full blur-3xl"></div>
        </div>

        <!-- Registered Device Info -->
        <div class="glass-card p-10 rounded-[40px] border-accent-neon/5">
          <div class="flex justify-between items-center mb-6">
            <h4 class="text-sm font-black text-on-surface uppercase tracking-widest">Seguridad / Dispositivo</h4>
            <span v-if="estudiante.dispositivos?.length" class="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          </div>

          <div v-if="estudiante.dispositivos?.length" class="space-y-6">
            <div v-for="dev in estudiante.dispositivos" :key="dev.id" class="p-4 rounded-2xl bg-on-surface/5 border border-on-surface/5">
              <div class="flex items-center gap-3 mb-3">
                <span class="material-symbols-outlined text-accent-neon text-lg">
                  {{ getDeviceIcon(dev.sistema_operativo) }}
                </span>
                <span class="text-xs font-black text-on-surface">{{ dev.nombre_dispositivo || 'Dispositivo Vinculado' }}</span>
              </div>
              <div class="space-y-2">
                <p class="text-[10px] text-on-surface/40 font-bold uppercase flex justify-between">
                  <span>Navegador:</span>
                  <span class="text-on-surface/60">{{ dev.navegador }}</span>
                </p>
                <p class="text-[10px] text-on-surface/40 font-bold uppercase flex justify-between">
                  <span>S.O:</span>
                  <span class="text-on-surface/60">{{ dev.sistema_operativo }}</span>
                </p>
                <p class="text-[10px] text-on-surface/40 font-bold uppercase flex justify-between">
                  <span>Última IP:</span>
                  <span class="text-on-surface/60">{{ dev.direccion_ip || 'N/A' }}</span>
                </p>
                <p class="text-[10px] text-on-surface/40 font-bold uppercase flex justify-between">
                  <span>Activo desde:</span>
                  <span class="text-on-surface/60">{{ new Date(dev.fecha_creacion).toLocaleDateString() }}</span>
                </p>
              </div>
            </div>

            <button @click="liberateDevices" class="w-full py-4 rounded-2xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 border border-red-500/20">
              <span class="material-symbols-outlined text-sm">lock_open</span>
              Liberar Cuenta (Desvincular)
            </button>
            <p class="text-[8px] text-on-surface/30 text-center uppercase font-bold leading-relaxed">
              Al liberar la cuenta, el estudiante podrá vincular un nuevo dispositivo en su próximo inicio de sesión.
            </p>
          </div>
          
          <div v-else class="text-center py-10">
            <span class="material-symbols-outlined text-on-surface/10 text-4xl mb-2">devices_off</span>
            <p class="text-[10px] font-black text-on-surface/20 uppercase tracking-widest">Sin dispositivos vinculados</p>
          </div>
        </div>

        <!-- Recent Activity Logs -->
        <div class="glass-card p-10 rounded-[40px] border-accent-neon/5">
          <div class="flex justify-between items-center mb-8">
            <h4 class="text-sm font-black text-on-surface uppercase tracking-widest">Actividad Reciente</h4>
            <button @click="toggleAllLogs" class="text-[9px] font-black text-accent-neon uppercase tracking-widest hover:underline">
              {{ allLogsExpanded ? 'Contraer Todo' : 'Expandir Todo' }}
            </button>
          </div>
          
          <div class="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            <div v-for="(logs, date) in logsAgrupados" :key="date" class="space-y-3">
              <button @click="toggleLogGroup(date)" class="w-full flex items-center gap-4 group py-1 sticky top-0 bg-surface/80 backdrop-blur-md z-10">
                <span class="text-[9px] font-black text-accent-neon uppercase tracking-[0.2em] whitespace-nowrap">{{ date }}</span>
                <div class="h-px w-full bg-on-surface/10"></div>
                <span class="material-symbols-outlined text-xs text-on-surface/20 group-hover:text-accent-neon transition-transform" :class="{ 'rotate-180': expandedGroups[date] }">expand_more</span>
              </button>
              
              <div v-if="expandedGroups[date]" class="space-y-4 pl-2 animate-slide-down">
                <div v-for="log in logs" :key="log.id" class="flex gap-4 group">
                  <div class="w-1.5 h-1.5 rounded-full bg-on-surface/20 mt-1.5 group-hover:bg-accent-neon transition-colors shrink-0 shadow-[0_0_5px_transparent] group-hover:shadow-accent-neon/50"></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[11px] font-bold text-on-surface/80 group-hover:text-on-surface transition-colors leading-tight break-words">{{ log.accion }}</p>
                    <div class="flex items-center gap-2 mt-1">
                      <p class="text-[9px] text-on-surface/40 uppercase font-medium">{{ new Date(log.fecha_creacion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</p>
                      <span v-if="log.direccion_ip" class="text-[8px] text-on-surface/20 font-mono">{{ log.direccion_ip }}</span>
                    </div>
                    <p v-if="log.descripcion" class="text-[9px] text-on-surface/30 mt-1 italic line-clamp-2 hover:line-clamp-none transition-all">{{ log.descripcion }}</p>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="!estudiante.auditoria_logs?.length" class="text-center py-6 text-on-surface/20 text-[10px] font-black uppercase tracking-widest">Sin registros</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Courses and Grades -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Enrolled Courses -->
        <div class="glass-card p-10 rounded-[40px] border-accent-neon/5">
          <div class="flex justify-between items-center mb-10">
            <h4 class="text-xl font-black font-lexend tracking-tighter italic">Cursos <span class="text-accent-neon">Inscritos</span></h4>
            <span class="px-3 py-1 bg-accent-neon/10 text-accent-neon text-[10px] font-black rounded-full border border-accent-neon/20">
              {{ estudiante.inscripciones?.length || 0 }} Total
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="ins in estudiante.inscripciones" :key="ins.id" class="p-6 rounded-[32px] bg-on-surface/5 border border-on-surface/5 group hover:border-accent-neon/30 transition-all">
              <div class="flex justify-between items-start mb-4">
                <div class="w-12 h-12 rounded-xl bg-on-surface/10 overflow-hidden shrink-0">
                  <img :src="getImageUrl(ins.curso.miniatura_url)" class="w-full h-full object-cover" />
                </div>
                <div class="flex flex-col items-end gap-2">
                  <span :class="['px-2 py-0.5 text-[8px] font-black rounded-md uppercase tracking-widest', ins.estado === 'ACTIVO' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500']">
                    {{ ins.estado }}
                  </span>
                  <button v-if="ins.estado === 'PENDIENTE'" @click="approveEnrollment(ins.id)" class="px-3 py-1 bg-green-500 text-white text-[9px] font-black rounded-lg hover:bg-green-600 transition-colors">
                    Aprobar Pago
                  </button>
                </div>
              </div>
              <h5 class="text-sm font-black text-on-surface mb-4 line-clamp-1 group-hover:text-accent-neon transition-colors">{{ ins.curso.titulo }}</h5>
              <div class="flex justify-between items-end mb-2">
                <span class="text-[9px] font-black text-on-surface/30 uppercase tracking-widest">Progreso</span>
                <span class="text-xs font-black text-accent-neon">{{ Math.round(ins.porcentaje_progreso) }}%</span>
              </div>
              <div class="h-1.5 bg-on-surface/10 rounded-full overflow-hidden">
                <div class="h-full bg-accent-neon rounded-full shadow-[0_0_10px_var(--accent-neon)] transition-all duration-1000" :style="{ width: ins.porcentaje_progreso + '%' }"></div>
              </div>
            </div>
            <div v-if="!estudiante.inscripciones?.length" class="col-span-full py-20 text-center text-on-surface/20 border-2 border-dashed border-on-surface/5 rounded-[32px]">
               <span class="material-symbols-outlined text-4xl mb-2">auto_stories</span>
               <p class="text-[10px] font-black uppercase tracking-widest">No está inscrito en ningún curso</p>
            </div>
          </div>
        </div>

        <!-- Evaluation Attempts -->
        <div class="glass-card p-10 rounded-[40px] border-accent-neon/5">
          <h4 class="text-xl font-black font-lexend tracking-tighter italic mb-10">Historial de <span class="text-accent-neon">Evaluaciones</span></h4>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-on-surface/5">
                  <th class="pb-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Evaluación</th>
                  <th class="pb-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Nota</th>
                  <th class="pb-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Estado</th>
                  <th class="pb-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest text-right">Fecha</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-on-surface/5">
                <tr v-for="intento in estudiante.intentos_evaluacion" :key="intento.id" class="group hover:bg-on-surface/5 transition-colors">
                  <td class="py-6">
                    <p class="text-xs font-black text-on-surface group-hover:text-accent-neon transition-colors">{{ intento.evaluacion.titulo }}</p>
                  </td>
                  <td class="py-6">
                    <span :class="['text-sm font-black', intento.aprobado ? 'text-green-500' : 'text-red-500']">{{ intento.nota || '0.00' }}</span>
                  </td>
                  <td class="py-6">
                    <span :class="['px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest', intento.aprobado ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500']">
                      {{ intento.aprobado ? 'Aprobado' : 'Reprobado' }}
                    </span>
                  </td>
                  <td class="py-6 text-right text-[10px] text-on-surface/40 font-bold uppercase">{{ new Date(intento.fecha_fin || intento.fecha_inicio).toLocaleDateString() }}</td>
                </tr>
                <tr v-if="!estudiante.intentos_evaluacion?.length">
                  <td colspan="4" class="py-20 text-center text-on-surface/20">
                    <p class="text-[10px] font-black uppercase tracking-widest">No ha realizado evaluaciones aún</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-background/60 backdrop-blur-md z-[200] flex items-center justify-center">
      <div class="flex flex-col items-center gap-6">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-neon shadow-[0_0_20px_var(--accent-neon)]"></div>
        <p class="text-[10px] font-black text-accent-neon uppercase tracking-[0.4em]">Cargando Expediente...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const estudiante = ref(null)
const loading = ref(true)
const expandedGroups = ref({})
const allLogsExpanded = ref(false)

const toggleLogGroup = (date) => {
  expandedGroups.value[date] = !expandedGroups.value[date]
}

const toggleAllLogs = () => {
  allLogsExpanded.value = !allLogsExpanded.value
  Object.keys(logsAgrupados.value).forEach(date => {
    expandedGroups.value[date] = allLogsExpanded.value
  })
}

const getDeviceIcon = (os) => {
  const osLower = os?.toLowerCase() || ''
  if (osLower.includes('windows')) return 'desktop_windows'
  if (osLower.includes('android')) return 'phone_android'
  if (osLower.includes('ios') || osLower.includes('iphone') || osLower.includes('ipad')) return 'phone_iphone'
  if (osLower.includes('mac')) return 'desktop_mac'
  if (osLower.includes('linux')) return 'terminal'
  return 'devices'
}

const liberateDevices = async () => {
  if (!confirm('¿Estás seguro de liberar los dispositivos de este estudiante? Esto permitirá que inicie sesión desde cualquier equipo nuevo.')) return
  
  try {
    loading.value = true
    await api.patch(`/dispositivos-usuario/liberate/${estudiante.value.id}`)
    alert('Dispositivos liberados exitosamente')
    await fetchEstudiante()
  } catch (error) {
    console.error('Error liberating devices:', error)
    alert('Error al liberar dispositivos')
  } finally {
    loading.value = false
  }
}

const logsAgrupados = computed(() => {
  if (!estudiante.value?.auditoria_logs) return {}
  
  const sortedLogs = [...estudiante.value.auditoria_logs].sort((a, b) => 
    new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
  )

  const groups = {}
  sortedLogs.forEach(log => {
    const date = new Date(log.fecha_creacion).toLocaleDateString('es-BO', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
    if (!groups[date]) {
      groups[date] = []
      // Inicializar como expandido si es el primer día o si ya estaba expandido
      if (Object.keys(groups).length === 1 || allLogsExpanded.value) {
        expandedGroups.value[date] = true
      }
    }
    groups[date].push(log)
  })
  return groups
})

const fetchEstudiante = async () => {
  loading.value = true
  try {
    const res = await api.get(`/usuarios/${route.params.id}`)
    estudiante.value = res.data
  } catch (error) {
    console.error('Error fetching student detail:', error)
  } finally {
    loading.value = false
  }
}

const toggleStatus = async () => {
  try {
    const newStatus = estudiante.value.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
    await api.patch(`/usuarios/${estudiante.value.id}`, { estado: newStatus })
    estudiante.value.estado = newStatus
  } catch (error) {
    console.error('Error toggling status:', error)
  }
}

const approveEnrollment = async (inscripcionId) => {
  if (!confirm('¿Confirmas que el estudiante ha realizado el pago para activar este curso?')) return
  try {
    await api.patch(`/inscripciones/${inscripcionId}`, { estado: 'ACTIVO' })
    alert('Inscripción aprobada exitosamente')
    fetchEstudiante()
  } catch (error) {
    console.error('Error approving enrollment:', error)
    alert('Error al aprobar la inscripción')
  }
}

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanUrl}`;
};

onMounted(() => {
  fetchEstudiante()
})
</script>
