<template>
	<v-app-bar app color="primary" dark>
		<v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
		<div class="d-flex align-center">
			<v-img
				alt="TECNM logo"
				class="tecnm-logo"
				contain
				src="../assets/tecnm.png"
				transition="scale-transition"
				height="48"
				width="80"
			/>
		</div>
		<v-app-bar-title class="ml-3">{{ title }}</v-app-bar-title>

		<v-spacer></v-spacer>
		<v-btn href="/login" target="_blank" text v-if="!user.name">
			<span class="mr-2">Iniciar sesión</span>
			<v-icon>mdi-login</v-icon>
		</v-btn>

		<v-btn @click="logout" target="_blank" text v-if="user.name" dense>
			<v-icon>mdi-logout</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	props: {
		title: String,
	},
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
	data: () => ({
	}),
}
</script>

<style scoped>
.tecnm-logo {
	opacity: 1;
	filter: invert(100%) sepia(5%) saturate(5%) hue-rotate(55deg) brightness(113%)
		contrast(100%);
}
</style>
