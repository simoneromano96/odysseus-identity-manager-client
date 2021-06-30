<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit="sendLogin">
      <div class="card">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix mdi mdi-email" />
            <input id="email" v-model="email" type="email" name="email" class="validate" required />
            <label for="email">
              E-Mail
              <code>*</code>
            </label>
            <span class="helper-text" data-error="Invalid or empty email!">Your registered e-mail</span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix mdi mdi-key" />
            <input id="password" v-model="password" type="password" name="password" class="validate" required />
            <label for="password">
              Password
              <code>*</code>
            </label>
            <span class="helper-text" data-error="Invalid or empty password!">A secure password or passphrase</span>
          </div>
        </div>

        <div class="row">
          The fields with
          <code>*</code> means that they are required!
        </div>

        <div class="card-action actions">
          <button class="btn-flat waves-effect red-text" type="reset">Cancel</button>
          <button class="btn waves-effect waves-light" type="submit">
            Login
            <i class="material-icons right mdi mdi-send"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { HTTPError } from "ky"

import httpClient from "../utils/httpClient"

const LoginPage = defineComponent({
  setup(props, context) {
    const route = useRoute()
    const emailRef = ref("")
    const passwordRef = ref("")

    const loginChallenge = computed(() => route.query.login_challenge as string)

    const sendLogin = async (e: Event) => {
      e.preventDefault()
      const email = emailRef.value
      const password = passwordRef.value
      const json = { email, password }
      try {
        if (loginChallenge.value) {
          const response: { redirect_to?: string } = await httpClient
            .post("v1/login", { json, searchParams: { login_challenge: loginChallenge.value } })
            .json()
          // console.log(response)
          if (response?.redirect_to) {
            window.location.href = response?.redirect_to
          }
        } else {
          const response = await httpClient.post("v1/local/login", { json }).json()
          console.log(response)
        }
      } catch (error) {
        console.error(error)
        if (error instanceof HTTPError) {
          console.log(error.response)
          console.log(error.message)
          console.log(error.name)
        }
      }
    }

    return {
      loginChallenge,
      sendLogin,
      email: emailRef,
      password: passwordRef,
    }
  },
})
export default LoginPage
</script>

<style></style>
