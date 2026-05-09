<template>
  <div class="space-y-10 animate-fade-in">
    <!-- Header -->
    <div class="panel-hero p-6 sm:p-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tighter">Gestión de <span class="text-accent-neon italic">Usuarios</span></h2>
          <p class="text-on-surface/40 mt-1 text-xs font-bold uppercase tracking-widest">Control centralizado de todo el ecosistema de Enervida</p>
        </div>
        <div class="flex gap-4">
          <select v-model="filterRole" @change="fetchUsuarios" class="input-cyber !py-3 !text-xs appearance-none cursor-pointer">
            <option value="todos">Todos los Roles</option>
            <option v-for="rol in roles" :key="rol.id" :value="rol.nombre">{{ rol.nombre.toUpperCase() }}</option>
          </select>
          <router-link to="/admin/estudiantes/nuevo" class="btn-premium btn-primary-neon !py-4 gap-2">
            <span class="material-symbols-outlined text-sm">person_add</span>
            Nuevo Usuario
          </router-link>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="glass-card-premium rounded-[40px] overflow-hidden border-accent-neon/10">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr class="bg-on-surface/[0.03]">
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Identidad</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Correo / Contacto</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest text-center">Rol Actual</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Estado</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-on-surface/[0.06]">
            <tr v-for="usuario in usuarios" :key="usuario.id" class="group hover:bg-on-surface/[0.03] transition-colors">
              <td class="p-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-on-surface/5 overflow-hidden border border-on-surface/5">
                    <img :src="usuario.imagen_perfil || 'https://i.pravatar.cc/150?u=' + usuario.id" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="text-sm font-black text-on-surface">{{ usuario.nombres }} {{ usuario.apellidos }}</p>
                    <p class="text-[9px] text-accent-neon font-bold uppercase tracking-widest">CI: {{ usuario.ci || 'N/A' }}</p>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-on-surface/80 font-bold">{{ usuario.correo }}</span>
                  <span class="text-[9px] text-on-surface/40 font-black tracking-widest">{{ usuario.telefono || 'Sin Teléfono' }}</span>
                </div>
              </td>
              <td class="p-6">
                <div class="flex justify-center">
                  <div class="relative group/rol">
                    <span :class="['px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all', getRoleClass(usuario.rol?.nombre)]">
                      {{ usuario.rol?.nombre || 'Sin Rol' }}
                    </span>
                    <!-- Role change fast-action -->
                    <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover/rol:opacity-100 group-hover/rol:visible transition-all z-20 flex flex-col bg-surface-container border border-on-surface/10 rounded-xl shadow-2xl overflow-hidden p-1 min-w-[120px]">
                      <button v-for="r in roles" :key="r.id" @click="changeRole(usuario.id, r.id)" class="px-3 py-2 text-[10px] font-bold text-left hover:bg-accent-neon/10 hover:text-accent-neon rounded-lg transition-colors capitalize">
                        {{ r.nombre }}
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <div class="flex items-center gap-2">
                  <div :class="['w-1.5 h-1.5 rounded-full', usuario.estado === 'ACTIVO' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]']"></div>
                  <span class="text-[9px] font-black uppercase tracking-widest text-on-surface/60">
                    {{ usuario.estado }}
                  </span>
                </div>
              </td>
              <td class="p-6 text-right">
                <div class="flex justify-end gap-2">
                   <button @click="toggleStatus(usuario)" class="w-9 h-9 rounded-lg bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-accent-neon/10 hover:text-accent-neon transition-all" title="Cambiar Estado">
                    <span class="material-symbols-outlined text-sm">{{ usuario.estado === 'ACTIVO' ? 'block' : 'check_circle' }}</span>
                  </button>
                  <router-link :to="'/admin/estudiantes/editar/' + usuario.id" class="w-9 h-9 rounded-lg bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-blue-500/10 hover:text-blue-500 transition-all">
                    <span class="material-symbols-outlined text-sm">edit</span>
                  </router-link>
                  <button @click="deleteUsuario(usuario.id)" class="w-9 h-9 rounded-lg bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-red-500/10 hover:text-red-500 transition-all">
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
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
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-neon shadow-neon-sm"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { useNotificationStore } from '@/stores/notificationStore';
import { useModalStore } from '@/stores/modalStore';

const usuarios = ref([]);
const roles = ref([]);
const loading = ref(true);
const filterRole = ref('todos');
const notificationStore = useNotificationStore();
const modalStore = useModalStore();

const getRoleClass = (rol) => {
  switch (rol?.toLowerCase()) {
    case 'admin': return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'instructor': return 'bg-accent-solar/10 text-accent-solar border-accent-solar/20';
    case 'estudiante': return 'bg-accent-neon/10 text-accent-neon border-accent-neon/20';
    default: return 'bg-on-surface/5 text-on-surface/40 border-on-surface/10';
  }
};

const fetchRoles = async () => {
  try {
    const res = await api.get('/roles');
    roles.value = res.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

const fetchUsuarios = async () => {
  loading.value = true;
  try {
    let url = '/usuarios';
    if (filterRole.value !== 'todos') {
      url = `/usuarios/rol/${filterRole.value}`;
    }
    const res = await api.get(url);
    usuarios.value = res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
};

const changeRole = async (userId, roleId) => {
  try {
    await api.patch(`/usuarios/${userId}`, { rol_id: roleId });
    await fetchUsuarios();
    notificationStore.addNotification({
      title: 'Rol Actualizado',
      message: 'Los permisos del usuario han sido modificados.',
      type: 'success'
    })
  } catch (error) {
    console.error('Error changing role:', error);
    notificationStore.addNotification({
      title: 'Error de Permisos',
      message: 'No se pudo actualizar el rol del usuario.',
      type: 'error'
    })
  }
};

const toggleStatus = async (usuario) => {
  try {
    const newStatus = usuario.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    await api.patch(`/usuarios/${usuario.id}`, { estado: newStatus });
    usuario.estado = newStatus;
    notificationStore.addNotification({
      title: 'Estado Cambiado',
      message: `Usuario ${newStatus.toLowerCase()} exitosamente.`,
      type: 'success'
    })
  } catch (error) {
    notificationStore.addNotification({
      title: 'Error de Estado',
      message: 'No se pudo actualizar el acceso del usuario.',
      type: 'error'
    })
  }
};

const deleteUsuario = async (id) => {
  modalStore.openModal({
    title: '¿Eliminar Usuario?',
    message: 'Esta acción es irreversible y el usuario perderá todo acceso.',
    confirmText: 'Eliminar Permanente',
    type: 'danger',
    onConfirm: async () => {
      try {
        await api.delete(`/usuarios/${id}`);
        usuarios.value = usuarios.value.filter(u => u.id !== id);
        notificationStore.addNotification({
          title: 'Usuario Removido',
          message: 'La cuenta ha sido eliminada del sistema.',
          type: 'success'
        })
      } catch (error) {
        notificationStore.addNotification({
          title: 'Error al Eliminar',
          message: 'No se pudo completar la operación de borrado.',
          type: 'error'
        })
      }
    }
  })
};

onMounted(async () => {
  await Promise.all([fetchRoles(), fetchUsuarios()]);
});
</script>
