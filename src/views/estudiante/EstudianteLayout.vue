<template>
  <div class="min-h-screen admin-surface text-on-surface font-inter">
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[95] bg-background/75 backdrop-blur-xl lg:hidden"
        @click="isMobileMenuOpen = false"
      ></div>
    </transition>

    <nav class="fixed left-0 right-0 top-0 z-[100] border-b admin-line bg-surface-glass/90 backdrop-blur-2xl">
      <div class="flex h-20 items-center justify-between gap-3 px-4 md:px-8 xl:px-12">
        <div class="flex min-w-0 items-center gap-3 md:gap-10">
          <button
            type="button"
            class="admin-soft-hover grid h-11 w-11 place-items-center rounded-2xl text-on-surface lg:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            aria-label="Abrir menu del campus"
          >
            <span class="material-symbols-outlined">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
          </button>

          <router-link to="/student/dashboard" class="flex min-w-0 items-center gap-3">
            <AppLogo :img-style="{ height: 'clamp(2rem, 4vw, 3rem)' }" img-class="w-auto object-contain" />
          </router-link>

          <div class="hidden items-center gap-1 lg:flex">
            <router-link
              v-for="link in navLinks"
              :key="link.id"
              :to="link.to"
              custom
              v-slot="{ navigate, href, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[
                  'rounded-xl px-4 xl:px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-all',
                  isActive ? 'bg-accent-neon text-primary shadow-neon-sm' : 'text-on-surface/45 hover:bg-on-surface/5 hover:text-on-surface'
                ]"
              >
                {{ link.text }}
              </a>
            </router-link>
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-2 sm:gap-4">
          <div class="hidden flex-col items-end xl:flex">
            <span class="text-[9px] font-black uppercase tracking-widest text-on-surface/35">Estudiante</span>
            <span class="max-w-[160px] truncate text-xs font-bold">{{ authStore.user?.nombres || 'Mi cuenta' }}</span>
          </div>
          <div class="hidden rounded-2xl border admin-line admin-soft-bg px-3 py-2 lg:flex lg:flex-col">
            <span class="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface/30">Vista actual</span>
            <span class="text-[11px] font-black uppercase tracking-widest text-accent-neon">{{ currentNavLabel }}</span>
          </div>
          <div class="flex items-center gap-2 mr-2">  
            <ThemeToggle />
          </div>
          <div class="h-8 w-px bg-on-surface/5 mx-1 hidden sm:block"></div>
          <NotificationDropdown 
            :notifications="notifications" 
            @update="fetchStudentData" 
          />
          <router-link to="/student/support" class="flex h-10 w-10 items-center justify-center rounded-xl bg-on-surface/5 text-on-surface/45 transition hover:text-accent-neon" title="Soporte y ayuda">
            <span class="material-symbols-outlined text-xl">help</span>
          </router-link>
          <router-link to="/student/profile" class="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border admin-line admin-soft-bg text-sm font-black text-accent-neon" aria-label="Perfil">
            <img
              v-if="profileImageUrl && !profileImageFailed"
              :src="profileImageUrl"
              :alt="`Perfil de ${authStore.user?.nombres || 'estudiante'}`"
              referrerpolicy="no-referrer"
              class="h-full w-full object-cover"
              @error="profileImageFailed = true"
            />
            <span v-else>{{ userInitials }}</span>
          </router-link>
          <button @click="handleLogout" class="flex h-10 w-10 items-center justify-center rounded-xl bg-on-surface/5 text-on-surface/45 transition hover:text-accent-neon">
            <span class="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </div>

      <transition name="fade-slide">
        <div
          v-if="isMobileMenuOpen"
          class="border-t admin-line bg-background/95 px-4 pb-5 pt-4 shadow-2xl lg:hidden"
        >
          <div class="mb-4 rounded-[28px] border admin-line bg-on-surface/[0.03] p-4">
            <p class="text-[10px] font-black uppercase tracking-[0.22em] text-on-surface/35">Navegacion</p>
            <p class="mt-2 text-lg font-lexend font-black">{{ currentNavLabel }}</p>
          </div>

          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <router-link
              v-for="link in navLinks"
              :key="link.id"
              :to="link.to"
              :class="[
                'rounded-2xl px-4 py-4 text-sm font-black uppercase tracking-[0.18em] transition-all',
                isStudentRoute(link.to) ? 'bg-accent-neon text-primary shadow-neon-sm' : 'admin-soft-bg text-on-surface/65'
              ]"
              @click="isMobileMenuOpen = false"
            >
              {{ link.text }}
            </router-link>
          </div>
        </div>
      </transition>
    </nav>

    <main class="mx-auto max-w-[1600px] px-4 pb-12 pt-28 md:px-8 xl:px-12">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component 
            :is="Component"
            :inscripciones="inscripciones"
            :available-courses="availableCourses"
            :ultimo-curso="ultimoCurso"
            :live-classes="liveClasses"
            :notifications="notifications"
            :loading="loading"
            @enroll="enrollInCourse"
          />
        </transition>
      </router-view>
    </main>

    <transition name="fade-slide">
      <div v-if="showCompleteProfile" class="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
        <div class="absolute inset-0 bg-background/80 backdrop-blur-xl" @click="showCompleteProfile = false"></div>
        <div class="glass-card-premium relative w-full max-w-4xl overflow-hidden rounded-[48px] border-accent-neon/20 p-8 shadow-2xl md:p-12">
          <div class="relative z-10">
            <div class="mb-10 text-center">
              <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-accent-neon/20 bg-accent-neon/10 shadow-inner">
                <span class="material-symbols-outlined text-4xl text-accent-neon">verified_user</span>
              </div>
              <h2 class="font-lexend text-3xl font-black tracking-tight">Verificacion de <span class="text-gradient-neon">identidad</span></h2>
              <p class="mt-4 text-[11px] font-black uppercase leading-relaxed tracking-[0.2em] text-on-surface-variant opacity-70">
                Confirma tus datos para la emision de certificados oficiales.
              </p>
            </div>

            <form @submit.prevent="handleCompleteProfile">
              <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <input v-model="profileForm.nombres" type="text" required placeholder="Nombres" class="input-cyber !rounded-2xl" />
                <input v-model="profileForm.apellidos" type="text" required placeholder="Apellidos" class="input-cyber !rounded-2xl" />
                <input :value="authStore.user?.correo" type="email" readonly class="input-cyber !rounded-2xl cursor-not-allowed border-dashed opacity-50" />
                <input v-model="profileForm.ci" type="text" required placeholder="Cédula / DNI" class="input-cyber !rounded-2xl" />
                <input v-model="profileForm.telefono" type="text" required placeholder="WhatsApp / Celular" class="input-cyber !rounded-2xl" />
                <div class="relative">
                  <input v-model="profileForm.contrasena" :type="showPassword ? 'text' : 'password'" placeholder="Contraseña (Opcional)" class="input-cyber !rounded-2xl" />
                  <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface/30 hover:text-accent-neon">
                    <span class="material-symbols-outlined text-xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>

              <div class="flex flex-col gap-4 pt-4">
                <button type="submit" :disabled="savingProfile" class="btn-premium btn-primary-neon !w-full !py-5">
                  {{ savingProfile ? 'Procesando...' : 'Confirmar datos y solicitar' }}
                </button>
                <button type="button" @click="showCompleteProfile = false" class="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/25 transition hover:text-on-surface">Posponer solicitud</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import AppLogo from '@/components/global/AppLogo.vue'
