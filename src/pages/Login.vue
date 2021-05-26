<template>
  <h1>Login</h1>
  <form @submit="sendLogin">
    <input type="hidden" name="loginChallenge" :value="loginChallenge">
    <input type="text" name="email" placeholder="email" v-model="email"> <br>
    <input type="text" name="password" placeholder="password" v-model="password"> <br>
    <input type="submit" value="Ok">
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useRoute } from "vue-router"
import httpClient from "../utils/httpClient"
import ky from "ky"

const LoginPage = defineComponent({
  setup(props, context) {
    const route = useRoute()
    const email = ref("")
    const password = ref("")

    const loginChallenge = computed(() => route.query.login_challenge)

    const sendLogin = async (e) => {
      e.preventDefault()
      const json = {email: email.value, password: password.value, loginChallenge: loginChallenge.value}
      try {
        const response = await httpClient.post("auth/login", {json}).json()
        console.log(response);
        if (response?.redirectTo) {
          window.location.href = response?.redirectTo
        }
      } catch (error) {
        console.error(error)
        if (error instanceof ky.HTTPError) {
          console.log(error.response);
          console.log(error.message);
          console.log(error.name);
        }
      }
    }

    return {
      loginChallenge,
      sendLogin,
      email,
      password
    }
  },
})
export default LoginPage
</script>

<style>

</style>