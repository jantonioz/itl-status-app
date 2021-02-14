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
							<div class="text-h2 mb-2">Kardex</div>
						</v-col>
					</v-row>
					<v-data-table
						:headers="headers"
						:items="kardexItems"
						:items-per-page="5"
						class="elevation-10"
						dark
					>
					</v-data-table>
				</v-col>
			</v-row>
			<v-row justify="center">
				<v-col cols="12">
					<v-row
						justify="center"
						class="d-flex justify-baseline align-content-end flex-wrap"
					>
						<v-col>
							<div class="text-h2 mb-2">Resumen</div>
						</v-col>
					</v-row>
					<HomeKardexChart />
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import HomeKardexChart from '../components/HomeKardexChart'
import { headers } from '../constants/kardex.lang'

export default {
	components: {
		HomeKardexChart,
	},
	data() {
		return {
			headers: [],
			kardexItems: [],
			lang: '',
		}
	},
	computed: {
		...mapGetters('user', {
			user: 'getUser',
			kardex: 'getKardex',
		}),
		...mapGetters('lang', {
			language: 'getLanguage',
		}),
	},
	watch: {
		user(newUser) {
			if (newUser.username && !this.kardex.length) {
				console.log(new Date().toISOString(), 'getStatus')
				this.$store.dispatch('user/getStatus', this.user)
			}
		},
		kardex(newKardex) {
			if (newKardex.length) {
				this.headers = headers[this.language.toLowerCase()]

				this.kardexItems = newKardex.map((k) => ({
					...k,
					subject: k.subject.name.trim(),
				}))
			}
		},
		language(newLang) {
			if (this.kardex.length) {
				this.headers = headers[newLang.toLowerCase()]

				this.kardexItems = this.kardex.map((k) => ({
					...k,
					subject: k.subject.name.trim(),
				}))
			}
		},
	},
}
</script>

<style></style>
