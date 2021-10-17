import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresVisitor: false,
      title: 'Login into account'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      requiresVisitor: false,
      title: 'Login into account'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      requiresVisitor: true,
      title: 'Create an account'
    }
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('../views/Verify.vue'),
    meta: {
      requiresVisitor: true,
      title: 'Verify your account'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresVisitor: true,
      title: 'Login into account'
    }
  },
  {
    path: '/reset-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
    meta: {
      requiresVisitor: true,
      title: 'Reset your password'
    }
  },
  {
    path: '/password-reset/token=:token',
    name: 'passwordResetForm',
    component: () => import('../views/passwordResetForm.vue'),
    meta: {
      requiresVisitor: true,
      title: 'Reset your password'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true,
      title: 'My Profile'
    }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('../views/ChangePassword.vue'),
    meta: {
      requiresAuth: true,
      title: 'Change Password'
    }
  },
  {
    path: '/update-username',
    name: 'UpdateUsername',
    component: () => import('../views/UpdateUsername.vue'),
    meta: {
      requiresAuth: true,
      title: 'Update Username'
    }
  },
  {
    path: '/update-email',
    name: 'UpdateEmail',
    component: () => import('../views/UpdateEmail.vue'),
    meta: {
      requiresAuth: true,
      title: 'Edit Email Address'
    }
  },
  {
    // path: '*',
    path: '/:catchAll(.*)',
    component: () => import('../views/404.vue'),
    name: 'NotFound',
    meta: {
      title: 'Page not found | Kajoro.com'
    }
  }
]

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: 'history',
  scrollBehavior () {
    window.scrollTo(0, 0)
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'Login'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'Profile'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
