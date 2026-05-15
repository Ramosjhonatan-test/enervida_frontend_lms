<template>
  <div class="mx-auto max-w-[1400px] space-y-8 text-on-surface pb-20">
    <!-- Hero Section -->
    <section 
      class="panel-hero overflow-hidden rounded-[40px] p-10 relative group"
      :class="{ 'animate-slide-up': mounted }"
    >
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-accent-neon/10 rounded-full blur-[120px] group-hover:bg-accent-neon/20 transition-all duration-1000"></div>
      <div class="absolute -left-32 -bottom-32 w-80 h-80 bg-violet-500/8 rounded-full blur-[100px]"></div>

      <div class="grid gap-10 xl:grid-cols-[1.25fr_0.75fr] xl:items-center relative z-10">
        <div>
          <div class="mb-6 flex flex-wrap items-center gap-4">
            <span class="px-4 py-1.5 rounded-full bg-accent-neon/20 text-accent-neon text-[10px] font-black uppercase tracking-[0.3em] animate-pulse-slow">
              SISTEMA ACTIVO
            </span>
            <span class="text-xs font-bold text-on-surface/40 flex items-center gap-2 italic">
              <span class="material-symbols-outlined text-sm">schedule</span>
              {{ currentTime }}
            </span>
          </div>
          <h2 class="font-lexend text-4xl md:text-6xl font-black tracking-tighter text-on-surface leading-none">
            Panel de <span class="text-accent-neon">Control</span>
          </h2>
          <p class="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-on-surface/60 font-medium italic">
            Monitorea inscripciones, cursos y rendimiento académico en tiempo real.
          </p>
        </div>

        <!-- Mini chart in hero -->
        <div class="glass-card-premium rounded-[32px] p-8 shadow-2xl relative overflow-hidden group/card !border-none">
          <div class="absolute inset-0 bg-gradient-to-br from-accent-neon/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
          <div class="mb-6 flex items-center justify-between relative z-10">
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40">Ingresos Totales</p>
              <p class="mt-2 text-4xl font-black text-accent-neon font-lexend tracking-tighter">
                {{ loading ? '...' : formatMoney(stats.totalVentas) }}
              </p>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-accent-neon/10 flex items-center justify-center text-accent-neon">
              <span class="material-symbols-outlined text-3xl">payments</span>
            </div>
          </div>
          <div class="grid h-28 grid-cols-12 items-end gap-2 relative z-10">
            <div v-for="(bar, index) in pulseBars" :key="index" class="rounded-t-xl overflow-hidden" :style="{ height: `${bar}%` }">
              <div class="h-full rounded-t-xl bg-gradient-to-t from-accent-neon/40 to-accent-neon opacity-60 group-hover/card:opacity-100 transition-all"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics Grid -->
    <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <article 
        v-for="(stat, i) in metricCards" :key="stat.title" 
        class="glass-card rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 group shadow-xl !border-none relative overflow-hidden"
        :class="{ 'animate-slide-up': mounted }"
        :style="{ animationDelay: `${(i + 1) * 100}ms` }"
      >
        <div class="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-3xl transition-colors" :class="stat.glow"></div>
        <div class="mb-8 flex items-start justify-between gap-4 relative z-10">
          <div class="grid h-14 w-14 place-items-center rounded-2xl transition-all duration-500" :class="stat.iconBg">
            <span class="material-symbols-outlined text-2xl">{{ stat.icon }}</span>
          </div>
          <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all" :class="stat.badgeBg">
            {{ stat.badge }}
          </span>
        </div>
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 mb-2 relative z-10">{{ stat.title }}</p>
        <h3 class="font-lexend text-3xl font-black tracking-tighter transition-colors relative z-10" :class="stat.valueColor">
          {{ loading ? '...' : stat.value }}
        </h3>
      </article>
    </section>

    <!-- Charts Row -->
    <section 
      class="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]"
      :class="{ 'animate-slide-up': mounted }"
      :style="{ animationDelay: '500ms' }"
    >
      <!-- Trend Line Chart -->
      <article class="glass-card-premium rounded-[40px] p-8 !border-none shadow-xl">
        <div class="mb-8 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 italic">Tendencia</p>
            <h3 class="mt-2 font-lexend text-2xl font-black tracking-tight">Inscripciones por Mes</h3>
          </div>
          <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <span class="material-symbols-outlined">trending_up</span>
          </div>
        </div>
        <div class="h-[280px] relative">
          <Line v-if="trendChartData" :data="trendChartData" :options="lineChartOptions" />
          <div v-else class="h-full flex items-center justify-center text-on-surface/20">
            <span class="material-symbols-outlined text-5xl animate-pulse">hourglass_empty</span>
          </div>
        </div>
      </article>

      <!-- Doughnut Chart - Top Courses -->
      <article class="glass-card-premium rounded-[40px] p-8 !border-none shadow-xl">
        <div class="mb-8 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400 italic">Popularidad</p>
            <h3 class="mt-2 font-lexend text-2xl font-black tracking-tight">Top Cursos</h3>
          </div>
          <div class="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
            <span class="material-symbols-outlined">donut_large</span>
          </div>
        </div>
        <div class="h-[280px] flex items-center justify-center">
          <Doughnut v-if="doughnutChartData" :data="doughnutChartData" :options="doughnutOptions" />
          <div v-else class="flex items-center justify-center text-on-surface/20">
            <span class="material-symbols-outlined text-5xl animate-pulse">hourglass_empty</span>
          </div>
        </div>
      </article>
    </section>

    <!-- Bottom Row: Priorities + Activity Feed -->
    <section 
      class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]"
      :class="{ 'animate-slide-up': mounted }"
      :style="{ animationDelay: '650ms' }"
    >
      <!-- Priorities -->
      <article class="glass-card-premium rounded-[40px] p-8 flex flex-col h-full !border-none shadow-xl">
        <div class="mb-8 flex items-center justify-between gap-4">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Resumen Rápido</p>
            <h3 class="mt-2 font-lexend text-2xl font-black tracking-tight">Estado del Sistema</h3>
          </div>
          <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <span class="material-symbols-outlined">dashboard_customize</span>
          </div>
        </div>

        <div class="space-y-4 flex-1">
          <div v-for="item in systemStatus" :key="item.title" class="group/item relative overflow-hidden rounded-[20px] bg-on-surface/[0.02] p-5 hover:bg-on-surface/[0.04] transition-all duration-300">
            <div class="absolute left-0 top-0 bottom-0 w-1 transition-all" :class="item.barColor"></div>
            <div class="flex items-center justify-between gap-4 relative z-10">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="item.iconBg">
                  <span class="material-symbols-outlined text-lg">{{ item.icon }}</span>
                </div>
                <div>
                  <p class="font-bold text-on-surface text-sm tracking-tight leading-none mb-1">{{ item.title }}</p>
                  <p class="text-xs text-on-surface/40 font-medium">{{ item.detail }}</p>
                </div>
              </div>
              <span class="font-lexend text-xl font-black tracking-tighter" :class="item.valueColor">
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>
      </article>

      <!-- Activity Feed -->
      <article class="glass-card-premium rounded-[40px] p-8 !border-none shadow-xl">
        <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 italic">En Vivo</p>
            <h3 class="mt-2 font-lexend text-2xl font-black tracking-tight leading-none">Actividad Reciente</h3>
          </div>
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <span class="material-symbols-outlined">bolt</span>
          </div>
        </div>

        <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scroll">
          <div v-if="loading" class="flex items-center justify-center py-10 text-on-surface/20">
            <span class="material-symbols-outlined text-4xl animate-pulse">hourglass_empty</span>
          </div>
          <div 
            v-else
            v-for="(activity, i) in (stats.activities || [])" :key="i" 
            class="group/act flex items-center gap-4 p-4 rounded-[18px] hover:bg-on-surface/[0.03] transition-all duration-300"
          >
            <div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500" :class="getActivityStyle(activity.type).bg">
              <span class="material-symbols-outlined text-lg" :class="getActivityStyle(activity.type).text">{{ activity.icon }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold text-on-surface text-sm tracking-tight truncate">{{ activity.title }}</p>
              <p class="text-xs text-on-surface/40 font-medium truncate">{{ activity.detail }}</p>
            </div>
            <div class="shrink-0 text-[10px] font-bold text-on-surface/30 uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="getActivityStyle(activity.type).dot"></span>
              {{ timeAgo(activity.time) }}
            </div>
          </div>
          <div v-if="!loading && (!stats.activities || stats.activities.length === 0)" class="text-center py-10 text-on-surface/30 text-sm italic">
            Sin actividad reciente
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { Line, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend } from 'chart.js'
import api from '@/services/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend)

const stats = ref({})
const topCourses = ref([])
const loading = ref(true)
const mounted = ref(false)
const currentTime = ref('')
let timeInterval = null

// Clock
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
}

