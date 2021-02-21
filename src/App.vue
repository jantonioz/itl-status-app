<template>
	<v-app>
		<Appbar title="Inicio" v-if="user.username" />
		<AppDrawer />

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Appbar from './components/Appbar'
import AppDrawer from './components/AppDrawer'

export default {
	name: 'App',

	components: {
		Appbar,
		AppDrawer
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
