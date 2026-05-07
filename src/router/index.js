import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/AdminView.vue'
import StudentView from '../views/StudentView.vue'
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
      component: AdminView,
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
      component: StudentView,
      meta: { requiresAuth: true, role: 'estudiante' }, // Student
      children: [
        {
          path: '',
          redirect: '/student/dashboard'
        },
        {
          path: 'dashboard',
          name: 'student-dashboard',
          component: () => import('../views/student/StudentEscritorio.vue')
        },
        {
          path: 'catalog',
          name: 'student-catalog',
          component: () => import('../views/student/StudentCatalogo.vue')
        },
        {
          path: 'my-courses',
          name: 'student-my-courses',
          component: () => import('../views/student/StudentMisCursos.vue')
        },
        {
          path: 'labs',
          name: 'student-labs',
          component: () => import('../views/student/StudentLaboratorios.vue')
        },
        {
          path: 'certificates',
          name: 'student-certificates',
          component: () => import('../views/student/StudentCertificados.vue')
        },
        {
          path: 'live-classes',
          name: 'student-live-classes',
          component: () => import('../views/student/StudentClasesVivo.vue')
        },
        {
          path: 'profile',
          name: 'student-profile',
          component: () => import('../views/student/StudentPerfil.vue')
        },
        {
          path: 'support',
          name: 'student-support',
          component: () => import('../views/student/StudentSoporte.vue')
        }
      ]
    },
    {
      path: '/student/course/:id',
      name: 'course-player',
      component: () => import('../views/CoursePlayerView.vue'),
      meta: { requiresAuth: true, role: 'estudiante' },
      props: true
    },
    {
      path: '/student/exam/:id',
      name: 'exam-player',
      component: () => import('../views/ExamView.vue'),
      meta: { requiresAuth: true, role: 'estudiante' },
      props: true
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
      meta: { guest: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/ResetPasswordView.vue'),
      meta: { guest: true }
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('../views/VerifyEmailView.vue'),
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
