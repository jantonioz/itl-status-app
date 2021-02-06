<script>
export default {
  mounted() {
    if (!this.$store.user || this.$state.user.name) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>