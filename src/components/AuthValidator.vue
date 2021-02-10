<template>
	<div></div>
</template>

<script>
export default {
	mounted() {
		if (!this.$store.user || !this.$store.user.username) {
			this.$router.push('/login')
		}
	},
}
</script>

<style></style>