import ThemeToggle from '@/components/global/ThemeToggle.vue'
import NotificationDropdown from '@/components/global/NotificationDropdown.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const inscripciones = ref([])
const catalogCursos = ref([])
const liveClasses = ref([])
const notifications = ref([])
const loading = ref(true)
const profileImageFailed = ref(false)
const isMobileMenuOpen = ref(false)
const showCompleteProfile = ref(false)
const savingProfile = ref(false)
const showPassword = ref(false)
const selectedCourseId = ref(null)
const profileForm = ref({
  nombres: '',
  apellidos: '',
  ci: '',
  telefono: '',
  contrasena: '',
})

const navLinks = [
  { text: 'Inicio', id: 'dashboard', to: '/student/dashboard' },
  { text: 'Catálogo', id: 'catalog', to: '/student/catalog' },
  { text: 'Mis Cursos', id: 'my-courses', to: '/student/my-courses' },
  { text: 'Laboratorios', id: 'labs', to: '/student/labs' },
  { text: 'Certificados', id: 'certificates', to: '/student/certificates' },
  { text: 'En Vivo', id: 'live-classes', to: '/student/live-classes' },
]

const enrolledCourseIds = computed(() => new Set(inscripciones.value.map((ins) => ins.curso_id || ins.curso?.id)))
const availableCourses = computed(() => catalogCursos.value.filter((curso) => !enrolledCourseIds.value.has(curso.id)))
const ultimoCurso = computed(() => {
  const activas = inscripciones.value.filter((ins) => ins.estado === 'ACTIVO' && ins.porcentaje_progreso < 100)
  return [...activas].sort((a, b) => (b.id || 0) - (a.id || 0))[0] || null
})

const userInitials = computed(() => {
  const nombres = authStore.user?.nombres || ''
  const apellidos = authStore.user?.apellidos || ''
  const initials = `${nombres.charAt(0)}${apellidos.charAt(0)}`.trim()
  return initials ? initials.toUpperCase() : 'ES'
})

const currentNavLabel = computed(() => {
  const current = navLinks.find((link) => isStudentRoute(link.to))
  return current?.text || 'Mi campus'
})

const profileImageUrl = computed(() => getProfileImageUrl(
  authStore.user?.imagen_perfil ||
  authStore.user?.foto ||
  authStore.user?.picture ||
  authStore.user?.avatar
))

