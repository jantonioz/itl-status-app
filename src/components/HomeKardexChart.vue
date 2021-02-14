<template>
	<highcharts dark :options="chartOptions"></highcharts>
</template>

<script>
import { mapGetters } from 'vuex'

import { headers } from '../constants/kardex.lang'

export default {
	data: () => ({
		chartOptions: {
			series: [{ data: [1, 2, 3] }],
			title: { text: 'Kardex', color: '#fff' },
			subtitle: { text: 'jeje' },
			chart: {
				type: 'column',
				backgroundColor: {
					linearGradient: [0, 0, 0, 0],
					stops: [
						[0, '#1E1E1E'],
						[1, '#1E1E1E'],
					],
				},
			},
		},
		semester: '',
	}),
	computed: {
		...mapGetters('user', {
			kardex: 'getKardex',
		}),
		...mapGetters('lang', {
			language: 'getLanguage',
		}),
	},
	mounted() {
		if (!this.semester && this.language) {
			this.loadSemesterVal(this.language)
		}
	},
	watch: {
		language(language) {
			this.loadSemesterVal(language)
			this.reloadGraph(this.kardex)
		},
		kardex(newKardex) {
			this.reloadGraph(newKardex)
		},
	},
	methods: {
		loadSemesterVal(lang) {
			this.semester = headers[lang.toLowerCase()].find(
				(e) => e && e.value === 'semester'
			).text
		},
		reloadGraph(newKardex) {
			if (!newKardex || !Array.isArray(newKardex) || !newKardex.length) {
				console.log('reloadGrapth', 'invalid kardex', newKardex)
				return null
			}

			const getContents = (acc, el) => {
				if (acc[el.semester]) return [...acc[el.semester], el]
				return [el]
			}

			const semestersObj = newKardex.reduce(
				(acc, el) => ({ ...acc, [el.semester]: getContents(acc, el) }),
				{}
			)

			const semestersArr = Object.keys(semestersObj).map(
				(key) => semestersObj[key]
			)

			const xAxis = Object.keys(semestersObj).map(
				(e) => `${this.semester} ${e}`
			)

			const data = semestersArr.map((semesterGroup) => {
				const prom =
					semesterGroup.reduce((sum, subject) => sum + subject.grade, 0) /
					semesterGroup.length
				return prom || 0
			})
			const minYAxis = Math.floor(data.map((e) => e).sort()[0])

			this.chartOptions = {
				yAxis: { min: minYAxis, title: { text: 'Average' } },
				series: [{ data, colorByPoint: true, name: this.semester }],
				xAxis: { categories: xAxis },
				zoomType: 'xy',
			}
		},
	},
}
</script>

<style>
.highcharts-title,
.highcharts-subtitle,
.highcharts-yaxis,
.highcharts-axis-title {
	color: #fff !important;
	fill: #fff !important;
}
</style>
