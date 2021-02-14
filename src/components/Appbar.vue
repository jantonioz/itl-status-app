<template>
	<v-app-bar app color="primary" dark dense>
		<v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

		<v-row justify="start">
			<v-app-bar-title class="ml-5 text-center" style="overflow:unset" dense>
				{{ title }}
			</v-app-bar-title>
		</v-row>

		<v-spacer></v-spacer>

		<AppbarMenuAccount />

		<v-btn href="/login" target="_blank" text v-if="!user.username">
			<span class="mr-2">Iniciar sesión</span>
			<v-icon>mdi-login</v-icon>
		</v-btn>

		<v-btn @click="logout" target="_blank" text v-if="user.username" dense>
			<v-icon>mdi-logout</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import AppbarMenuAccount from './AppbarMenuAccount'

export default {
	components: {
		AppbarMenuAccount,
	},
	props: {
		title: String,
	},
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
	data: () => ({}),
	methods: {
		toggleDrawer() {
			return true
		},
		logout() {
			this.$store.dispatch('user/logout')
		},
	},
}
</script>

<style scoped>
.tecnm-logo {
	opacity: 1;
	filter: invert(100%) sepia(5%) saturate(5%) hue-rotate(55deg) brightness(113%)
		contrast(100%);
}
.v-app-bar-title__content {
	overflow: unset;
}
</style>
