<template>
	<v-app>
		<Appbar title="Inicio" v-if="user.name" />

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Appbar from './components/Appbar'

export default {
	name: 'App',

	components: {
		Appbar,
	},
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
	data: () => ({
		user: {},
	}),
}
</script>
