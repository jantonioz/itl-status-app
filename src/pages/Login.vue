<template>
	<v-container fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<v-card class="elevation-12">
					<v-toolbar dark color="primary">
						<v-toolbar-title>Credentials</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-alert dense outlined type="error" v-if="error">
							<strong>{{ error.code }} </strong>
							{{
								typeof error.message === 'string'
									? error.message
									: (error.message.error && error.message.error.message) || 'Error'
							}}
						</v-alert>
						<v-form>
							<v-text-field
								prepend-icon="mdi-account"
								v-model="credentials.username"
								label="Login"
								:rules="[rules.required]"
							></v-text-field>
							<v-text-field
								prepend-icon="mdi-lock"
								v-model="credentials.password"
								label="Password"
								:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
								:type="show ? 'text' : 'password'"
								:rules="[rules.required]"
								@click:append="show = !show"
								required
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-btn
							class="ml-3 mb-3"
							color="blue--text"
							elevation="0"
							@click="register"
							>Register</v-btn
						>
						<v-spacer></v-spacer>
						<v-btn class="mr-3 mb-3" color="primary" @click="login"
							>Login</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
		<AuthValidation />
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthValidation from '../components/AuthValidator'

export default {
	components: {
		AuthValidation,
	},
	data: () => ({
		rules: {
			required: (value) => !!value || 'Required.',
		},
		show: false,
		error: null,
		credentials: {
			username: '',
			password: '',
		},
	}),
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
	methods: {
		login: async function() {
			try {
				const user = await this.$store.dispatch('user/login', this.credentials)
				console.log('login', user)
				await this.$store.dispatch('user/getStatus', user)
				this.$store.user = user
				this.$router.push('/')
			} catch (error) {
				// console.log(error)
				this.error = error
			}
		},
		register() {
			this.$router.push('/register')
		},
	},
	watch: {
		user(user) {
			if (user && user.username) {
				this.$router.push('/')
			}
		},
	},
}
</script>

<style></style>
