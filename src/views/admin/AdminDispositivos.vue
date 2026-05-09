<template>
  <div class="space-y-10 animate-fade-in text-on-surface">
    <!-- Header -->
    <div class="panel-hero p-6 sm:p-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tighter">Control de <span class="text-accent-neon italic">Dispositivos</span></h2>
          <p class="text-on-surface/40 mt-1 text-xs font-bold uppercase tracking-widest">Seguridad y gestión de sesiones activas en la plataforma</p>
        </div>
        <div class="flex gap-4">
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/30 text-sm">search</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Buscar por usuario o IP..." 
              class="input-cyber !pl-10 !py-3 !text-xs w-64"
            />
          </div>
          <button @click="fetchDispositivos" class="btn-premium btn-primary-neon !py-4 gap-2">
            <span class="material-symbols-outlined text-sm">refresh</span>
            Actualizar
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-card-premium p-6 border-accent-neon/10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-accent-neon/10 flex items-center justify-center text-accent-neon">
          <span class="material-symbols-outlined">devices</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Sesiones Totales</p>
          <p class="text-2xl font-black text-on-surface">{{ dispositivos.length }}</p>
        </div>
      </div>
      <div class="glass-card-premium p-6 border-accent-solar/10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-accent-solar/10 flex items-center justify-center text-accent-solar">
          <span class="material-symbols-outlined">person</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Usuarios Únicos</p>
          <p class="text-2xl font-black text-on-surface">{{ uniqueUsers }}</p>
        </div>
      </div>
      <div class="glass-card-premium p-6 border-red-500/10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
          <span class="material-symbols-outlined">security</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Alertas de Riesgo</p>
          <p class="text-2xl font-black text-on-surface">{{ riskAlerts }}</p>
        </div>
      </div>
    </div>

    <!-- Devices Table -->
    <div class="glass-card-premium rounded-[40px] overflow-hidden border-accent-neon/10">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr class="bg-on-surface/[0.03]">
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Usuario</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Dispositivo / SO</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Navegador</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">IP / Ubicación</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Última Actividad</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-on-surface/[0.06]">
            <tr v-for="dispositivo in filteredDispositivos" :key="dispositivo.id" class="group hover:bg-on-surface/[0.03] transition-colors">
              <td class="p-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-on-surface/5 overflow-hidden border border-on-surface/5">
                    <img :src="dispositivo.usuario?.imagen_perfil || 'https://i.pravatar.cc/150?u=' + dispositivo.usuario?.id" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="text-sm font-black text-on-surface">{{ dispositivo.usuario?.nombres }} {{ dispositivo.usuario?.apellidos }}</p>
                    <p class="text-[9px] text-accent-neon font-bold uppercase tracking-widest">{{ dispositivo.usuario?.correo }}</p>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-on-surface/40 text-lg">
                    {{ getDeviceIcon(dispositivo.sistema_operativo) }}
                  </span>
                  <div>
                    <p class="text-xs font-bold text-on-surface">{{ dispositivo.sistema_operativo || 'Desconocido' }}</p>
                    <p class="text-[9px] text-on-surface/40 font-black tracking-widest">{{ dispositivo.nombre_dispositivo || 'Genérico' }}</p>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <div class="flex items-center gap-2">
                  <span class="text-xs text-on-surface/80 font-bold">{{ dispositivo.navegador || 'N/A' }}</span>
                </div>
              </td>
              <td class="p-6">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-on-surface/80 font-bold">{{ dispositivo.direccion_ip }}</span>
                  <span class="text-[9px] text-on-surface/40 font-black tracking-widest">{{ dispositivo.fingerprint ? 'Sesión Verificada' : 'Ubicación no disponible' }}</span>
                </div>
              </td>
              <td class="p-6">
                <div class="flex items-center gap-2">
                  <div :class="['w-1.5 h-1.5 rounded-full', dispositivo.activo ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-on-surface/20']"></div>
                  <span class="text-xs font-bold text-on-surface/60">
                    {{ formatDate(dispositivo.ultimo_acceso) }}
                  </span>
                </div>
              </td>
              <td class="p-6 text-right">
                <button 
                  @click="revokeSession(dispositivo.id)" 
                  class="btn-premium bg-red-500/10 text-red-500 hover:bg-red-500 border-red-500/20 !px-4 !py-2.5 gap-2 text-[10px]"
                >
                  <span class="material-symbols-outlined text-sm">logout</span>
                  Revocar
                </button>
              </td>
            </tr>
            <tr v-if="filteredDispositivos.length === 0">
              <td colspan="6" class="p-10 text-center text-on-surface/40 font-bold italic">
                No se encontraron dispositivos activos...
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
import { ref, onMounted, computed } from 'vue';
import api from '@/services/api';
import { useNotificationStore } from '@/stores/notificationStore';
import { useModalStore } from '@/stores/modalStore';

