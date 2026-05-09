<template>
  <div class="login-wrapper font-inter overflow-hidden relative min-h-screen flex items-center justify-center bg-background">
    <!-- Premium Mesh Background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-accent-neon/10 rounded-full blur-[160px] animate-pulse-slow"></div>
      <div class="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] bg-accent-solar/5 rounded-full blur-[140px] animate-pulse-slow delay-1000"></div>
    </div>

    <main class="relative z-10 w-full max-w-[560px] px-6 py-12 flex flex-col items-center">
      <!-- Header -->
      <div class="text-center mb-8 animate-in fade-in slide-in-from-top duration-1000">
        <div class="inline-block cursor-pointer mb-6 transition-transform hover:scale-105 active:scale-95" @click="$router.push('/')">
          <AppLogo :img-style="{ height: '4rem' }" img-class="w-auto object-contain mx-auto" />
        </div>
        <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tight uppercase">Únete a Enervida</h2>
        <p class="text-on-surface-variant text-sm mt-2 font-medium tracking-wide">Comienza tu viaje en energía sostenible</p>
      </div>
 
      <!-- Glass Card -->
      <div class="w-full glass-card p-10 rounded-[3rem] shadow-2xl relative animate-in fade-in slide-in-from-bottom duration-1000 delay-200 overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <form class="space-y-6 relative z-10" @submit.prevent="handleRegister">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-[10px] font-black text-accent-neon uppercase tracking-[0.2em] ml-1">Nombre</label>
              <div class="relative group">
                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-accent-neon transition-all duration-300">
                  <span class="material-symbols-outlined text-xl">person</span>
                </div>
                <input v-model="form.nombres" class="input-glass pl-14" placeholder="Juan" type="text" required/>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-[10px] font-black text-accent-neon uppercase tracking-[0.2em] ml-1">Apellido</label>
              <div class="relative group">
                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-accent-neon transition-all duration-300">
                  <span class="material-symbols-outlined text-xl">badge</span>
                </div>
                <input v-model="form.apellidos" class="input-glass pl-14" placeholder="Pérez" type="text" required/>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-accent-neon uppercase tracking-[0.2em] ml-1">Email Corporativo</label>
            <div class="relative group">
              <div class="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-accent-neon transition-all duration-300">
                <span class="material-symbols-outlined text-xl">alternate_email</span>
              </div>
              <input v-model="form.correo" class="input-glass pl-14" placeholder="usuario@enervida.com" type="email" required/>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-accent-neon uppercase tracking-[0.2em] ml-1">Contraseña</label>
            <div class="relative group">
              <div class="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-accent-neon transition-all duration-300">
                <span class="material-symbols-outlined text-xl">lock_open</span>
              </div>
              <input v-model="form.contrasena_hash" class="input-glass pl-14" placeholder="••••••••" type="password" required/>
            </div>
          </div>

          <div v-if="error" class="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl text-red-400 text-[11px] font-bold text-center animate-shake">
            {{ error }}
          </div>

          <button :disabled="loading" class="btn-premium btn-primary-neon w-full !py-4.5 !rounded-2xl group overflow-hidden relative" type="submit">
            <!-- Shimmer effect when loading -->
            <div v-if="loading" class="shimmer-effect"></div>
            
            <span v-if="!loading" class="flex items-center gap-2 relative z-10">
              Crear Cuenta
              <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">person_add</span>
            </span>
            <span v-else class="flex items-center gap-2 relative z-10 font-black tracking-widest uppercase text-[11px]">
              <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-primary mr-2"></div>
              Procesando Registro...
            </span>
          </button>
        </form>

        <div class="relative my-10">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-on-surface/5"></div></div>
          <div class="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-black text-on-surface-variant/40">
            <span class="bg-surface-card px-4">Registro Social</span>
          </div>
        </div>

        <button 
          type="button"
          @click="customGoogleLogin"
          class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-95 group"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
          <span class="text-on-surface font-bold text-xs uppercase tracking-widest">Registrarse con Google</span>
        </button>

        <div class="text-center mt-10 pt-6 border-t border-on-surface/5">
          <p class="text-on-surface-variant text-[11px] font-medium tracking-wide">
            ¿Ya tienes una cuenta? 
            <router-link to="/login" class="text-accent-neon font-black hover:text-accent-solar transition-colors uppercase ml-1">Inicia Sesión</router-link>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AppLogo from '@/components/global/AppLogo.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notificationStore'
import { useTokenClient } from 'vue3-google-signin'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const loading = ref(false)
const error = ref('')

const form = reactive({
  nombres: '',
  apellidos: '',
  correo: '',
  contrasena_hash: ''
})

const { login: customGoogleLogin } = useTokenClient({
  onSuccess: async (tokenResponse) => {
    loading.value = true
    try {
      await authStore.googleLogin({ 
        access_token: tokenResponse.access_token 
      })
      notificationStore.addNotification({
        title: '¡Acceso Exitoso!',
        message: 'Bienvenido a Enervida. Tu cuenta de Google ha sido vinculada.',
        type: 'success'
      })
      router.push('/student')
    } catch (err) {
      console.error('Error google register:', err)
      const msg = err.response?.data?.message || 'Error al registrar con Google'
      error.value = msg
      notificationStore.addNotification({
        title: 'Error de Registro',
        message: msg,
        type: 'error'
      })
    } finally {
      loading.value = false
    }
  },
  onError: () => {
    error.value = 'Error al registrar con Google'
  }
})

const handleRegister = async () => {
  error.value = ''
  loading.value = true
  
  try {
    await authStore.register(form)
    notificationStore.addNotification({
      title: '¡Bienvenido, ' + form.nombres + '!',
      message: 'Tu cuenta ha sido creada exitosamente. Iniciando sesión...',
      type: 'success'
    })
    router.push('/student')
  } catch (err) {
    console.error('Error en registro:', err)
    const msg = err.response?.data?.message || 'Error al crear la cuenta'
    error.value = msg
    notificationStore.addNotification({
      title: 'Error en Registro',
      message: msg,
      type: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.input-glass {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.25rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: var(--on-surface);
    font-size: 0.875rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
}

.input-glass:focus {
    background-color: rgba(255, 255, 255, 0.07);
    border-color: var(--accent-neon);
    box-shadow: 0 0 20px rgba(16, 255, 157, 0.15);
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.15; transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
