<template>
  <div class="min-h-screen admin-surface text-on-surface font-inter">
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[95] bg-background/75 backdrop-blur-xl lg:hidden"
        @click="isMobileMenuOpen = false"
      ></div>
    </transition>

    <nav class="fixed left-0 right-0 top-0 z-[100] !border-none bg-surface-glass/90 backdrop-blur-2xl">
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
          <div class="hidden rounded-2xl !border-none !bg-on-surface/[0.04] px-3 py-2 lg:flex lg:flex-col">
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
          <router-link to="/student/profile" class="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl !border-none !bg-on-surface/[0.04] text-sm font-black text-accent-neon" aria-label="Perfil">
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

      <!-- Drawer de menú móvil superior-izquierdo -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="-translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-x-full opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-y-0 left-0 z-[101] w-4/5 max-w-sm flex flex-col !border-none bg-background/95 shadow-2xl backdrop-blur-3xl lg:hidden"
        >
          <div class="flex items-center justify-between px-6 h-20 !border-none">
            <AppLogo :img-style="{ height: 'clamp(1.5rem, 3vw, 2.5rem)' }" img-class="w-auto object-contain" />
            <button
              type="button"
              class="admin-soft-hover grid h-10 w-10 place-items-center rounded-xl text-on-surface"
              @click="isMobileMenuOpen = false"
              aria-label="Cerrar menu"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
            <div class="mb-2 px-2">
              <p class="text-[10px] font-black uppercase tracking-[0.22em] text-on-surface/35">Menú Principal</p>
            </div>
            <router-link
              v-for="link in navLinks"
              :key="link.id"
              :to="link.to"
              :class="[
                'flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-black uppercase tracking-[0.18em] transition-all',
                isStudentRoute(link.to) ? 'bg-accent-neon text-primary shadow-neon-sm' : 'hover:bg-on-surface/5 text-on-surface/65'
              ]"
              @click="isMobileMenuOpen = false"
            >
              {{ link.text }}
            </router-link>
          </div>

          <div class="p-6 !border-none bg-on-surface/[0.02]">
            <div class="flex items-center gap-4 mb-6">
              <img
                v-if="profileImageUrl && !profileImageFailed"
                :src="profileImageUrl"
                class="h-12 w-12 rounded-full object-cover !border-none"
                @error="profileImageFailed = true"
              />
              <div v-else class="flex h-12 w-12 items-center justify-center rounded-full bg-accent-neon/10 text-accent-neon font-black">
                {{ userInitials }}
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black truncate max-w-[150px]">{{ authStore.user?.nombres || 'Estudiante' }}</span>
                <span class="text-[10px] font-bold text-on-surface/50 uppercase tracking-widest">Mi Cuenta</span>
              </div>
            </div>
            <div class="flex items-center justify-between gap-2">
              <router-link to="/student/profile" @click="isMobileMenuOpen = false" class="btn-premium flex-1 !rounded-xl !py-3 !text-[10px] !bg-on-surface/[0.04] !border-none text-center">
                Mi Perfil
              </router-link>
              <button @click="handleLogout" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-solar/10 text-accent-solar hover:bg-accent-solar/20 !border-none transition-all">
                <span class="material-symbols-outlined text-lg">logout</span>
              </button>
            </div>
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
      <div v-if="showCompleteProfile" class="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto">
        <div class="absolute inset-0 bg-background/80 backdrop-blur-xl" @click="showCompleteProfile = false"></div>
        <div class="glass-card-premium relative w-full max-w-4xl overflow-hidden rounded-3xl sm:rounded-[48px] !border-none p-5 sm:p-8 md:p-12 shadow-2xl my-auto">
          <div class="relative z-10">
            <div class="mb-6 sm:mb-10 text-center">
              <div class="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl !border-none bg-accent-neon/10 shadow-inner">
                <span class="material-symbols-outlined text-3xl sm:text-4xl text-accent-neon">verified_user</span>
              </div>
              <h2 class="font-lexend text-2xl sm:text-3xl font-black tracking-tight">Verificación de <span class="text-gradient-neon">identidad</span></h2>
              <p class="mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-black uppercase leading-relaxed tracking-[0.2em] text-on-surface-variant opacity-70">
                Confirma tus datos para la emisión de certificados oficiales.
              </p>
            </div>

            <form @submit.prevent="handleCompleteProfile">
              <div class="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <input v-model="profileForm.nombres" type="text" required placeholder="Nombres" class="input-cyber !bg-on-surface/[0.04] !border-none !rounded-2xl" />
                <input v-model="profileForm.apellidos" type="text" required placeholder="Apellidos" class="input-cyber !bg-on-surface/[0.04] !border-none !rounded-2xl" />
                <input :value="authStore.user?.correo" type="email" readonly class="input-cyber !bg-on-surface/[0.04] !border-none !rounded-2xl cursor-not-allowed opacity-50" />
                <input v-model="profileForm.ci" type="text" required placeholder="Cédula / DNI" class="input-cyber !bg-on-surface/[0.04] !border-none !rounded-2xl" />
                <input v-model="profileForm.telefono" type="text" required placeholder="WhatsApp / Celular" class="input-cyber !bg-on-surface/[0.04] !border-none !rounded-2xl" />
                <div class="relative">
                  <input v-model="profileForm.contrasena" :type="showPassword ? 'text' : 'password'" placeholder="Contraseña (Opcional)" class="input-cyber !bg-on-surface/[0.04] !border-none !rounded-2xl" />
                  <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface/30 hover:text-accent-neon">
                    <span class="material-symbols-outlined text-xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>

              <div class="flex flex-col gap-4 pt-2 sm:pt-4">
                <button type="submit" :disabled="savingProfile" class="btn-premium btn-primary-neon !w-full !py-4 sm:!py-5 !text-[11px] font-black uppercase tracking-widest shadow-neon-sm">
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
import { getFileUrl } from '@/config'
import { useAuthStore } from '@/stores/auth'
import AppLogo from '@/components/global/AppLogo.vue'
import ThemeToggle from '@/components/global/ThemeToggle.vue'
import NotificationDropdown from '@/components/global/NotificationDropdown.vue'
import { useModalStore } from '@/stores/modalStore'
import { useNotificationStore } from '@/stores/notificationStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const modalStore = useModalStore()
const notificationStore = useNotificationStore()

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
const availableCourses = computed(() => catalogCursos.value)
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

const profileImageUrl = computed(() => getFileUrl(
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
    notificationStore.addNotification({
      title: 'Error de Perfil',
      message: msg,
      type: 'error'
    })
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
    
    modalStore.openModal({
      title: '¡Solicitud Enviada!',
      message: 'Tu inscripción estará activa una vez confirmada por el administrador. Te avisaremos por correo.',
      confirmText: 'Entendido',
      type: 'success',
      onConfirm: () => {
        router.push('/student/dashboard')
      }
    })

    selectedCourseId.value = null
    await fetchStudentData()
  } catch (error) {
    console.error('Error enrolling in course:', error)
    const msg = error.response?.data?.message || 'Ya tienes una solicitud pendiente o ya estas inscrito en este curso.'
    notificationStore.addNotification({
      title: 'Inscripción Fallida',
      message: msg,
      type: 'error'
    })
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
