<template>
  <div class="login-wrapper font-inter overflow-hidden relative min-h-screen flex items-center justify-center bg-background">
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -right-[5%] w-[820px] h-[820px] bg-accent-neon/10 rounded-full blur-[160px] animate-pulse-slow"></div>
      <div class="absolute -bottom-[10%] -left-[5%] w-[620px] h-[620px] bg-accent-solar/5 rounded-full blur-[140px] animate-pulse-slow delay-1000"></div>
    </div>

    <main class="relative z-10 w-full max-w-[1320px] px-6 py-8">
      <div class="grid items-stretch gap-8 lg:grid-cols-[1.12fr_0.88fr]">
        <section class="hidden lg:flex auth-feature-card p-10">
          <div class="relative z-10 flex h-full w-full flex-col">
            <button type="button" class="self-center transition-transform hover:scale-105" @click="$router.push('/')">
              <AppLogo :img-style="{ height: '7.3rem' }" img-class="w-auto object-contain mx-auto" />
            </button>
            <div class="mt-8 space-y-4 max-w-[44ch]">
              <p class="text-accent-neon text-xs uppercase tracking-[0.3em] font-black">Energia que da vida</p>
              <h1 class="text-5xl leading-[0.95] font-black text-on-surface font-lexend">Potencia tu operacion solar con control total.</h1>
              <p class="text-on-surface-variant text-lg leading-relaxed">Monitorea cursos, reportes y herramientas en un solo panel para avanzar mas rapido.</p>
            </div>
            <div class="mt-auto pt-8">
              <img src="https://thumbs.dreamstime.com/b/c%C3%A9lulas-solares-y-turbinas-de-viento-en-energ%C3%ADa-renovable-alternativa-de-la-central-el%C3%A9ctrica-de-la-naturaleza-97284345.jpg" alt="Paneles solares" class="h-[310px] w-full rounded-[2rem] object-cover border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]" />
            </div>
          </div>
        </section>

        <section class="flex flex-col items-center justify-center">
          <div class="text-center mb-8">
            <div class="inline-block cursor-pointer mb-6 transition-transform hover:scale-105 lg:hidden" @click="$router.push('/')">
              <AppLogo :img-style="{ height: '4rem' }" img-class="w-auto object-contain mx-auto" />
            </div>
            <h2 class="text-3xl font-black text-on-surface font-lexend tracking-tight uppercase">Bienvenido</h2>
            <p class="text-on-surface-variant text-sm mt-2 font-medium tracking-wide">Accede a tu panel de control</p>
          </div>

          <div class="w-full max-w-[540px] auth-form-card p-8 md:p-10">
            <form class="space-y-6" @submit.prevent="handleLogin">
              <div class="space-y-2">
                <label class="block text-[10px] font-black text-accent-neon uppercase tracking-[0.2em] ml-1">Correo corporativo</label>
                <div class="relative group">
                  <div class="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-accent-neon transition-all">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                  </div>
                  <input v-model="email" class="input-glass pl-14" placeholder="usuario@enervida.com" type="email" required />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-[10px] font-black text-accent-neon uppercase tracking-[0.2em] ml-1">Contrasena</label>
                <div class="relative group">
                  <div class="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-accent-neon transition-all">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V8a5 5 0 0 1 10 0v3"/></svg>
                  </div>
                  <input v-model="password" class="input-glass pl-14" placeholder="********" type="password" required />
                </div>
              </div>

              <div class="flex justify-end">
                <router-link to="/forgot-password" class="inline-flex items-center gap-2 text-xs text-accent-neon hover:text-accent-solar font-semibold transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.2 9a3 3 0 1 1 5.6 1.5c-.5.9-1.6 1.5-2.8 1.5v1"/><circle cx="12" cy="16.8" r=".8" fill="currentColor" stroke="none"/></svg>
                  Recuperar contrasena
                </router-link>
              </div>

              <div v-if="error" class="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl text-red-400 text-[11px] font-bold text-center animate-shake">{{ error }}</div>

              <button :disabled="loading" class="btn-premium btn-primary-neon w-full !py-4.5 !rounded-2xl" type="submit">
                <span v-if="!loading" class="flex items-center justify-center gap-2">Iniciar sesion</span>
                <span v-else class="flex items-center justify-center gap-3 font-black">Verificando...</span>
              </button>
            </form>

            <div class="relative my-8">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-on-surface/10"></div></div>
              <div class="relative flex justify-center text-[10px] font-bold text-on-surface-variant/70"><span class="bg-surface-card px-4 rounded-full">Tambien puedes entrar con Google</span></div>
            </div>

            <button type="button" @click="customGoogleLogin" :disabled="loading" class="w-full bg-white/5 border border-white/15 rounded-2xl py-4 px-6 flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-95">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" alt="Google" />
              <span class="text-on-surface font-bold text-xs uppercase tracking-widest">Continuar con Google</span>
            </button>

            <div class="mt-8 flex items-center justify-between gap-4">
              <p class="text-sm text-on-surface-variant">Soy nuevo</p>
              <router-link to="/register" class="inline-flex items-center gap-2 rounded-xl border border-accent-neon/50 text-accent-neon px-5 py-2.5 font-bold hover:bg-accent-neon/10 transition-colors">
                Crear cuenta
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              </router-link>
            </div>
          </div>
        </section>
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
import { useNotificationStore } from '@/stores/notificationStore'
import confetti from 'canvas-confetti'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const loading = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')

const triggerConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#06b6d4', '#0ea5a4', '#EAB308'],
    disableForReducedMotion: true
  })
}

const { login: customGoogleLogin } = useTokenClient({
  onSuccess: async (tokenResponse) => {
    loading.value = true
    try {
      const user = await authStore.googleLogin({ 
        access_token: tokenResponse.access_token 
      })
      
      triggerConfetti()
      notificationStore.addNotification({
        title: '¡Acceso Exitoso!',
        message: `Bienvenido de nuevo, ${user.nombre || 'estudiante'}.`,
        type: 'success'
      })

      if (user.rol?.nombre === 'admin') {
        router.push('/admin')
      } else {
        router.push('/student')
      }
    } catch (err) {
      console.error('Error google login:', err)
      const msg = err.response?.data?.message || 'Error al validar cuenta de Google'
      error.value = msg
      notificationStore.addNotification({
        title: 'Error de Autenticación',
        message: msg,
        type: 'error'
      })
    } finally {
      loading.value = false
    }
  },
  onError: () => {
    error.value = 'Error al iniciar sesión con Google'
    notificationStore.addNotification({
      title: 'Google Login',
      message: 'Se canceló o falló el inicio de sesión con Google.',
      type: 'error'
    })
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
    
    triggerConfetti()
    notificationStore.addNotification({
      title: '¡Bienvenido!',
      message: 'Has iniciado sesión correctamente.',
      type: 'success'
    })

    if (user.rol?.nombre === 'admin') {
      router.push('/admin')
    } else {
      router.push('/student')
    }
  } catch (err) {
    console.error('Error en login:', err)
    const msg = err.response?.data?.message || 'Credenciales inválidas o error de conexión'
    error.value = msg
    notificationStore.addNotification({
      title: 'Acceso Denegado',
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
.auth-feature-card {
  position: relative;
  overflow: hidden;
  border-radius: 2.75rem;
  border: 1px solid color-mix(in srgb, var(--on-surface) 12%, transparent);
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--surface-card) 92%, #16345f 8%),
    color-mix(in srgb, var(--surface-card) 86%, #102744 14%)
  );
  box-shadow: 0 28px 80px rgba(0,0,0,.32);
}

.auth-feature-card::before {
  content: '';
  position: absolute;
  inset: -20% auto auto -10%;
  width: 280px;
  height: 280px;
  background: rgba(16,255,157,.14);
  filter: blur(72px);
  border-radius: 999px;
}

.auth-feature-card::after {
  content: '';
  position: absolute;
  inset: auto -10% -16% auto;
  width: 280px;
  height: 280px;
  background: rgba(234,179,8,.12);
  filter: blur(72px);
  border-radius: 999px;
}

.auth-form-card {
  border-radius: 3rem;
  border: 1px solid color-mix(in srgb, var(--accent-neon) 55%, transparent);
  background: color-mix(in srgb, var(--surface-card) 95%, #0b1a30 5%);
  box-shadow: 0 22px 60px rgba(0,0,0,.28);
}
.auth-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  padding: .9rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.02);
}

.auth-switch-btn {
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  padding: .58rem .95rem;
  border-radius: .8rem;
  border: 1px solid rgba(16,255,157,.38);
  color: var(--accent-neon);
  font-weight: 700;
  background: transparent;
  transition: all .2s ease;
}

.auth-switch-btn:hover {
  background: rgba(16,255,157,.09);
}</style>











