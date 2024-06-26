<template>
	<v-container fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<v-card class="elevation-12">
					<v-toolbar dark color="primary">
						<v-toolbar-title>Register</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-alert dense outlined type="error" v-if="error">
							<strong>{{ error.code }} </strong>
							{{
								typeof error.message === 'string'
									? error.message
									: (error.message.error && error.message.error.message) ||
									'Error'
							}}
						</v-alert>
						<v-form>
							<v-text-field
								prepend-icon="mdi-at"
								v-model="credentials.email"
								label="Email"
								:rules="rules.emailRules"
								autofocus
								placeholder="Your email"
								type="email"
								dark
								color="secondaryAlt"
							></v-text-field>
							<v-text-field
								prepend-icon="mdi-account"
								v-model="credentials.username"
								label="Username"
								:rules="[rules.required]"
								placeholder="Username for login"
								dark
								color="secondaryAlt"
							></v-text-field>
							<v-text-field
								prepend-icon="mdi-lock"
								v-model="credentials.password"
								label="Password"
								:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
								:type="show ? 'text' : 'password'"
								:rules="[rules.required]"
								@click:append="show = !show"
								placeholder=" "
								required
								dark
								color="secondaryAlt"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary lighten-2" @click="goLogin"
							>Back to login</v-btn
						>
						<v-spacer></v-spacer>
						<v-btn color="primary" @click="register">Register</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data: () => ({
		rules: {
			required: (value) => !!value || 'Required.',
			emailRules: [
				(v) => !!v || 'Email required.',
				(value) =>
					/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
						value
					) || 'Invlalid email',
			],
		},
		show: false,
		error: null,
		credentials: {
			email: '',
			username: '',
			password: '',
		},
	}),
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
	mounted() {
		if (this.user.name) {
			this.$router.push('/')
		}
	},
	methods: {
		register: async function() {
			try {
				this.validate()
				await this.$store.dispatch('user/register', this.credentials)

				this.$router.push('/')
			} catch (error) {
				console.log(error)
				this.error = error
			}
		},
		validate() {
			const emptyField = Object.keys(this.credentials).find(
				(k) => this.credentials[k] === ''
			)
			if (emptyField) {
				this.error = {
					code: 'Wait!',
					message: 'Enter valid credentials@' + emptyField,
				}
				throw this.error
			}
		},
		goLogin: function() {
			this.$router.push('/login')
		},
	},
	watch: {
		credentials() {
			this.error = null
		},
	},
}
</script>

<style></style>
