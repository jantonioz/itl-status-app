<template>
  <div class="d-flex justify-center align-center center">
    <h1 class="text-h1 grey--text">Not Found :(</h1>
    <v-btn @click="goHome">
      Go Home
    </v-btn>
    <AuthValidator />
  </div>  
</template>

<script>
import AuthValidator from '../components/AuthValidator'
export default {
  components: {
    AuthValidator
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.center {
  height: 100%;
  flex-direction: column;
}
</style>