const formatMoney = (val) => `${Number(val || 0).toLocaleString('es-BO', { minimumFractionDigits: 2 })} Bs`

const fetchData = async () => {
  loading.value = true
  try {
    const [dashRes, coursesRes] = await Promise.all([
      api.get('/reportes/dashboard'),
      api.get('/reportes/inscripciones-por-curso')
    ])
    stats.value = dashRes.data
    topCourses.value = coursesRes.data
  } catch (e) {
    console.error('Dashboard error:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 30000)
  fetchData()
  setTimeout(() => { mounted.value = true }, 50)
})

onUnmounted(() => { if (timeInterval) clearInterval(timeInterval) })

const pulseBars = [35, 42, 55, 48, 62, 58, 70, 65, 74, 80, 72, 88]

// Metric Cards
const metricCards = computed(() => [
  {
    title: 'Estudiantes', value: stats.value.totalEstudiantes || 0, icon: 'groups', badge: 'Comunidad',
    iconBg: 'bg-cyan-500/10 text-cyan-400', badgeBg: 'bg-cyan-500/10 text-cyan-400',
    glow: 'bg-cyan-500/5 group-hover:bg-cyan-500/10', valueColor: 'group-hover:text-cyan-400'
  },
  {
    title: 'Cursos Activos', value: stats.value.totalCursos || 0, icon: 'auto_stories', badge: 'Academia',
    iconBg: 'bg-violet-500/10 text-violet-400', badgeBg: 'bg-violet-500/10 text-violet-400',
    glow: 'bg-violet-500/5 group-hover:bg-violet-500/10', valueColor: 'group-hover:text-violet-400'
  },
  {
    title: 'Inscripciones', value: stats.value.totalInscripciones || 0, icon: 'how_to_reg', badge: 'Total',
    iconBg: 'bg-emerald-500/10 text-emerald-400', badgeBg: 'bg-emerald-500/10 text-emerald-400',
    glow: 'bg-emerald-500/5 group-hover:bg-emerald-500/10', valueColor: 'group-hover:text-emerald-400'
  },
  {
    title: 'Pendientes', value: stats.value.pendingInscriptions || 0, icon: 'pending_actions', badge: 'Atención',
    iconBg: 'bg-amber-500/10 text-amber-400', badgeBg: 'bg-amber-500/10 text-amber-400',
    glow: 'bg-amber-500/5 group-hover:bg-amber-500/10', valueColor: 'group-hover:text-amber-400'
  }
])

// Line Chart
const trendChartData = computed(() => {
  if (!stats.value.trend) return null
  return {
    labels: stats.value.trend.map(t => t.month),
    datasets: [{
      label: 'Inscripciones',
      data: stats.value.trend.map(t => t.count),
      borderColor: '#22d3ee',
      backgroundColor: (ctx) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280)
        g.addColorStop(0, 'rgba(34, 211, 238, 0.3)')
        g.addColorStop(1, 'rgba(34, 211, 238, 0.0)')
        return g
      },
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: '#22d3ee',
      pointBorderColor: '#0f172a',
      pointBorderWidth: 3,
      pointHoverRadius: 10,
      borderWidth: 3
    }]
  }
})

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15,23,42,0.9)',
      titleColor: '#22d3ee',
      bodyColor: '#e2e8f0',
      borderColor: 'rgba(34,211,238,0.3)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 14,
      titleFont: { size: 13, weight: 'bold' },
      bodyFont: { size: 12 },
      displayColors: false
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11, weight: 'bold' } }
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11 }, stepSize: 1 },
      beginAtZero: true
    }
  }
}

