<template>
	<v-container class="d-flex justify-center mt-5" align-content="center">
		<v-row justify="center">
			<v-col v-if="!mobile"> </v-col>
			<v-col :cols="mobile ? '12' : '8'">
				<v-card outlined>
					<v-card-text>
						<v-row class="d-flex align-start">
							<v-col cols="2">
								<v-flex class="mt-4">
									<v-avatar size="96" class="mr-4 blue" dark>
										<span class="white--text text-h3">{{ avatar }}</span>
									</v-avatar>
								</v-flex>
							</v-col>
							<v-col>
								<v-text-field
									v-model="username"
									label="username"
									outlined
									color="secondaryAlt"
								></v-text-field>
								<v-text-field
									v-model="email"
									label="Email Address"
									outlined
									color="secondaryAlt"
								></v-text-field>
								<v-divider> </v-divider>
								<br />
								<v-text-field
									v-model="noControl"
									label="ITL No control"
									outlined
									color="secondaryAlt"
								>
									<template v-slot:append-outer="">
										<v-tooltip bottom>
											<template v-slot:activator="{ on, attrs }">
												<v-icon color="white" dark v-bind="attrs" v-on="on">
													mdi-information
												</v-icon>
											</template>
											<span>Tu número de control se encripta y se guarda</span>
										</v-tooltip>
									</template>
								</v-text-field>
								<v-text-field
									v-model="password"
									label="ITL password"
									outlined
									:type="show ? 'text' : 'password'"
									:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
									@click:append="show = !show"
									color="secondaryAlt"
								>
									<template v-slot:append-outer="">
										<v-tooltip bottom>
											<template v-slot:activator="{ on, attrs }">
												<v-icon color="white" dark v-bind="attrs" v-on="on">
													mdi-information
												</v-icon>
											</template>
											<span>Tu contraseña se encripta y se guarda</span>
										</v-tooltip>
									</template>
								</v-text-field>
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions class="d-flex justify-end">
						<v-btn
							class="mb-3 mr-3"
							color="primary"
							:loading="loading"
							@click.native="update"
						>
							<v-icon left dark>mdi-account-check</v-icon>
							Save Changes
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col v-if="!mobile"></v-col>
		</v-row>
		<AuthValidator />
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { isMobile, isTablet } from 'mobile-device-detect'

import AuthValidator from '../components/AuthValidator.vue'

export default {
	pageTitle: 'Perfil',
	components: { AuthValidator },
	data() {
		return {
			loading: false,
			avatar: '',
			birthday: new Date().toISOString().substring(0, 10),
			email: '',
			username: '',
			noControl: '',
			password: '',
			mobile: isMobile || isTablet,
			show: false,
		}
	},
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
	mounted() {
		if (this.user.username) {
			this.username = this.user.username
			this.email = this.user.email
			this.birthday = this.user.birthday
		}
	},
	watch: {
		username(p) {
			this.avatar = p
				.split(' ')
				.map((e) => e.toUpperCase().charAt(0))
				.join('')
		},
	},
	methods: {
		async update() {
			await this.$store.dispatch('user/update', {
				username: this.username,
				email: this.email,
				birthday: this.birthday,
				noControl: this.noControl,
				password: this.password,
				publicKey: this.user.publicKey,
				_id: this.user._id
			})
		},
	},
}
</script>
