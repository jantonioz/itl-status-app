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
import { mapGetters } from 'vuex'

export default {
	components: {
		AuthValidator,
		HomeContent,
		HomeCarga,
	},
	computed: {
		...mapGetters('user', {
			user: 'getUser',
		}),
	},
	async mounted() {
		if (this.user.username) {
			await this.$store.dispatch('user/getStatus', this.user)
		}
	},
}
</script>

<style></style>
