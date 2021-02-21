import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import NotFound from '../pages/NotFound.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { requireAuth: true },
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { requireAuth: false },
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: { requireAuth: false },
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		meta: { requireAuth: true },
	},
	{
		path: '*',
		component: NotFound,
		meta: { requireAuth: true },
	},
]

const router = new VueRouter({
	routes,
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(rec => rec.meta.requireAuth)
  const authenticated = router.app.$store.getters['user/getUser'].username 
  if (requiresAuth && authenticated) {
    next()
  } else if (requiresAuth && !authenticated) {
    next('/login')
  } else if (!requiresAuth && authenticated) {
    next('/')
  } else if (!requiresAuth && !authenticated) {
    next()
  }
})

export default router
