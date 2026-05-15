<template>
  <div class="space-y-10 animate-fade-in">
    <!-- Header -->
    <div class="panel-hero p-6 sm:p-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tighter">Gestión de <span class="text-accent-neon ">Archivos</span></h2>
          <p class="text-on-surface/40 mt-1 text-xs font-bold uppercase tracking-widest">Administra los recursos multimedia (PDFs, Videos, Imágenes) del sistema</p>
        </div>
        <div class="flex gap-3">
          <button @click="fetchFiles" class="btn-premium glass-card gap-2 !py-4">
            <span class="material-symbols-outlined text-sm">refresh</span>
            Actualizar
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="glass-card p-6">
        <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Total Archivos</p>
        <p class="text-2xl font-black text-on-surface font-lexend mt-1">{{ files.length }}</p>
      </div>
      <div class="glass-card p-6 text-green-500">
        <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">En Uso</p>
        <p class="text-2xl font-black font-lexend mt-1">{{ files.filter(f => f.isUsed).length }}</p>
      </div>
      <div class="glass-card p-6 text-red-500">
        <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Sin Uso</p>
        <p class="text-2xl font-black font-lexend mt-1">{{ files.filter(f => !f.isUsed).length }}</p>
      </div>
      <div class="glass-card p-6">
        <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Espacio Total</p>
        <p class="text-2xl font-black text-on-surface font-lexend mt-1">{{ formatSize(totalSize) }}</p>
      </div>
    </div>

    <!-- Files Table -->
    <div class="glass-card-premium rounded-[40px] overflow-hidden">
      <!-- Search and Filter -->
      <div class="p-6 flex flex-col sm:flex-row gap-4 justify-between bg-on-surface/[0.02]">
        <div class="relative flex-1 max-w-md">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">search</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar por nombre..." 
            class="input-cyber w-full !pl-12"
          />
        </div>
        <div class="flex gap-2">
          <button 
            v-if="unusedFilesCount > 0"
            @click="deleteUnused" 
            class="btn-premium bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white !py-2 text-xs"
          >
            <span class="material-symbols-outlined text-sm">cleaning_services</span>
            Limpiar sin uso ({{ unusedFilesCount }})
          </button>
          <button 
            v-if="selectedFiles.length > 0"
            @click="deleteSelected" 
            class="btn-premium bg-red-500 text-white shadow-neon-sm !py-2 text-xs"
          >
            <span class="material-symbols-outlined text-sm">delete_sweep</span>
            Eliminar seleccionados ({{ selectedFiles.length }})
          </button>
          <select v-model="filterStatus" class="input-cyber min-w-[150px]">
            <option value="all">Todos los estados</option>
            <option value="used">En Uso</option>
            <option value="unused">Sin Uso</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px] text-left border-separate border-spacing-0">
          <thead>
            <tr class="bg-on-surface/[0.03]">
              <th class="p-6 w-10">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    :checked="isAllSelected" 
                    @change="toggleSelectAll"
                    class="w-4 h-4 rounded bg-on-surface/5 checked:bg-accent-neon accent-accent-neon cursor-pointer"
                  />
                </div>
              </th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Archivo</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Tipo</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Tamaño</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Fecha</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Estado</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in filteredFiles" :key="file.filename" class="group hover:bg-on-surface/[0.03] transition-colors" :class="{ 'bg-accent-neon/5': isSelected(file) }">
              <td class="p-6">
                <input 
                  type="checkbox" 
                  :checked="isSelected(file)" 
                  @change="toggleSelect(file)"
                  :disabled="file.isUsed"
                  class="w-4 h-4 rounded bg-on-surface/5 checked:bg-accent-neon accent-accent-neon cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                />
              </td>
              <td class="p-6">
                <div class="flex items-center gap-4">
                  <div 
                    class="w-12 h-12 rounded-xl bg-on-surface/5 flex items-center justify-center overflow-hidden cursor-pointer"
                    v-if="isImage(file.filename)"
                    @click="openPreview(file)"
                  >
                    <img :src="getFullUrl(file.url)" class="w-full h-full object-cover" />
                  </div>
                  <div 
                    class="w-12 h-12 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon shadow-neon-sm cursor-pointer"
                    v-else
                    @click="openPreview(file)"
                  >
                    <span class="material-symbols-outlined text-xl">{{ getFileIcon(file.filename) }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-black text-on-surface truncate max-w-[200px]">{{ file.filename }}</span>
                    <button @click="openPreview(file)" class="text-[10px] text-accent-neon font-bold hover:underline text-left">Ver recurso</button>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <span class="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{{ getExtension(file.filename) }}</span>
              </td>
              <td class="p-6">
                <span class="text-xs text-on-surface/60 font-mono">{{ formatSize(file.size) }}</span>
              </td>
              <td class="p-6">
                <span class="text-xs text-on-surface/60">{{ formatDate(file.createdAt) }}</span>
              </td>
              <td class="p-6">
                <div class="flex flex-col gap-1">
                  <div 
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit"
                    :class="file.isUsed ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="file.isUsed ? 'bg-green-500' : 'bg-red-500'"></span>
                    {{ file.isUsed ? 'En Uso' : 'Sin Uso' }}
                  </div>
                  
                  <div v-if="file.usages && file.usages.length > 0" class="flex flex-col gap-0.5 mt-1">
                    <div 
                      v-for="(usage, index) in file.usages" 
                      :key="index"
                      class="text-[9px] text-on-surface/40 flex items-center gap-1 leading-tight"
                    >
                      <span class="material-symbols-outlined text-[10px]">link</span>
                      <span class="font-bold text-accent-neon/60">{{ usage.type }}:</span>
                      <span class="truncate max-w-[120px]">{{ usage.name }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-6 text-right">
                <div class="flex justify-end gap-2">
                  <button 
                    @click="deleteFile(file)" 
                    class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-red-500/10 hover:text-red-500 transition-all" 
                    title="Eliminar"
                    :disabled="file.isUsed"
                    :class="{ 'opacity-20 cursor-not-allowed': file.isUsed }"
                  >
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredFiles.length === 0">
              <td colspan="6" class="p-20 text-center">
                <div class="flex flex-col items-center gap-4 text-on-surface/20">
                  <span class="material-symbols-outlined text-6xl">draft</span>
                  <p class="text-sm font-black uppercase tracking-widest">No se encontraron archivos</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Integrated Preview Overlay -->
    <transition name="fade">
      <div v-if="previewFile" class="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10">
        <div class="absolute inset-0 bg-background/90 backdrop-blur-2xl" @click="previewFile = null"></div>
        
        <div class="relative w-full max-w-6xl h-full flex flex-col glass-card-premium rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,255,242,0.1)] animate-scale-in">
          <!-- Preview Header -->
          <div class="p-6 flex items-center justify-between bg-on-surface/[0.02]">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon">
                <span class="material-symbols-outlined">{{ getFileIcon(previewFile.filename) }}</span>
              </div>
              <div>
                <h3 class="text-sm font-black text-on-surface truncate max-w-[300px]">{{ previewFile.filename }}</h3>
                <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{{ formatSize(previewFile.size) }} • {{ getExtension(previewFile.filename) }}</p>
              </div>
            </div>
            <button @click="previewFile = null" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-on-surface/10 hover:text-on-surface transition-all">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Preview Content -->
          <div class="flex-1 overflow-hidden bg-black/20 flex items-center justify-center p-4">
            <!-- Image Preview -->
            <img v-if="isImage(previewFile.filename)" :src="getFullUrl(previewFile.url)" class="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
            
            <!-- Video Preview -->
            <video v-else-if="isVideo(previewFile.filename)" controls class="max-w-full max-h-full rounded-xl shadow-2xl">
              <source :src="getFullUrl(previewFile.url)" :type="getMimeType(previewFile.filename)" />
              Tu navegador no soporta el tag de video.
            </video>

            <!-- PDF Preview -->
            <iframe v-else-if="isPDF(previewFile.filename)" :src="getFullUrl(previewFile.url)" class="w-full h-full rounded-xl" frameborder="0"></iframe>

            <!-- Unsupported / General -->
            <div v-else class="flex flex-col items-center gap-6 text-on-surface/40">
              <span class="material-symbols-outlined text-8xl">draft</span>
              <div class="text-center">
                <p class="text-lg font-black font-lexend text-on-surface mb-2">Vista previa no disponible</p>
                <p class="text-sm font-bold uppercase tracking-widest">Este tipo de archivo no puede previsualizarse directamente</p>
              </div>
              <a :href="getFullUrl(previewFile.url)" download class="btn-premium btn-primary-neon">Descargar Archivo</a>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-background/60 backdrop-blur-md z-[200] flex items-center justify-center">
      <div class="flex flex-col items-center gap-6">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-neon"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';
import { API_BASE_URL } from '@/config';
import { useNotificationStore } from '@/stores/notificationStore';
import { useModalStore } from '@/stores/modalStore';

const files = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const filterStatus = ref('all');
const previewFile = ref(null);
const selectedFiles = ref([]);
const notificationStore = useNotificationStore();
const modalStore = useModalStore();

const unusedFilesCount = computed(() => {
  return files.value.filter(f => !f.isUsed).length;
});

const isSelected = (file) => {
  return selectedFiles.value.some(f => f.filename === file.filename);
};

const toggleSelect = (file) => {
  if (file.isUsed) return;
  const index = selectedFiles.value.findIndex(f => f.filename === file.filename);
  if (index > -1) {
    selectedFiles.value.splice(index, 1);
  } else {
    selectedFiles.value.push(file);
  }
};

const isAllSelected = computed(() => {
  const selectable = filteredFiles.value.filter(f => !f.isUsed);
  return selectable.length > 0 && selectable.every(f => isSelected(f));
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedFiles.value = [];
  } else {
    const selectable = filteredFiles.value.filter(f => !f.isUsed);
    selectedFiles.value = [...selectable];
  }
};

const fetchFiles = async () => {
  loading.value = true;
  try {
    const res = await api.get('/uploads/admin/list');
    files.value = res.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    notificationStore.addNotification({
      title: 'Error de Servidor',
      message: 'No se pudo obtener la lista de archivos.',
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
};

const totalSize = computed(() => {
  return files.value.reduce((acc, f) => acc + f.size, 0);
});

const filteredFiles = computed(() => {
  return files.value.filter(f => {
    const matchesSearch = f.filename.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = filterStatus.value === 'all' || 
                         (filterStatus.value === 'used' && f.isUsed) || 
                         (filterStatus.value === 'unused' && !f.isUsed);
    return matchesSearch && matchesStatus;
  });
});

const formatSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const getExtension = (filename) => {
  return filename.split('.').pop().toUpperCase();
};

const isImage = (filename) => {
  if (!filename) return false;
  const ext = filename.split('.').pop().toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext);
};

const isVideo = (filename) => {
  if (!filename) return false;
  const ext = filename.split('.').pop().toLowerCase();
  return ['mp4', 'webm', 'ogg', 'mov'].includes(ext);
};

const isPDF = (filename) => {
  if (!filename) return false;
  const ext = filename.split('.').pop().toLowerCase();
  return ext === 'pdf';
};

const getMimeType = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const mimes = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'mov': 'video/quicktime'
  };
  return mimes[ext] || '';
};

const getFileIcon = (filename) => {
  if (!filename) return 'draft';
  const ext = filename.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'picture_as_pdf';
  if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) return 'movie';
  if (['zip', 'rar', '7z'].includes(ext)) return 'folder_zip';
  if (isImage(filename)) return 'image';
  return 'draft';
};

const getFullUrl = (url) => {
  if (!url) return '';
  const base = API_BASE_URL.replace('/api', '');
  return `${base}${url}`;
};

const openPreview = (file) => {
  previewFile.value = file;
};

const deleteFile = (file) => {
  if (file.isUsed) {
    notificationStore.addNotification({
      title: 'Acción Bloqueada',
      message: 'No se puede eliminar un archivo que está en uso.',
      type: 'warning'
    });
    return;
  }

  modalStore.openModal({
    title: '¿Eliminar Archivo?',
    message: `¿Estás seguro de que deseas eliminar "${file.filename}"? Esta acción liberará ${formatSize(file.size)} de espacio pero el archivo desaparecerá para siempre.`,
    confirmText: 'Sí, Eliminar',
    cancelText: 'Cancelar',
    type: 'danger',
    onConfirm: async () => {
      try {
        await api.delete(`/uploads/admin/${file.filename}`);
        notificationStore.addNotification({
          title: 'Archivo Eliminado',
          message: 'El recurso ha sido removido del servidor.',
          type: 'success'
        });
        await fetchFiles();
      } catch (error) {
        console.error('Error deleting file:', error);
        notificationStore.addNotification({
          title: 'Error',
          message: 'No se pudo eliminar el archivo.',
          type: 'error'
        });
      }
    }
  });
};

const deleteSelected = () => {
  if (selectedFiles.value.length === 0) return;

  const totalSelectedSize = selectedFiles.value.reduce((acc, f) => acc + f.size, 0);

  modalStore.openModal({
    title: '¿Eliminar seleccionados?',
    message: `¿Estás seguro de que deseas eliminar ${selectedFiles.value.length} archivos? Liberarás ${formatSize(totalSelectedSize)} de espacio.`,
    confirmText: 'Sí, Eliminar Todo',
    cancelText: 'Cancelar',
    type: 'danger',
    onConfirm: async () => {
      try {
        loading.value = true;
        const filenames = selectedFiles.value.map(f => f.filename);
        const res = await api.post('/uploads/admin/bulk-delete', { filenames });
        
        notificationStore.addNotification({
          title: 'Limpieza Completada',
          message: res.data.message,
          type: 'success'
        });
        
        selectedFiles.value = [];
        await fetchFiles();
      } catch (error) {
        console.error('Error bulk deleting files:', error);
        notificationStore.addNotification({
          title: 'Error',
          message: 'Ocurrió un problema al eliminar los archivos.',
          type: 'error'
        });
      } finally {
        loading.value = false;
      }
    }
  });
};

const deleteUnused = () => {
  const unusedFiles = files.value.filter(f => !f.isUsed);
  if (unusedFiles.length === 0) return;

  const totalUnusedSize = unusedFiles.reduce((acc, f) => acc + f.size, 0);

  modalStore.openModal({
    title: '¿Limpiar servidor?',
    message: `¿Deseas eliminar TODOS los archivos que no están en uso (${unusedFiles.length})? Liberarás ${formatSize(totalUnusedSize)} de espacio en disco.`,
    confirmText: 'Sí, Limpiar Todo',
    cancelText: 'Cancelar',
    type: 'danger',
    onConfirm: async () => {
      try {
        loading.value = true;
        const filenames = unusedFiles.map(f => f.filename);
        const res = await api.post('/uploads/admin/bulk-delete', { filenames });
        
        notificationStore.addNotification({
          title: 'Servidor Optimizado',
          message: res.data.message,
          type: 'success'
        });
        
        await fetchFiles();
      } catch (error) {
        console.error('Error cleaning unused files:', error);
        notificationStore.addNotification({
          title: 'Error',
          message: 'No se pudo completar la limpieza.',
          type: 'error'
        });
      } finally {
        loading.value = false;
      }
    }
  });
};

onMounted(() => {
  fetchFiles();
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
</style>
