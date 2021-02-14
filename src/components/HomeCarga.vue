<template>
	<div class="mt-10">
		<v-container>
			<v-row justify="center">
				<v-col cols="12">
					<v-row
						justify="center"
						class="d-flex justify-baseline align-content-end flex-wrap"
					>
						<v-col>
							<div class="text-h2 mb-2">Carga</div>
						</v-col>
						<v-col cols="1">
							<v-select
								v-model="language"
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
						</v-col>
					</v-row>
					<v-data-table
						:headers="headersTable"
						:items="cargaItems"
						:items-per-page="5"
						class="elevation-10"
						dark
					>
					</v-data-table>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import { headers } from '../constants/carga.lang'

export default {
	data: () => ({
		headersTable: [],
		cargaItems: [],
		language: 'ES',
		languages: ['EN', 'ES'],
	}),
	computed: {
		...mapGetters('user', {
			user: 'getUser',
			carga: 'getCarga',
		}),
	},
	methods: {
		mapSchedule(schedule) {
			const result = Object.keys(schedule).reduce(
				(acc, k) => ({
					...acc,
					[k]: `${schedule[k].from}-${schedule[k].to}/${schedule[k].room}`,
				}),
				{}
			)
			return result
		},
		parseCarga(carga) {
			return carga.map((c) => ({
				...c,
				key: c.subject.key,
				subject: c.subject.name,
				...this.mapSchedule(c.schedule),
			}))
		},
	},
	watch: {
		user(newUser) {
			if (newUser.username && !this.carga.length) {
				console.log(new Date().toISOString(), 'getStatus')
				this.$store.dispatch('user/getStatus', this.user)
			}
		},
		carga(newCarga) {
			if (newCarga.length) {
				this.headersTable = headers[this.language.toLowerCase()]

				this.cargaItems = this.parseCarga(newCarga)
			}
		},
		language(newLang) {
			if (this.carga.length) {
				this.headersTable = headers[newLang.toLowerCase()]

				this.cargaItems = this.parseCarga(this.carga)
			}
		},
	},
}
</script>

<style></style>