// Doughnut Chart
const chartColors = ['#22d3ee', '#a78bfa', '#34d399', '#fbbf24', '#f87171']

const doughnutChartData = computed(() => {
  if (!topCourses.value.length) return null
  return {
    labels: topCourses.value.map(c => c.titulo.length > 20 ? c.titulo.slice(0, 20) + '…' : c.titulo),
    datasets: [{
      data: topCourses.value.map(c => c._count.inscripciones),
      backgroundColor: chartColors,
      borderColor: 'rgba(15,23,42,0.8)',
      borderWidth: 4,
      hoverOffset: 8
    }]
  }
})

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: 'rgba(255,255,255,0.5)', font: { size: 11, weight: 'bold' }, padding: 16, usePointStyle: true, pointStyleWidth: 10 }
    },
    tooltip: {
      backgroundColor: 'rgba(15,23,42,0.9)',
      titleColor: '#a78bfa',
      bodyColor: '#e2e8f0',
      borderColor: 'rgba(167,139,250,0.3)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 14
    }
  }
}

// System Status
const systemStatus = computed(() => [
  {
    title: 'Cursos Publicados', detail: 'Total en plataforma', value: stats.value.totalCursos || 0, icon: 'school',
    barColor: 'bg-cyan-400', iconBg: 'bg-cyan-500/10 text-cyan-400', valueColor: 'text-cyan-400'
  },
  {
    title: 'Estudiantes Registrados', detail: 'Usuarios con rol estudiante', value: stats.value.totalEstudiantes || 0, icon: 'groups',
    barColor: 'bg-violet-400', iconBg: 'bg-violet-500/10 text-violet-400', valueColor: 'text-violet-400'
  },
  {
    title: 'Solicitudes Pendientes', detail: 'Requieren aprobación', value: stats.value.pendingInscriptions || 0, icon: 'pending',
    barColor: 'bg-amber-400', iconBg: 'bg-amber-500/10 text-amber-400', valueColor: 'text-amber-400'
  },
  {
    title: 'Ingresos Acumulados', detail: 'Suma total de cursos', value: formatMoney(stats.value.totalVentas), icon: 'account_balance',
    barColor: 'bg-emerald-400', iconBg: 'bg-emerald-500/10 text-emerald-400', valueColor: 'text-emerald-400'
  }
])

// Activity helpers
const activityStyles = {
  INSCRIPCION: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  REGISTRO: { bg: 'bg-violet-500/10', text: 'text-violet-400', dot: 'bg-violet-400' },
  CURSO_NUEVO: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  CERTIFICADO: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
  EVALUACION: { bg: 'bg-rose-500/10', text: 'text-rose-400', dot: 'bg-rose-400' },
}

const getActivityStyle = (type) => activityStyles[type] || activityStyles.REGISTRO

const timeAgo = (date) => {
  if (!date) return ''
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora'
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  return `${days}d`
}
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
.custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
</style>
