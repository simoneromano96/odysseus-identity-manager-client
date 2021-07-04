<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit="sendLogin">
      <div class="card">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix mdi mdi-email"></i>
            <input id="email" v-model="email" type="email" name="email" class="validate" :required="true" />
            <label for="email">
              E-Mail
              <code>*</code>
            </label>
            <span class="helper-text" data-error="Invalid or empty email!">Your registered e-mail</span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix mdi mdi-key"></i>
            <input id="password" v-model="password" type="password" name="password" class="validate" :required="true" />
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
  <!-- Logged in user modal -->
  <div id="modal-logged-in" ref="loggedInModalRef" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>You successfully logged in!</h4>
      <p>You can now check your account data in the user dashboard</p>
    </div>
    <div class="modal-footer">
      <button class="btn waves-effect waves-light" @click="router.push('/user-info')">
        Go to my dashboard
        <i class="material-icons right mdi mdi-send"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import apiClient from "../utils/apiClient"

const LoginPage = defineComponent({
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const emailRef = ref("")
    const passwordRef = ref("")
    const loggedInModalRef = ref()
    const loggedInModal = ref()

    const loginChallenge = computed(() => route.query.login_challenge as string)

    const sendLogin = async (e: Event) => {
      e.preventDefault()
      const email = emailRef.value
      const password = passwordRef.value
      const body = { email, password }
      try {
        if (loginChallenge.value) {
          const response = await apiClient.apiV1LoginPost({ body, loginChallenge: loginChallenge.value })
          // const response: { redirect_to?: string } = await httpClient
          //   .post("v1/login", { json, searchParams: { login_challenge: loginChallenge.value } })
          //   .json()
          // console.log(response)
          if (response.redirectTo) {
            window.location.href = response.redirectTo
          }
        } else {
          await apiClient.apiV1LocalLoginPost({ body })
          //  await httpClient.post("v1/local/login", { json }).json()
          loggedInModal.value.open()
        }
      } catch (error) {
        console.error(error)
        let text
        if (error instanceof Response) {
          const body = await error.json()
          const errorMessage = body.error
          text = errorMessage
        } else {
          text = error.message || "Generic error"
        }
        M.toast({ html: text, classes: "red darken-1 flow-text" })
      }
    }

    onMounted(() => {
      const loggedInModalDOM = loggedInModalRef.value
      M.Modal.init(loggedInModalDOM)
      const instance = M.Modal.getInstance(loggedInModalDOM)
      loggedInModal.value = instance
    })

    return {
      loginChallenge,
      sendLogin,
      loggedInModalRef,
      email: emailRef,
      password: passwordRef,
      router,
    }
  },
})
export default LoginPage
</script>

<style></style>
