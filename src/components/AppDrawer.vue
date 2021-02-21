<template>
	<div>
		<v-navigation-drawer
			permanent
			expand-on-hover
			fixed
			style="z-index: 999"
			v-if="user.username && !isMobile()"
		>
			<v-list>
				<v-list-item class="px-2">
					<v-list-item-avatar class="text-center">
						<v-avatar size="48" class="blue text-center" dark>
							<span class="white--text text-center text-h5 mr-2">{{
								user.username
									.split(' ')
									.map((e) => e.toUpperCase().charAt(0))
									.join('')
							}}</span>
						</v-avatar>
					</v-list-item-avatar>
				</v-list-item>

				<v-list-item link>
					<v-list-item-content>
						<v-list-item-title class="title">
							{{ user.username }}
						</v-list-item-title>
						<v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>

			<v-list nav dense>
				<v-list-item link @click="goHome">
					<v-list-item-icon>
						<v-icon>mdi-home</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Home</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="goProfile">
					<v-list-item-icon>
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Profile</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-bottom-navigation fixed v-if="user.username && isMobile()">
			<v-btn value="profile" @click="goProfile">
				<span>Profile</span>

				<v-icon>mdi-account</v-icon>
			</v-btn>

			<v-btn value="home" @click="goHome">
				<span>Home</span>

				<v-icon>mdi-home</v-icon>
			</v-btn>

			<v-btn value="logout" @click="logout">
				<span>Logout</span>

				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data: () => ({}),
	methods: {
		goHome() {
			this.$router.push('/')
		},
		goProfile() {
			this.$router.push('/profile')
		},
    logout() {
			this.$store.dispatch('user/logout')
			this.$router.push('/login')
		},
		isMobile() {
			var a = navigator.userAgent || navigator.vendor || window.opera
			if (
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
					a
				)
			)
				return true
		},
	},
	watch: {},
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
}
</script>

<style></style>
