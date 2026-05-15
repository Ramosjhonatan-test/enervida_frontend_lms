<template>
  <div class="space-y-10 animate-fade-in text-on-surface">
    <!-- Header & Hero -->
    <div class="panel-hero p-10 relative overflow-hidden group rounded-[40px] border border-on-surface/5 bg-gradient-to-br from-on-surface/[0.03] to-transparent">
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-accent-neon/10 rounded-full blur-[100px] group-hover:bg-accent-neon/20 transition-all duration-1000"></div>
      <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>

      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div class="flex-1">
          <div class="flex items-center gap-4 mb-3">
            <div class="w-16 h-16 rounded-2xl bg-accent-neon/20 flex items-center justify-center text-accent-neon shadow-neon-sm animate-pulse-slow border border-accent-neon/30">
              <span class="material-symbols-outlined text-4xl">auto_stories</span>
            </div>
            <div>
              <h2 class="text-3xl md:text-5xl font-black text-on-surface font-lexend tracking-tighter leading-none">
                Gestión de <span class="text-accent-neon italic">Cursos</span>
              </h2>
              <p class="text-on-surface/50 text-xs font-bold uppercase tracking-[0.4em] mt-3 flex items-center gap-2">
                <span class="flex h-2 w-2 relative">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-neon opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-neon"></span>
                </span>
                ADMINISTRACIÓN DEL CATÁLOGO ACADÉMICO
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <div class="relative group">
            <span class="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/30 group-focus-within:text-accent-neon transition-all scale-110">search</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Buscar curso..." 
              class="input-cyber !pl-14 !py-4 !text-sm w-full md:w-80 transition-all"
            />
          </div>
          <router-link to="/admin/cursos/nuevo" class="btn-premium btn-primary-neon !py-4 px-8 group/btn relative overflow-hidden">
             <div class="absolute inset-0 bg-accent-neon/5 translate-y-full group-hover/btn:translate-y-0 transition-transform"></div>
             <span class="material-symbols-outlined text-lg relative">add</span>
             <span class="relative">Nuevo Curso</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-card rounded-[2.5rem] p-8 border-accent-neon/10 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-500">
        <div class="w-16 h-16 rounded-2xl bg-accent-neon/10 flex items-center justify-center text-accent-neon group-hover:shadow-neon-sm transition-all border border-accent-neon/5">
          <span class="material-symbols-outlined text-3xl">library_books</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-on-surface/40 uppercase tracking-widest mb-1">Total Cursos</p>
          <p class="text-4xl font-black text-on-surface font-lexend tracking-tight">{{ cursos.length }}</p>
        </div>
      </div>
      <div class="glass-card rounded-[2.5rem] p-8 border-accent-solar/10 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-500">
        <div class="w-16 h-16 rounded-2xl bg-accent-solar/10 flex items-center justify-center text-accent-solar group-hover:shadow-solar-sm transition-all border border-accent-solar/5">
          <span class="material-symbols-outlined text-3xl">visibility</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-on-surface/40 uppercase tracking-widest mb-1">Publicados</p>
          <p class="text-4xl font-black text-on-surface font-lexend tracking-tight">{{ cursos.filter(c => c.publicado).length }}</p>
        </div>
      </div>
      <div class="glass-card rounded-[2.5rem] p-8 border-on-surface/10 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-500">
        <div class="w-16 h-16 rounded-2xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 group-hover:bg-on-surface/10 transition-all border border-on-surface/5">
          <span class="material-symbols-outlined text-3xl">edit_note</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-on-surface/40 uppercase tracking-widest mb-1">En Borrador</p>
          <p class="text-4xl font-black text-on-surface font-lexend tracking-tight">{{ cursos.filter(c => !c.publicado).length }}</p>
        </div>
      </div>
    </div>

    <!-- Courses Grid -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-6">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-neon shadow-neon-sm"></div>
      <p class="text-[10px] font-black text-accent-neon uppercase tracking-[0.4em]">Sincronizando Catálogo...</p>
    </div>

    <div v-else-if="filteredCursos.length === 0" class="glass-card rounded-[40px] p-20 text-center border-on-surface/5">
      <span class="material-symbols-outlined text-7xl text-on-surface/10 mb-6 block">menu_book</span>
      <h3 class="text-2xl font-black text-on-surface tracking-tighter mb-2">No se encontraron cursos</h3>
      <p class="text-sm text-on-surface/40 max-w-xs mx-auto">Prueba ajustando tu búsqueda o agrega un nuevo curso al catálogo.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="curso in filteredCursos" :key="curso.id" class="group glass-shell border border-on-surface/5 hover:border-accent-neon/30 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col h-full bg-on-surface/[0.02]">
        <div class="h-56 bg-on-surface/5 relative overflow-hidden">
          <img 
            v-if="curso.miniatura_url" 
            :src="getFileUrl(curso.miniatura_url)" 
            alt="Miniatura" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-on-surface/5">
            <span class="material-symbols-outlined text-5xl text-on-surface/10">image</span>
          </div>
          
          <!-- Badges Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="absolute top-5 right-5 flex flex-col gap-2">
            <div :class="['px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md transition-all shadow-xl', 
              curso.publicado ? 'bg-accent-neon/20 border-accent-neon/40 text-accent-neon' : 'bg-on-surface/10 border-on-surface/20 text-on-surface/60']">
              {{ curso.publicado ? 'Publicado' : 'Borrador' }}
            </div>
          </div>
        </div>

        <div class="p-8 flex flex-col flex-1">
          <h3 class="text-xl font-black text-on-surface mb-3 line-clamp-2 leading-tight tracking-tight group-hover:text-accent-neon transition-colors">
            {{ curso.titulo }}
          </h3>
          <p class="text-sm text-on-surface/50 mb-6 line-clamp-2 leading-relaxed font-medium italic">
            {{ curso.descripcion_corta || 'Este curso aún no tiene una descripción corta definida.' }}
          </p>
          
          <div class="mt-auto pt-6 border-t border-on-surface/5 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-[9px] font-black text-on-surface/40 uppercase tracking-[0.2em] mb-1">Inversión</span>
              <span class="text-2xl font-black text-accent-neon font-lexend tracking-tight">
                {{ curso.precio || '0.00' }} <span class="text-xs">Bs</span>
              </span>
            </div>
            
            <div class="flex gap-2">
              <router-link 
                :to="'/admin/cursos/' + curso.id" 
                class="w-11 h-11 rounded-2xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-accent-neon/10 hover:text-accent-neon transition-all hover:shadow-neon-sm border border-transparent hover:border-accent-neon/20"
                title="Editar Curso"
              >
                <span class="material-symbols-outlined text-lg">edit</span>
              </router-link>
              <button 
                @click="deleteCurso(curso.id)" 
                class="w-11 h-11 rounded-2xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-red-500/10 hover:text-red-500 transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-transparent hover:border-red-500/20"
                title="Eliminar"
              >
                <span class="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';
