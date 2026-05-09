import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/public/Inicio.vue'
import LoginView from '../views/auth/Acceso.vue'
import RegisterView from '../views/auth/Registro.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import EstudianteLayout from '../views/estudiante/EstudianteLayout.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, role: 'admin' }, // Admin
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/AdminDashboard.vue')
        },
        {
          path: 'solicitudes',
          name: 'admin-solicitudes',
          component: () => import('../views/admin/AdminSolicitudes.vue')
        },
        {
          path: 'cursos',
          name: 'admin-cursos',
          component: () => import('../views/admin/AdminCursos.vue')
        },
        {
          path: 'cursos/nuevo',
          name: 'admin-curso-nuevo',
          component: () => import('../views/admin/AdminCursoForm.vue')
        },
        {
          path: 'cursos/editar/:id',
          name: 'admin-curso-editar',
          component: () => import('../views/admin/AdminCursoForm.vue'),
          props: true
        },
        {
          path: 'cursos/:id',
          name: 'admin-curso-detalle',
          component: () => import('../views/admin/AdminCursoDetalle.vue'),
          props: true
        },
        {
          path: 'estudiantes',
          name: 'admin-estudiantes',
          component: () => import('../views/admin/AdminEstudiantes.vue')
        },
        {
          path: 'estudiantes/nuevo',
          name: 'admin-estudiante-nuevo',
          component: () => import('../views/admin/AdminEstudianteForm.vue')
        },
        {
          path: 'estudiantes/editar/:id',
          name: 'admin-estudiante-editar',
          component: () => import('../views/admin/AdminEstudianteForm.vue'),
          props: true
        },
        {
          path: 'estudiantes/:id',
          name: 'admin-estudiante-detalle',
          component: () => import('../views/admin/AdminEstudianteDetalle.vue'),
          props: true
        },
        {
          path: 'evaluaciones',
          name: 'admin-evaluaciones',
          component: () => import('../views/admin/AdminEvaluaciones.vue')
        },
        {
          path: 'evaluaciones/:id/preguntas',
          name: 'admin-preguntas',
          component: () => import('../views/admin/AdminPreguntas.vue'),
          props: true
        },
        {
          path: 'reportes',
          name: 'admin-reportes',
          component: () => import('../views/admin/AdminReportes.vue')
        },
        {
          path: 'auditoria',
          name: 'admin-auditoria',
          component: () => import('../views/admin/AdminAuditoria.vue')
        },
        {
          path: 'clases-en-vivo',
          name: 'admin-clases-en-vivo',
          component: () => import('../views/admin/AdminClasesVivo.vue')
        },
        {
          path: 'usuarios',
          name: 'admin-usuarios',
          component: () => import('../views/admin/AdminUsuarios.vue')
        },
        {
          path: 'categorias',
          name: 'admin-categorias',
          component: () => import('../views/admin/AdminCategorias.vue')
        },
        {
          path: 'roles',
          name: 'admin-roles',
          component: () => import('../views/admin/AdminRoles.vue')
        },
        {
          path: 'inscripciones',
          name: 'admin-inscripciones',
          component: () => import('../views/admin/AdminInscripciones.vue')
        },
        {
          path: 'notificaciones',
          name: 'admin-notificaciones',
          component: () => import('../views/admin/AdminNotificaciones.vue')
        },
        {
          path: 'dispositivos',
          name: 'admin-dispositivos',
          component: () => import('../views/admin/AdminDispositivos.vue')
        },
        {
          path: 'certificados',
          name: 'admin-certificados',
          component: () => import('../views/admin/AdminCertificados.vue')
        },
        {
          path: 'certificados/diseno/:cursoId',
          name: 'admin-certificado-editor',
          component: () => import('../views/admin/AdminCertificadoEditor.vue'),
          props: true
        }
      ]
    },
    {
      path: '/student',
      component: EstudianteLayout,
      meta: { requiresAuth: true, role: 'estudiante' }, // Student
      children: [
        {
          path: '',
          redirect: '/student/dashboard'
        },
        {
          path: 'dashboard',
          name: 'student-dashboard',
          component: () => import('../views/estudiante/EstudianteEscritorio.vue')
        },
        {
          path: 'catalog',
          name: 'student-catalog',
          component: () => import('../views/estudiante/EstudianteCatalogo.vue')
        },
        {
          path: 'my-courses',
          name: 'student-my-courses',
          component: () => import('../views/estudiante/EstudianteMisCursos.vue')
        },
        {
          path: 'labs',
          name: 'student-labs',
          component: () => import('../views/estudiante/EstudianteLaboratorios.vue')
        },
        {
          path: 'certificates',
          name: 'student-certificates',
          component: () => import('../views/estudiante/EstudianteCertificados.vue')
        },
        {
          path: 'live-classes',
          name: 'student-live-classes',
          component: () => import('../views/estudiante/EstudianteClasesVivo.vue')
        },
        {
          path: 'profile',
          name: 'student-profile',
          component: () => import('../views/estudiante/EstudiantePerfil.vue')
        },
        {
          path: 'support',
          name: 'student-support',
          component: () => import('../views/estudiante/EstudianteSoporte.vue')
        }
      ]
    },
    {
      path: '/student/course/:id',
      name: 'course-player',
      component: () => import('../views/estudiante/ReproductorCurso.vue'),
      meta: { requiresAuth: true, role: 'estudiante' },
      props: true
    },
    {
      path: '/student/exam/:id',
      name: 'exam-player',
      component: () => import('../views/estudiante/Evaluacion.vue'),
      meta: { requiresAuth: true, role: 'estudiante' },
      props: true
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/auth/RecuperarPassword.vue'),
      meta: { guest: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/auth/RestablecerPassword.vue'),
      meta: { guest: true }
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('../views/auth/VerificarEmail.vue'),
      meta: { guest: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const user = authStore.user

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next('/login');
    }

    if (to.meta.role && user.rol?.nombre !== to.meta.role) {
      return next(user.rol?.nombre === 'admin' ? '/admin' : '/student');
    }
  }

  if (to.meta.guest && isAuthenticated) {
    return next(user.rol?.nombre === 'admin' ? '/admin' : '/student');
  }

  next();
});

export default router
