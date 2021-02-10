<template>
	<v-select
		v-model="languge"
		:items="languages"
		menu-props="auto"
		label="Idioma"
		hide-details
		append-icon="mdi-world"
		single-line
	>
	</v-select>
</template>

<script>
export default {
	props: {
		language: String,
	},
	data: () => ({
		languages: ['EN', 'ES'],
	}),
}
</script>

<style></style>
