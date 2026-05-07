<template>
  <div class="space-y-10 animate-fade-in">
    <!-- Header -->
    <div class="panel-hero p-6 sm:p-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tighter">Gestión de <span class="text-accent-neon italic">Categorías</span></h2>
          <p class="text-on-surface/40 mt-1 text-xs font-bold uppercase tracking-widest">Organiza tus cursos por temáticas y áreas de conocimiento</p>
        </div>
        <button @click="toggleForm()" class="btn-premium btn-primary-neon !py-4 gap-2">
          <span class="material-symbols-outlined text-sm">{{ showForm ? 'close' : 'add_category' }}</span>
          {{ showForm ? 'Cancelar' : 'Nueva Categoría' }}
        </button>
      </div>
    </div>

    <!-- Inline Form Panel -->
    <transition name="slide-fade">
      <div v-if="showForm" class="glass-card p-6 sm:p-8 rounded-[32px] border-accent-neon/10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon">
            <span class="material-symbols-outlined text-sm">{{ isEditing ? 'edit' : 'add_category' }}</span>
          </div>
          <div>
            <h3 class="text-lg font-black text-on-surface font-lexend tracking-tighter">
              {{ isEditing ? 'Editar' : 'Nueva' }} <span class="text-accent-neon italic">Categoría</span>
            </h3>
            <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Completa los datos de la categoría</p>
          </div>
        </div>

        <form @submit.prevent="saveCategoria" class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1 space-y-2">
            <label class="text-[11px] font-black text-on-surface/40 uppercase tracking-widest ml-1">Nombre</label>
            <input type="text" v-model="form.nombre" required placeholder="Ej. Energías Renovables" class="input-cyber w-full" />
          </div>

          <div class="flex-[2] space-y-2">
            <label class="text-[11px] font-black text-on-surface/40 uppercase tracking-widest ml-1">Descripción</label>
            <input type="text" v-model="form.descripcion" placeholder="Breve descripción de la categoría..." class="input-cyber w-full" />
          </div>

          <div class="flex items-end gap-3 shrink-0">
            <button type="button" @click="showForm = false" class="btn-premium glass-shell justify-center !py-3.5 !px-6">Cancelar</button>
            <button type="submit" :disabled="saving" class="btn-premium btn-primary-neon justify-center !py-3.5 !px-8">
              <span v-if="saving" class="animate-spin rounded-full h-4 w-4 border-t-2 border-primary"></span>
              <span v-else>{{ isEditing ? 'Guardar' : 'Crear' }}</span>
            </button>
          </div>
        </form>
      </div>
    </transition>

    <!-- Categorias Table -->
    <div class="glass-card-premium rounded-[40px] overflow-hidden border-accent-neon/10">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr class="bg-on-surface/[0.03]">
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Nombre de Categoría</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest">Descripción</th>
              <th class="p-6 text-[10px] font-black text-on-surface/40 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-on-surface/[0.06]">
            <tr v-for="cat in categorias" :key="cat.id" class="group hover:bg-on-surface/[0.03] transition-colors">
              <td class="p-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon shadow-neon-sm">
                    <span class="material-symbols-outlined text-sm">category</span>
                  </div>
                  <span class="text-sm font-black text-on-surface">{{ cat.nombre }}</span>
                </div>
              </td>
              <td class="p-6">
                <p class="text-xs text-on-surface/60 line-clamp-1 max-w-md">{{ cat.descripcion || 'Sin descripción' }}</p>
              </td>
              <td class="p-6 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="openEdit(cat)" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-blue-500/10 hover:text-blue-500 transition-all" title="Editar">
                    <span class="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button @click="deleteCategoria(cat.id)" class="w-10 h-10 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/40 hover:bg-red-500/10 hover:text-red-500 transition-all" title="Eliminar">
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="categorias.length === 0">
              <td colspan="3" class="p-20 text-center">
                <div class="flex flex-col items-center gap-4 text-on-surface/20">
                  <span class="material-symbols-outlined text-6xl">category</span>
                  <p class="text-sm font-black uppercase tracking-widest">No hay categorías registradas</p>
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

const categorias = ref([]);
const loading = ref(true);
const saving = ref(false);
const showForm = ref(false);
const isEditing = ref(false);

const form = ref({
  id: null,
  nombre: '',
  descripcion: ''
});

const fetchCategorias = async () => {
  loading.value = true;
  try {
    const res = await api.get('/categorias');
    categorias.value = res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
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

const openEdit = (cat) => {
  isEditing.value = true;
  form.value = { ...cat };
  showForm.value = true;
};

const saveCategoria = async () => {
  saving.value = true;
  try {
    if (isEditing.value) {
      await api.patch(`/categorias/${form.value.id}`, form.value);
    } else {
      await api.post('/categorias', form.value);
    }
    showForm.value = false;
    await fetchCategorias();
  } catch (error) {
    console.error('Error saving category:', error);
    alert('Error al guardar la categoría.');
  } finally {
    saving.value = false;
  }
};

const deleteCategoria = async (id) => {
  if (!confirm('¿Estás seguro de eliminar esta categoría? Si tiene cursos asociados, podría haber errores.')) return;
  try {
    await api.delete(`/categorias/${id}`);
    await fetchCategorias();
  } catch (error) {
    console.error('Error deleting category:', error);
    alert('No se pudo eliminar la categoría. Verifique si tiene cursos asociados.');
  }
};

onMounted(() => {
  fetchCategorias();
});
</script>

<style scoped>
.slide-fade-enter-active { transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1); }
.slide-fade-leave-active { transition: all 0.2s ease-in; }
.slide-fade-enter-from { transform: translateY(-12px); opacity: 0; }
.slide-fade-leave-to { transform: translateY(-8px); opacity: 0; }
</style>
