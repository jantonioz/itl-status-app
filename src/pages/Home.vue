<template>
	<div>
		<HomeCarga />
		<HomeContent />
		<AuthValidator />
	</div>
</template>

<script>
import AuthValidator from '../components/AuthValidator.vue'
import HomeContent from '../components/HomeContent.vue'
import HomeCarga from '../components/HomeCarga.vue'

export default {
	components: {
		AuthValidator,
		HomeContent,
		HomeCarga
	},
}
</script>

<style></style>
