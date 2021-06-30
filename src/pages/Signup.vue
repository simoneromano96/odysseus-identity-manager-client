<template>
  <div class="container">
    <h1>Signup</h1>
    <form @submit="sendSignup">
      <div class="card">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix mdi mdi-email" />
            <input id="email" v-model="email" type="email" name="email" class="validate" required />
            <label for="email">
              E-Mail
              <code>*</code>
            </label>
            <span class="helper-text" data-error="Invalid or empty email!"
              >Your preferred e-mail, check that it is correct since it will be validated! We will send a verification
              code</span
            >
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
            <span class="helper-text" data-error="Invalid or empty password!"
              >A secure password or passphrase that you will use to access your account</span
            >
          </div>
        </div>

        <div class="row">
          The fields with
          <code>*</code> means that they are required!
        </div>

        <div class="card-action actions">
          <button class="btn-flat waves-effect red-text" type="reset">Cancel</button>
          <button class="btn waves-effect waves-light" type="submit">
            Signup
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

import apiClient from "../utils/apiClient"
// import httpClient from "../utils/httpClient"

const SignupPage = defineComponent({
  setup(props, context) {
    const emailRef = ref("")
    const passwordRef = ref("")
    const usernameRef = ref("")

    const sendSignup = async (e: Event) => {
      e.preventDefault()
      const email = emailRef.value
      const password = passwordRef.value
      const username = usernameRef.value
      // When username is empty, send null
      const body = { email, password, username }
      try {
        const response = await apiClient.apiV1LocalSignupPost({ body })
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }

    return {
      sendSignup,
      username: usernameRef,
      email: emailRef,
      password: passwordRef,
    }
  },
})
export default SignupPage
</script>

<style lang="sass">
.actions
  display: flex
  justify-content: flex-end
</style>