watch(profileImageUrl, () => {
  profileImageFailed.value = false
})

watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

onMounted(() => {
  fetchStudentData()
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

function getImageUrl(url) {
  if (!url) return null
  const value = String(url).trim().replaceAll('\\', '/')
  if (!value) return null
  if (value.startsWith('http')) return value
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')
  const cleanUrl = value.startsWith('/') ? value : `/${value}`
  return `${baseUrl}${cleanUrl}`
}

function getProfileImageUrl(url) {
  if (!url) return null
  const value = String(url).trim().replaceAll('\\', '/')
  if (!value) return null
  if (value.startsWith('data:image')) return value
  if (value.startsWith('//')) return `https:${value}`
  if (value.startsWith('http')) return value
  return getImageUrl(value)
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : []
}

function isStudentRoute(path) {
  if (path === '/student/dashboard') return route.path === path
  return route.path.startsWith(path)
}

async function safeGet(endpoint) {
  try {
    const response = await api.get(endpoint)
    return normalizeArray(response.data)
  } catch (error) {
    console.warn(`No se pudo cargar ${endpoint}:`, error.response?.status || error.message)
    return []
  }
}

async function fetchStudentData() {
  loading.value = true
  try {
    const [insData, catData, liveData, notifData] = await Promise.all([
      safeGet('/inscripciones/me'),
      safeGet('/cursos/public'),
      safeGet('/clases-en-vivo'),
      safeGet('/notificaciones'),
    ])

    inscripciones.value = insData
    catalogCursos.value = catData
    liveClasses.value = liveData.filter((clase) => {
      const courseId = clase.curso_id || clase.curso?.id
      return !courseId || enrolledCourseIds.value.has(courseId)
    })
    notifications.value = notifData.filter((notif) => !notif.usuario_id || notif.usuario_id === authStore.user?.id || notif.usuario?.id === authStore.user?.id)
  } finally {
    loading.value = false
  }
}

function formatDate(value) {
  if (!value) return 'Sin fecha'
  return new Date(value).toLocaleDateString('es-BO', { day: '2-digit', month: 'short' })
}

function formatTime(value) {
  if (!value) return ''
  return new Date(value).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

async function handleCompleteProfile() {
  savingProfile.value = true
  try {
    const payload = {
      nombres: profileForm.value.nombres,
      apellidos: profileForm.value.apellidos,
      ci: String(profileForm.value.ci).trim(),
      telefono: String(profileForm.value.telefono).trim(),
    }
    
    // Solo enviar contraseña si el usuario escribió algo
    if (profileForm.value.contrasena) {
      payload.contrasena = profileForm.value.contrasena
    }

    const response = await api.patch('/usuarios/profile', payload)
    
    // Actualizar el store usando la acción centralizada
    await authStore.updateUser({
      ...response.data,
      hasPassword: !!payload.contrasena || authStore.user?.hasPassword
    })
    
    showCompleteProfile.value = false
    
    if (selectedCourseId.value) {
      await enrollInCourse(selectedCourseId.value)
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    const msg = error.response?.data?.message || 'Error al actualizar el perfil.'
    alert(msg)
  } finally {
    savingProfile.value = false
  }
}

async function enrollInCourse(cursoId) {
  // Si estamos en proceso de completar perfil, no hacemos nada más aquí
  if (showCompleteProfile.value && !selectedCourseId.value) return

  const needsInfo = !authStore.user?.ci || !authStore.user?.telefono
  if (needsInfo && !selectedCourseId.value) {
    selectedCourseId.value = cursoId
    profileForm.value.nombres = authStore.user?.nombres || ''
    profileForm.value.apellidos = authStore.user?.apellidos || ''
    profileForm.value.ci = authStore.user?.ci || ''
    profileForm.value.telefono = authStore.user?.telefono || ''
    profileForm.value.contrasena = ''
    showCompleteProfile.value = true
    return
  }

  try {
    await api.post('/inscripciones', {
      usuario_id: authStore.user.id,
      curso_id: cursoId,
    })
    alert('Solicitud enviada. Tu inscripcion estara activa una vez confirmada por el administrador.')
    selectedCourseId.value = null
    await fetchStudentData()
    router.push('/student/dashboard')
  } catch (error) {
    console.error('Error enrolling in course:', error)
    alert(error.response?.data?.message || 'Ya tienes una solicitud pendiente o ya estas inscrito en este curso.')
    selectedCourseId.value = null
  }
}
</script>

<style scoped>
.panel-hero {
  background:
    radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent-neon) 12%, transparent 88%) 0%, transparent 36%),
    linear-gradient(135deg, color-mix(in srgb, var(--surface-container) 94%, transparent 6%) 0%, color-mix(in srgb, var(--background) 82%, var(--surface-container) 18%) 100%);
  box-shadow: 0 30px 60px -30px var(--clay-shadow-dark);
}
</style>
