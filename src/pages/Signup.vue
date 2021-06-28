<template>
  <h1>Signup</h1>
  <form @submit="sendLogin">
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix mdi mdi-email" />
        <input id="email" v-model="email" type="email" name="email" class="validate" required />
        <label for="email">
          E-Mail
          <code>*</code>
        </label>
        <span class="helper-text" data-error="Invalid or empty email!">
          Your preferred e-mail, check that it is correct since it will be validated! We will send a verification code
        </span>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix mdi mdi-account" />
        <input id="username" v-model="username" type="text" name="username" />
        <label for="username">Username</label>
        <span class="helper-text">An optional username</span>
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
        <span class="helper-text" data-error="Invalid or empty password!">
          A secure password or passphrase that you will use to access your account
        </span>
      </div>
    </div>

    <div class="row">
      The fields with
      <code>*</code> means that they are required!
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Signup
      <i class="material-icons right mdi mdi-send"></i>
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useRoute } from "vue-router"
import { HTTPError } from "ky"

import httpClient from "../utils/httpClient"

const SignupPage = defineComponent({
  setup(props, context) {
    const email = ref("")
    const password = ref("")
    const username = ref()

    const sendLogin = async (e: Event) => {
      e.preventDefault()
      const json = { email: email.value, password: password.value, username: username.value }
      try {
        const response: { redirect_to?: string } = await httpClient.post("v1/signup", { json }).json()
        console.log(response)
        if (response?.redirect_to) {
          window.location.href = response?.redirect_to
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
      sendLogin,
      username,
      email,
      password,
    }
  },
})
export default SignupPage
</script>
