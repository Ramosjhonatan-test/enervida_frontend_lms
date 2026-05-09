<template>
  <div class="max-w-[1200px] mx-auto">
    <div class="panel-hero p-6 sm:p-8 mb-8 md:mb-12">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 class="text-3xl md:text-5xl font-black text-on-surface font-lexend tracking-tighter">Gestión de <span class="text-accent-neon italic">Cursos</span></h2>
          <p class="text-on-surface/40 mt-2 font-light">Administra el catálogo de cursos, módulos y lecciones.</p>
        </div>
        <router-link to="/admin/cursos/nuevo" class="btn-premium btn-primary-neon !px-8">
          <span class="material-symbols-outlined text-sm">add</span>
          Nuevo Curso
        </router-link>
      </div>
    </div>

    <div class="glass-card p-4 sm:p-8 rounded-[32px] md:rounded-[40px] border-accent-neon/5">
       <div class="flex items-center justify-between mb-8">
          <div class="relative w-full md:w-96">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">search</span>
            <input type="text" v-model="searchQuery" placeholder="Buscar curso..." class="input-cyber !pl-12 w-full" />
          </div>
       </div>
       
       <div v-if="loading" class="text-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-neon mx-auto"></div>
          <p class="mt-4 text-on-surface/50">Cargando cursos...</p>
       </div>
       
       <div v-else-if="filteredCursos.length === 0" class="text-center py-20">
         <span class="material-symbols-outlined text-6xl text-on-surface/20 mb-4 block">menu_book</span>
         <h3 class="text-xl font-black text-on-surface tracking-tighter mb-2">No hay cursos encontrados</h3>
         <p class="text-sm text-on-surface/40">Ajusta tu búsqueda o crea tu primer curso.</p>
       </div>
       
       <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <div v-for="curso in filteredCursos" :key="curso.id" class="group glass-shell border border-on-surface/10 hover:border-accent-neon/30 rounded-3xl overflow-hidden transition-all duration-300">
           <div class="h-48 bg-on-surface/5 relative overflow-hidden">
             <img v-if="curso.miniatura_url" :src="getFileUrl(curso.miniatura_url)" alt="Miniatura" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
             <div v-else class="w-full h-full flex items-center justify-center bg-on-surface/5">
               <span class="material-symbols-outlined text-4xl text-on-surface/20">image</span>
             </div>
             <div class="absolute top-4 right-4 glass-shell px-3 py-1 rounded-full text-xs font-bold border border-on-surface/10">
               {{ curso.publicado ? 'Publicado' : 'Borrador' }}
             </div>
           </div>
           <div class="p-6">
             <h3 class="text-lg font-bold text-on-surface mb-2 line-clamp-2">{{ curso.titulo }}</h3>
             <p class="text-sm text-on-surface/60 mb-4 line-clamp-2">{{ curso.descripcion_corta || 'Sin descripción.' }}</p>
             <div class="flex items-center justify-between mt-auto pt-4 border-t border-on-surface/5">
               <span class="text-accent-neon font-bold">{{ curso.precio || '0.00' }} Bs</span>
               <div class="flex gap-2">
                 <router-link :to="'/admin/cursos/' + curso.id" class="p-2 bg-on-surface/5 hover:bg-accent-neon/10 hover:text-accent-neon rounded-xl transition-colors text-on-surface/60">
                   <span class="material-symbols-outlined text-sm">edit</span>
                 </router-link>
                 <button @click="deleteCurso(curso.id)" class="p-2 bg-on-surface/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors text-on-surface/60">
                   <span class="material-symbols-outlined text-sm">delete</span>
                 </button>
               </div>
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

const cursos = ref([]);
const loading = ref(true);
const searchQuery = ref('');

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
  if (confirm('¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.')) {
    try {
      await api.delete(`/cursos/${id}`);
      cursos.value = cursos.value.filter(c => c.id !== id);
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error al eliminar el curso. Verifica si tiene módulos o dependencias.');
    }
  }
};

const filteredCursos = computed(() => {
  if (!searchQuery.value) return cursos.value;
  const q = searchQuery.value.toLowerCase();
  return cursos.value.filter(c => c.titulo.toLowerCase().includes(q) || c.descripcion_corta?.toLowerCase().includes(q));
});

onMounted(() => {
  fetchCursos();
});
</script>

<style scoped>
</style>
