<template>
  <div class="space-y-10 animate-fade-in">
    <!-- Header -->
    <div class="panel-hero p-6 sm:p-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tighter">Gestión de <span class="text-accent-neon italic">Roles</span></h2>
          <p class="text-on-surface/40 mt-1 text-xs font-bold uppercase tracking-widest">Define los niveles de acceso y permisos del sistema</p>
        </div>
        <button @click="toggleForm()" class="btn-premium btn-primary-neon !py-4 gap-2">
          <span class="material-symbols-outlined text-sm">{{ showForm ? 'close' : 'security' }}</span>
          {{ showForm ? 'Cancelar' : 'Nuevo Rol' }}
        </button>
      </div>
    </div>

    <!-- Inline Form Panel -->
    <transition name="slide-fade">
      <div v-if="showForm" class="glass-card p-6 sm:p-8 rounded-[32px]">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon">
            <span class="material-symbols-outlined text-sm">{{ isEditing ? 'edit' : 'security' }}</span>
          </div>
          <div>
            <h3 class="text-lg font-black text-on-surface font-lexend tracking-tighter">
              {{ isEditing ? 'Editar' : 'Nuevo' }} <span class="text-accent-neon italic">Rol</span>
            </h3>
            <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Configura las propiedades del rol</p>
          </div>
        </div>

        <form @submit.prevent="saveRol" class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1 space-y-2">
            <label class="text-[11px] font-black text-on-surface/40 uppercase tracking-widest ml-1">Nombre (Identificador)</label>
            <input type="text" v-model="form.nombre" :disabled="isEditing && isSystemRole(form.nombre)" required placeholder="Ej. administrador" class="input-cyber w-full uppercase" />
            <p v-if="isEditing && isSystemRole(form.nombre)" class="text-[9px] text-accent-neon/60 font-bold ml-1 mt-1">Rol de sistema (inmutable).</p>
          </div>

          <div class="flex-[2] space-y-2">
            <label class="text-[11px] font-black text-on-surface/40 uppercase tracking-widest ml-1">Descripción</label>
            <input type="text" v-model="form.descripcion" placeholder="Describe los alcances de este rol..." class="input-cyber w-full" />
          </div>

          <div class="flex items-end gap-3 shrink-0">
            <button type="button" @click="showForm = false" class="btn-premium glass-card justify-center !py-3.5 !px-6">Cancelar</button>
            <button type="submit" :disabled="saving" class="btn-premium btn-primary-neon justify-center !py-3.5 !px-8">
              <span v-if="saving" class="animate-spin rounded-full h-4 w-4 border-t-2 border-primary"></span>
              <span v-else>{{ isEditing ? 'Guardar' : 'Crear' }}</span>
            </button>
          </div>
        </form>
      </div>
    </transition>

    <!-- Roles Table -->
    <div class="glass-card-premium rounded-[40px] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] text-left border-separate border-spacing-0">
          <thead>
            <tr class="bg-on-surface/[0.03]">
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Identificador del Rol</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Descripción / Alcance</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rol in roles" :key="rol.id" class="group hover:bg-on-surface/[0.03] transition-colors">
              <td class="p-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon shadow-neon-sm">
                    <span class="material-symbols-outlined text-sm">admin_panel_settings</span>
                  </div>
                  <div>
                    <span class="text-sm font-black text-on-surface uppercase tracking-tight">{{ rol.nombre }}</span>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <p class="text-xs text-on-surface/60 line-clamp-1 max-w-md">{{ rol.descripcion || 'Sin descripción' }}</p>
              </td>
              <td class="p-6 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="openEdit(rol)" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-blue-500/10 hover:text-blue-500 transition-all" title="Editar">
                    <span class="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button v-if="!isSystemRole(rol.nombre)" @click="deleteRol(rol.id)" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-red-500/10 hover:text-red-500 transition-all" title="Eliminar">
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="roles.length === 0">
              <td colspan="3" class="p-20 text-center">
                <div class="flex flex-col items-center gap-4 text-on-surface/20">
                  <span class="material-symbols-outlined text-6xl">security</span>
                  <p class="text-sm font-black uppercase tracking-widest">No hay roles registrados</p>
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
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-neon"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { useNotificationStore } from '@/stores/notificationStore';
import { useModalStore } from '@/stores/modalStore';

const roles = ref([]);
const loading = ref(true);
const saving = ref(false);
const showForm = ref(false);
const isEditing = ref(false);
const notificationStore = useNotificationStore();
const modalStore = useModalStore();

const form = ref({
  id: null,
  nombre: '',
  descripcion: ''
});

const isSystemRole = (nombre) => {
  if (!nombre) return false;
  const n = nombre.toLowerCase();
  return n === 'admin' || n === 'estudiante' || n === 'instructor';
};

const fetchRoles = async () => {
  loading.value = true;
  try {
    const res = await api.get('/roles');
    roles.value = res.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
  } finally {
    loading.value = false;
  }
};

const toggleForm = () => {
  if (showForm.value) {
    showForm.value = false;
  } else {
    isEditing.value = false;
    form.value = { id: null, nombre: '', descripcion: '' };
    showForm.value = true;
  }
};

const openEdit = (rol) => {
  isEditing.value = true;
  form.value = { ...rol };
  showForm.value = true;
};

const saveRol = async () => {
  saving.value = true;
  try {
    const payload = { ...form.value, nombre: form.value.nombre.toLowerCase() };
    if (isEditing.value) {
      await api.patch(`/roles/${form.value.id}`, payload);
    } else {
      await api.post('/roles', payload);
    }
    showForm.value = false;
    await fetchRoles();
    notificationStore.addNotification({
      title: 'Rol Actualizado',
      message: 'Los permisos se han sincronizado correctamente.',
      type: 'success'
    })
  } catch (error) {
    console.error('Error saving role:', error);
    notificationStore.addNotification({
      title: 'Error de Sistema',
      message: 'No se pudo guardar el rol. El nombre debe ser único.',
      type: 'error'
    })
  } finally {
    saving.value = false;
  }
};

const deleteRol = async (id) => {
  modalStore.openModal({
    title: '¿Eliminar Rol?',
    message: 'Los usuarios asignados a este rol podrían perder acceso al sistema inmediatamente.',
    confirmText: 'Sí, Eliminar',
    type: 'danger',
    onConfirm: async () => {
      try {
        await api.delete(`/roles/${id}`);
        notificationStore.addNotification({
          title: 'Rol Eliminado',
          message: 'El registro ha sido removido exitosamente.',
          type: 'success'
        })
        await fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
        notificationStore.addNotification({
          title: 'Acción Bloqueada',
          message: 'No se puede eliminar el rol. Verifique si tiene usuarios asignados.',
          type: 'error'
        })
      }
    }
  })
};

onMounted(() => {
  fetchRoles();
});
</script>

<style scoped>
.slide-fade-enter-active { transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1); }
.slide-fade-leave-active { transition: all 0.2s ease-in; }
.slide-fade-enter-from { transform: translateY(-12px); opacity: 0; }
.slide-fade-leave-to { transform: translateY(-8px); opacity: 0; }
</style>
