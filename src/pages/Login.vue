<template>
  <h1>Login</h1>
  <form @submit="sendLogin">
    <input type="text" name="username" placeholder="username" v-model="username"> <br>
    <input type="text" name="password" placeholder="password" v-model="password"> <br>
    <input type="submit" value="Ok">
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useRoute } from "vue-router"
import { HTTPError } from "ky"

import httpClient from "../utils/httpClient"

const LoginPage = defineComponent({
  setup(props, context) {
    const route = useRoute()
    const username = ref("")
    const password = ref("")

    const loginChallenge = computed(() => route.query.login_challenge as string)

    const sendLogin = async (e: Event) => {
      e.preventDefault()
      const json = {username: username.value, password: password.value, }
      try {
        const response: { redirect_to?: string } = await httpClient.post("v1/login", {json, searchParams: { "login_challenge": loginChallenge.value } }).json()
        console.log(response);
        if (response?.redirect_to) {
          window.location.href = response?.redirect_to
        }
      } catch (error) {
        console.error(error)
        if (error instanceof HTTPError) {
          console.log(error.response);
          console.log(error.message);
          console.log(error.name);
        }
      }
    }

    return {
      loginChallenge,
      sendLogin,
      username,
      password
    }
  },
})
export default LoginPage
</script>

<style>

</style>