<template>
  <h1>Logout</h1>

  <form @submit="sendLogout">
    <p>You are logging out</p>
    <input type="submit" value="Ok" />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useRoute } from "vue-router"

import apiClient from "../utils/apiClient"
// import httpClient from "../utils/httpClient"

const LogoutPage = defineComponent({
  setup(props, context) {
    const route = useRoute()

    const logoutChallenge = computed(() => route.query.logout_challenge as string)

    const sendLogout = async (e: Event) => {
      e.preventDefault()
      try {
        const response = await apiClient.apiV1OauthLogoutPost({ logoutChallenge: logoutChallenge.value })
        console.log(response)
        if (response.redirectTo) {
          window.location.href = response.redirectTo
        }
      } catch (error) {
        console.error(error)
      }
    }

    return {
      logoutChallenge,
      sendLogout,
    }
  },
})
export default LogoutPage
</script>

<style></style>
