<template>
  <div class="space-y-10 animate-fade-in">
    <!-- Header -->
    <div class="panel-hero p-6 sm:p-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tighter">Gestión de <span class="text-accent-neon italic">Estudiantes</span></h2>
          <p class="text-on-surface/40 mt-1 text-xs font-bold uppercase tracking-widest">Administra los usuarios inscritos en la plataforma</p>
        </div>
        <router-link to="/admin/estudiantes/nuevo" class="btn-premium btn-primary-neon !py-4 gap-2">
          <span class="material-symbols-outlined text-sm">person_add</span>
          Nuevo Estudiante
        </router-link>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="glass-card-premium p-8 rounded-[32px] border-accent-neon/10 group hover:border-accent-neon/20 transition-all">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-2xl bg-accent-neon/10 flex items-center justify-center text-accent-neon">
            <span class="material-symbols-outlined">group</span>
          </div>
          <span class="text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Total Alumnos</span>
        </div>
        <p class="text-4xl font-black text-on-surface">{{ estudiantes.length }}</p>
      </div>
      <div class="glass-card-premium p-8 rounded-[32px] border-accent-neon/10 group hover:border-accent-neon/20 transition-all">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-2xl bg-accent-neon/10 flex items-center justify-center text-accent-neon">
            <span class="material-symbols-outlined">how_to_reg</span>
          </div>
          <span class="text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Activos</span>
        </div>
        <p class="text-4xl font-black text-on-surface">{{ estudiantes.filter(e => e.estado === 'ACTIVO').length }}</p>
      </div>
    </div>

    <!-- Students Table -->
    <div class="glass-card-premium rounded-[40px] overflow-hidden border-accent-neon/10">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr class="bg-on-surface/[0.03]">
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Estudiante</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">CI / Identidad</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Contacto</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Estado</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-on-surface/[0.06]">
            <tr v-for="estudiante in estudiantes" :key="estudiante.id" class="group hover:bg-on-surface/[0.03] transition-colors">
              <td class="p-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-on-surface/5 overflow-hidden border border-on-surface/5">
                    <img :src="estudiante.imagen_perfil || 'https://i.pravatar.cc/150?u=' + estudiante.id" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="text-sm font-black text-on-surface">{{ estudiante.nombres }} {{ estudiante.apellidos }}</p>
                    <p class="text-[10px] text-on-surface/40 font-bold uppercase tracking-tighter">Desde: {{ new Date(estudiante.fecha_creacion).toLocaleDateString() }}</p>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <div class="flex flex-col gap-1">
                  <span class="text-sm text-on-surface/80 font-bold flex items-center gap-2">
                    {{ estudiante.correo }}
                    <span v-if="estudiante.correo_verificado" class="material-symbols-outlined text-[14px] text-blue-500" title="Verificado">verified</span>
                  </span>
                  <span class="text-[10px] text-on-surface/40 font-black uppercase tracking-widest">{{ estudiante.telefono || 'Sin Teléfono' }}</span>
                </div>
              </td>
              <td class="p-6">
                <span class="text-xs font-black text-on-surface/60">{{ estudiante.ci || 'Pte. Registro' }}</span>
              </td>
              <td class="p-6">
                <div class="flex items-center gap-2">
                  <div :class="['w-2 h-2 rounded-full shadow-lg', estudiante.estado === 'ACTIVO' ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50']"></div>
                  <span class="text-[10px] font-black uppercase tracking-widest text-on-surface/60">
                    {{ estudiante.estado }}
                  </span>
                </div>
              </td>
              <td class="p-6 text-right">
                <div class="flex justify-end gap-2">
                  <router-link :to="'/admin/estudiantes/' + estudiante.id" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-accent-neon/10 hover:text-accent-neon transition-all" title="Ver Detalle">
                    <span class="material-symbols-outlined text-sm">visibility</span>
                  </router-link>
                  <router-link :to="'/admin/estudiantes/editar/' + estudiante.id" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-blue-500/10 hover:text-blue-500 transition-all" title="Editar">
                    <span class="material-symbols-outlined text-sm">edit</span>
                  </router-link>
                  <button @click="toggleStatus(estudiante)" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-accent-neon/10 hover:text-accent-neon transition-all" title="Alternar Estado">
                    <span class="material-symbols-outlined text-sm">{{ estudiante.estado === 'ACTIVO' ? 'block' : 'check_circle' }}</span>
                  </button>
                  <button @click="deleteEstudiante(estudiante.id)" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-red-500/10 hover:text-red-500 transition-all" title="Eliminar">
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="estudiantes.length === 0">
              <td colspan="5" class="p-20 text-center">
                <div class="flex flex-col items-center gap-4 text-on-surface/20">
                  <span class="material-symbols-outlined text-6xl">group_off</span>
                  <p class="text-sm font-black uppercase tracking-widest">No se encontraron estudiantes</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-background/60 backdrop-blur-md z-[200] flex items-center justify-center">
      <div class="flex flex-col items-center gap-6">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-neon shadow-[0_0_20px_var(--accent-neon)]"></div>
        <p class="text-[10px] font-black text-accent-neon uppercase tracking-[0.4em]">Cargando Estudiantes...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const estudiantes = ref([])
const loading = ref(true)

const fetchEstudiantes = async () => {
  loading.value = true
  try {
    const res = await api.get('/usuarios/rol/estudiante')
    estudiantes.value = res.data
  } catch (error) {
    console.error('Error fetching students:', error)
  } finally {
    loading.value = false
  }
}

const toggleStatus = async (estudiante) => {
  try {
    const newStatus = estudiante.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
    await api.patch(`/usuarios/${estudiante.id}`, { estado: newStatus })
    estudiante.estado = newStatus
  } catch (error) {
    console.error('Error updating status:', error)
    alert('Error al actualizar el estado')
  }
}

const deleteEstudiante = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este estudiante? Esta acción no se puede deshacer.')) return
  try {
    await api.delete(`/usuarios/${id}`)
    estudiantes.value = estudiantes.value.filter(e => e.id !== id)
  } catch (error) {
    console.error('Error deleting student:', error)
    alert('Error al eliminar el estudiante')
  }
}

onMounted(() => {
  fetchEstudiantes()
})
</script>
