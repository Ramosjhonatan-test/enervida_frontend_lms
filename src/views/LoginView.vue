<template>
  <div class="login-wrapper font-inter">
    <!-- Fondos Dinámicos -->
    <div class="absolute inset-0 bg-background"></div>
    <div class="absolute inset-0 cyber-mesh opacity-[0.15] dark:opacity-50"></div>
    <div class="absolute inset-0 hologram-grid opacity-[0.1] dark:opacity-30"></div>
    
    <!-- Partículas -->
    <div ref="particlesContainer" class="absolute inset-0 pointer-events-none z-10"></div>
 
    <!-- Luces de Ambiente -->
    <div class="absolute top-[-10%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary-container/20 rounded-full blur-[100px] md:blur-[140px] animate-pulse"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-tertiary-container/15 rounded-full blur-[100px] md:blur-[120px]"></div>
     <main class="relative z-20 w-full max-w-[480px] px-4 md:px-6 py-10 md:py-20 flex flex-col items-center">
      <!-- Header -->
      <div class="text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-top duration-700">
        <div class="inline-block relative cursor-pointer group mb-4" @click="$router.push('/')">
          <AppLogo img-class="h-16 md:h-24 w-auto object-contain mx-auto transition-all duration-500 group-hover:scale-105" />
        </div>
        <p class="text-on-surface-variant tracking-[0.5em] uppercase text-[10px] font-black opacity-80">Elite Renewable Education</p>
      </div>
 
      <!-- Card -->
      <div class="glass-card-premium w-full p-8 md:p-12 rounded-[48px] shadow-2xl relative overflow-hidden group/card border-accent-neon/10 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
        <div class="absolute inset-0 bg-gradient-to-br from-accent-neon/10 via-transparent to-accent-solar/5 opacity-50"></div>
        
        <div class="relative z-10">
          <div class="mb-8">
            <h2 class="text-3xl md:text-4xl font-black text-on-surface mb-2 font-lexend tracking-tight">Bienvenido</h2>
            <div class="h-1 w-12 bg-accent-neon rounded-full mb-4"></div>
            <p class="text-on-surface-variant text-sm font-medium opacity-80">Ingresa a la red de expertos en energía solar.</p>
          </div>
          
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div class="group/input space-y-2">
              <label class="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-accent-neon transition-colors">Email Corporativo</label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within/input:text-accent-neon transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <input v-model="email" class="input-cyber pl-12" placeholder="usuario@enervida.bo" type="email" required/>
              </div>
            </div>
            
            <div class="group/input space-y-2">
              <div class="flex justify-between items-center px-1">
                <label class="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] group-focus-within/input:text-accent-neon transition-colors">Contraseña</label>
                <router-link to="/forgot-password" class="text-[10px] text-accent-neon hover:text-on-surface-variant uppercase font-black tracking-widest transition-all hover:tracking-[0.3em]">¿Olvido clave?</router-link>
              </div>
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within/input:text-accent-neon transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <input v-model="password" class="input-cyber pl-12" placeholder="••••••••" type="password" required/>
              </div>
            </div>
 
            <div v-if="error" class="bg-error/10 border border-error/20 p-3 rounded-2xl text-error text-[10px] uppercase font-black tracking-widest text-center animate-in fade-in zoom-in duration-300">
              {{ error }}
            </div>
 
            <button :disabled="loading" class="btn-premium btn-primary-neon w-full py-5 mt-4 relative overflow-hidden group/btn" type="submit">
              <div v-if="loading" class="absolute inset-0 bg-white/20 animate-pulse"></div>
              <span v-if="!loading" class="relative z-10 flex items-center gap-2">
                Entrar al Portal
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
              <span v-else class="relative z-10 flex items-center gap-3 font-black">
                <svg class="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            </button>
          </form>
 
          <div class="flex items-center my-10 opacity-50">
            <div class="flex-1 h-[1px] bg-on-surface/20"></div>
            <span class="px-4 text-[9px] text-on-surface-variant font-black uppercase tracking-[0.3em]">Acceso Rápido</span>
            <div class="flex-1 h-[1px] bg-on-surface/20"></div>
          </div>
 
          <div class="flex flex-col items-center gap-6">
            <button 
              type="button"
              @click="customGoogleLogin"
              class="w-full bg-surface-container hover:bg-on-surface/5 border border-on-surface/10 rounded-2xl py-4 px-6 flex items-center justify-center gap-4 transition-all active:scale-95 hover:shadow-xl group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              <span class="text-on-surface font-black text-xs uppercase tracking-widest">Continuar con Google</span>
            </button>
          </div>
 
          <div class="text-center mt-10">
            <p class="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em]">
              ¿Nuevo en la academia? 
              <router-link to="/register" class="text-accent-neon hover:text-on-surface ml-2 underline underline-offset-4 decoration-accent-neon/30 transition-all">Empieza Aquí</router-link>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AppLogo from '@/components/AppLogo.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTokenClient } from 'vue3-google-signin'
import api from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()
const particlesContainer = ref(null)
const loading = ref(false)

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

const handleGoogleError = () => {
  error.value = 'Error al abrir ventana de Google o inicio de sesión cancelado'
}

const email = ref('')
const password = ref('')
const error = ref('')

onMounted(() => {
  if (particlesContainer.value) {
    for(let i=0; i<40; i++){
      const p = document.createElement('div');
      p.className = 'energy-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.opacity = Math.random() * 0.5;
      particlesContainer.value.appendChild(p);
    }
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
.login-wrapper {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
.cyber-mesh {
    background: radial-gradient(circle at 20% 30%, var(--accent-neon-dim, rgba(16, 255, 157, 0.1)) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, var(--accent-solar-dim, rgba(255, 215, 0, 0.05)) 0%, transparent 40%);
}

.hologram-grid {
    background-image: linear-gradient(var(--accent-neon-dim, rgba(16, 255, 157, 0.03)) 1px, transparent 1px),
                      linear-gradient(90deg, var(--accent-neon-dim, rgba(16, 255, 157, 0.03)) 1px, transparent 1px);
    background-size: 60px 60px;
}

.glass-card-premium {
    background: var(--glass-bg);
    backdrop-filter: blur(40px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-premium);
}



.input-cyber {
    width: 100%;
    background-color: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 1rem;
    padding: 1rem 1.5rem 1rem 3rem;
    color: var(--on-surface);
    font-size: 0.875rem;
    transition: all 0.3s ease;
    outline: none;
}
.input-cyber:focus {
    border-color: var(--accent-neon);
    box-shadow: 0 0 0 4px var(--accent-neon-dim, rgba(16, 255, 157, 0.1));
}

:deep(.energy-particle) {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--accent-neon);
    border-radius: 50%;
    filter: blur(1px);
    animation: float-particle 20s infinite linear;
}
@keyframes float-particle {
    0% { transform: translateY(110vh) scale(0); opacity: 0; }
    10% { opacity: 0.5; scale: 1; }
    90% { opacity: 0.5; scale: 1; }
    100% { transform: translateY(-10vh) scale(0); opacity: 0; }
}
</style>
