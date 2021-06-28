<template>
  <h1>Login</h1>
  <form @submit="sendLogin">
    <div class="row">
      <div class="input-field col s12">
        <span class="mdi mdi-email prefix"></span>
        <input id="email" type="email" name="email" v-model="email" class="validate" required>
        <label for="email">E-Mail</label>
        <span class="helper-text" data-error="Invalid email!">Your registered e-mail</span>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <span class="mdi mdi-key prefix"></span>
        <input id="password" type="password" name="password" v-model="password" class="validate" required>
        <label for="password">Password</label>
        <span class="helper-text" data-error="Invalid password!">A secure password or passphrase</span>
      </div>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Login
      <i class="mdi mdi-send right"></i>
    </button>
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
    const email = ref("")
    const password = ref("")

    const loginChallenge = computed(() => route.query.login_challenge as string)

    const sendLogin = async (e: Event) => {
      e.preventDefault()
      const json = {email: email.value, password: password.value, }
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
      email,
      password,
    }
  },
})
export default LoginPage
</script>

<style>

</style>