import { getFileUrl } from '@/config';
import { useNotificationStore } from '@/stores/notificationStore';
import { useModalStore } from '@/stores/modalStore';

const cursos = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const notificationStore = useNotificationStore();
const modalStore = useModalStore();

const fetchCursos = async () => {
  loading.value = true;
  try {
    const response = await api.get('/cursos');
    cursos.value = response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  } finally {
    loading.value = false;
  }
};

const deleteCurso = async (id) => {
  modalStore.openModal({
    title: '¿Eliminar Curso?',
    message: 'Esta acción borrará el curso y todos sus contenidos relacionados permanentemente.',
    confirmText: 'Sí, Eliminar',
    type: 'danger',
    onConfirm: async () => {
      try {
        await api.delete(`/cursos/${id}`);
        cursos.value = cursos.value.filter(c => c.id !== id);
        notificationStore.addNotification({
          title: 'Curso Eliminado',
          message: 'El curso ha sido removido exitosamente.',
          type: 'success'
        });
      } catch (error) {
        console.error('Error deleting course:', error);
        notificationStore.addNotification({
          title: 'Error de Eliminación',
          message: 'Verifica si el curso tiene módulos o estudiantes inscritos.',
          type: 'error'
        });
      }
    }
  });
};

const filteredCursos = computed(() => {
  if (!searchQuery.value) return cursos.value;
  const q = searchQuery.value.toLowerCase();
  return cursos.value.filter(c => 
    c.titulo?.toLowerCase().includes(q) || 
    c.descripcion_corta?.toLowerCase().includes(q)
  );
});

onMounted(() => {
  fetchCursos();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.shadow-neon-sm {
  box-shadow: 0 0 20px -5px rgba(var(--accent-neon-rgb), 0.3);
}
</style>