const notificationStore = useNotificationStore();
const modalStore = useModalStore();

const dispositivos = ref([]);
const loading = ref(true);
const searchQuery = ref('');

const fetchDispositivos = async () => {
  loading.value = true;
  try {
    const res = await api.get('/dispositivos-usuario');
    dispositivos.value = res.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    // Mock data alineado con Schema
    dispositivos.value = [
      {
        id: 1,
        direccion_ip: '192.168.1.1',
        sistema_operativo: 'Windows 11',
        navegador: 'Chrome',
        nombre_dispositivo: 'PC Oficina',
        activo: true,
        ultimo_acceso: new Date(),
        usuario: { id: 1, nombres: 'Juan', apellidos: 'Perez', correo: 'juan@enervida.com' }
      }
    ];
  } finally {
    loading.value = false;
  }
};

const revokeSession = async (id) => {
  modalStore.openModal({
    title: '¿Revocar Sesión?',
    message: 'El usuario será desconectado de este dispositivo inmediatamente.',
    confirmText: 'Revocar Acceso',
    type: 'danger',
    onConfirm: async () => {
      try {
        await api.delete(`/dispositivos-usuario/${id}`);
        dispositivos.value = dispositivos.value.filter(d => d.id !== id);
        notificationStore.addNotification({
          title: 'Sesión Finalizada',
          message: 'El acceso ha sido revocado exitosamente.',
          type: 'success'
        })
      } catch (error) {
        console.error('Error revoking session:', error);
        notificationStore.addNotification({
          title: 'Error de Seguridad',
          message: 'No se pudo revocar la sesión en este momento.',
          type: 'error'
        })
      }
    }
  })
};

const filteredDispositivos = computed(() => {
  if (!searchQuery.value) return dispositivos.value;
  const q = searchQuery.value.toLowerCase();
  return dispositivos.value.filter(d => 
    d.usuario?.nombres?.toLowerCase().includes(q) ||
    d.usuario?.apellidos?.toLowerCase().includes(q) ||
    d.direccion_ip?.includes(q) ||
    d.usuario?.correo?.toLowerCase().includes(q)
  );
});

const uniqueUsers = computed(() => {
  const users = new Set(dispositivos.value.map(d => d.usuario?.id));
  return users.size;
});

const riskAlerts = computed(() => {
  const userCounts = {};
  dispositivos.value.forEach(d => {
    if (d.usuario?.id) {
      userCounts[d.usuario.id] = (userCounts[d.usuario.id] || 0) + 1;
    }
  });
  return Object.values(userCounts).filter(count => count > 2).length;
});

const getDeviceIcon = (os) => {
  const lowerOS = os?.toLowerCase() || '';
  if (lowerOS.includes('win')) return 'desktop_windows';
  if (lowerOS.includes('android')) return 'smartphone';
  if (lowerOS.includes('ios') || lowerOS.includes('iphone')) return 'smartphone';
  if (lowerOS.includes('mac')) return 'laptop_mac';
  return 'devices';
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

onMounted(() => {
  fetchDispositivos();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.panel-hero {
  background: linear-gradient(135deg, rgba(var(--accent-neon-rgb), 0.05) 0%, rgba(var(--accent-solar-rgb), 0.05) 100%);
  border: 1px solid rgba(var(--accent-neon-rgb), 0.1);
  border-radius: 40px;
}
</style>
