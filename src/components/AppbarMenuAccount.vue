<template>
	<v-menu
		v-model="menu"
		:close-on-content-click="false"
		:nudge-width="200"
		offset-x
		class="mx-5"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				color="primary"
				dark
				v-bind="attrs"
				v-on="on"
				class="ml-5 menu-user"
				depressed
			>
				{{ user.username.split(' ')[0] }}
			</v-btn>
		</template>

		<v-card>
			<v-list>
				<v-list-item>
					<v-list-item-avatar>
						<v-avatar size="96" class="blue justify-start" dark>
							<span class="white--text ml-4">{{
								user.username
									.split(' ')
									.map((e) => e.toUpperCase().charAt(0))
									.join('')
							}}</span>
						</v-avatar>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ user.username }}</v-list-item-title>
						<v-list-item-subtitle
							>{{ user.username }} • {{ user.email }}</v-list-item-subtitle
						>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list rounded>
				<v-list-item-group color="blue lighten-3">
					<v-list-item @click.stop="goTo('/profile')">
						<v-list-item-icon>
							<v-icon>mdi-account</v-icon>
						</v-list-item-icon>
						<v-list-item-title> Profile </v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-select
							v-model="lang"
							:items="languages"
							menu-props="auto"
							label="Idioma"
							hide-details
							append-icon="mdi-web"
							single-line
							dense
							dark
							outlined
							color="secondaryAlt"
						>
						</v-select>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>
	</v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data: () => ({
		fav: true,
		menu: false,
		message: false,
		hints: true,
		lang: '',
	}),
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
		...mapGetters('lang', {
			language: 'getLanguage',
			languages: 'getLanguages',
		}),
	},
	methods: {
		goTo(url) {
			if (url !== this.$route.path) this.$router.push(url)
		},
	},
	watch: {
		language(language) {
			if (!this.lang) this.lang = language
		},
		lang(lang) {
			this.$store.dispatch('lang/setLanguage', lang)
		},
	},
	mounted() {
		if (!this.lang && this.language) this.lang = this.language
	},
}
</script>

<style>
.menu-user {
	width: 150px;
}
</style>
