<template>
  <div class="login-wrapper font-inter overflow-hidden relative min-h-screen flex items-center justify-center bg-background">
    <!-- Premium Mesh Background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-accent-neon/10 rounded-full blur-[160px] animate-pulse-slow"></div>
      <div class="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] bg-accent-solar/5 rounded-full blur-[140px] animate-pulse-slow delay-1000"></div>
    </div>

    <main class="relative z-10 w-full max-w-[480px] px-6 py-12 flex flex-col items-center">
      <!-- Header -->
      <div class="text-center mb-8 animate-in fade-in slide-in-from-top duration-1000">
        <div class="inline-block cursor-pointer mb-6 transition-transform hover:scale-105 active:scale-95" @click="$router.push('/')">
          <AppLogo :img-style="{ height: '4rem' }" img-class="w-auto object-contain mx-auto" />
        </div>
        <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tight uppercase">Bienvenido</h2>
        <p class="text-on-surface-variant text-sm mt-2 font-medium tracking-wide">Accede a tu panel de control</p>
      </div>
 
      <!-- Glass Card -->
      <div class="w-full glass-card p-10 rounded-[3rem] shadow-2xl relative animate-in fade-in slide-in-from-bottom duration-1000 delay-200 overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <form class="space-y-6 relative z-10" @submit.prevent="handleLogin">
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-accent-neon uppercase tracking-[0.2em] ml-1">Email Corporativo</label>
            <div class="relative group">
              <div class="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-accent-neon transition-all duration-300">
                <span class="material-symbols-outlined text-xl">alternate_email</span>
              </div>
              <input 
                v-model="email" 
                class="input-glass pl-14" 
                placeholder="usuario@enervida.com" 
                type="email" 
                required
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between items-center px-1">
              <label class="block text-[10px] font-black text-accent-neon uppercase tracking-[0.2em]">Contraseña</label>
              <router-link to="/forgot-password" class="text-[9px] text-on-surface-variant hover:text-accent-solar transition-colors font-black tracking-widest uppercase">¿Olvidaste tu clave?</router-link>
            </div>
            <div class="relative group">
              <div class="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-accent-neon transition-all duration-300">
                <span class="material-symbols-outlined text-xl">lock_open</span>
              </div>
              <input 
                v-model="password" 
                class="input-glass pl-14" 
                placeholder="••••••••" 
                type="password" 
                required
              />
            </div>
          </div>

          <div v-if="error" class="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl text-red-400 text-[11px] font-bold text-center animate-shake">
            {{ error }}
          </div>

          <button :disabled="loading" class="btn-premium btn-primary-neon w-full !py-4.5 !rounded-2xl group overflow-hidden relative" type="submit">
            <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span v-if="!loading" class="flex items-center gap-2 relative z-10">
              Iniciar Sesión
              <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </span>
            <span v-else class="flex items-center gap-2 relative z-10">
              <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Autenticando...
            </span>
          </button>
        </form>

        <div class="relative my-10">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-on-surface/5"></div></div>
          <div class="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-black text-on-surface-variant/40">
            <span class="bg-surface-card px-4">Entrada Social</span>
          </div>
        </div>

        <button 
          type="button"
          @click="customGoogleLogin"
          class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-95 group"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
          <span class="text-on-surface font-bold text-xs uppercase tracking-widest">Continuar con Google</span>
        </button>

        <div class="text-center mt-10 pt-6 border-t border-on-surface/5">
          <p class="text-on-surface-variant text-[11px] font-medium tracking-wide">
            ¿Aún no tienes acceso? 
            <router-link to="/register" class="text-accent-neon font-black hover:text-accent-solar transition-colors uppercase ml-1">Crea una cuenta</router-link>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppLogo from '@/components/global/AppLogo.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTokenClient } from 'vue3-google-signin'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')

const { login: customGoogleLogin } = useTokenClient({
  onSuccess: async (tokenResponse) => {
    loading.value = true
    try {
      const user = await authStore.googleLogin({ 
        access_token: tokenResponse.access_token 
      })
      
      if (user.rol?.nombre === 'admin') {
        router.push('/admin')
      } else {
        router.push('/student')
      }
    } catch (err) {
      console.error('Error google login:', err)
      error.value = err.response?.data?.message || 'Error al validar cuenta de Google'
    } finally {
      loading.value = false
    }
  },
  onError: () => {
    error.value = 'Error al iniciar sesión con Google'
  }
})

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  
  try {
    const user = await authStore.login({
      correo: email.value,
      contrasena: password.value
    })
    
    if (user.rol?.nombre === 'admin') {
      router.push('/admin')
    } else {
      router.push('/student')
    }
  } catch (err) {
    console.error('Error en login:', err)
    error.value = err.response?.data?.message || 'Credenciales inválidas o error de conexión'
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
