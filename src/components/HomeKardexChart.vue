<template>
	<highcharts dark :options="chartOptions"></highcharts>
</template>

<script>
import { mapGetters } from 'vuex'

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
	}),
	computed: {
		...mapGetters('user', {
			kardex: 'getKardex',
		}),
	},
	watch: {
		kardex(newKardex) {
			if (!newKardex || !Array.isArray(newKardex) || !newKardex.length)
				return null

			console.log('newKardex', newKardex)
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

			const xAxis = Object.keys(semestersObj).map((e) => `Semester ${e}`)

			const data = semestersArr.map((semesterGroup) => {
				const prom =
					semesterGroup.reduce((sum, subject) => sum + subject.grade, 0) /
					semesterGroup.length
				return prom || 0
			})
			const minYAxis = Math.floor(data.map((e) => e).sort()[0])

			console.log('series', data, xAxis)
			this.chartOptions = {
				yAxis: { min: minYAxis, title: { text: 'Average' } },
				series: [{ data, colorByPoint: true, name: 'Semester' }],
				xAxis: { categories: xAxis },
				zoomType: 'xy',
			}
		},
	},
}
</script>

<style>
.highcharts-title, .highcharts-subtitle, .highcharts-yaxis, .highcharts-axis-title {
	color: #fff!important;
  fill: #fff!important;
}
</style>
