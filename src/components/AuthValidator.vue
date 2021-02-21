<template>
	<div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { routes } from '../router/routes'

export default {
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
	watch: {
		user(user) {
			this.checkUser(user)
		},
	},
	methods: {
		checkUser(user) {
			// console.log('checkUser', user)
			const isOnKnownRoute = this.validateRoute(this.$route.path)

			if (user && !user.username && this.$route.path.indexOf('/login') === -1) {
				this.$router.push('/login')
			}

			if (!isOnKnownRoute && this.$route.path.indexOf('/login') === -1) {
				this.$router.push('/login')
			}
		},
		validateRoute(path) {
			if (!path || typeof path !== 'string' || path.length <= 0) return false
			const normalPath = path.replace(/\//gi, '')
			if (path === '/') return true
			const route = routes.find((route) => normalPath.indexOf(route) >= 0)
			return route
		},
	},
	mounted() {
		if (
			this.user &&
			!this.user.username &&
			this.$route.path.indexOf('/login') === -1
		) {
			this.$router.push('/login')
		} else this.checkUser(this.user)
	},
	created() {
		this.checkUser(this.user)
	},
}
</script>

<style></style>
