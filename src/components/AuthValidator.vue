<template>
	<div></div>
</template>

<script>
import { mapGetters } from 'vuex'
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
			console.log('checkUser', user)
			if (!user || !user.username) {
				this.$router.push('/login')
			} else if (this.$route.path.indexOf('login')) {
				this.$router.push('/')
			}
			console.log('checkUser', true, this.$route.path)
		},
	},
}
</script>

<style></style>
