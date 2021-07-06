<template>
  <h1>Consent</h1>

  <form @submit="sendConsent">
    <p>The application {{ clientName }} wants access to the following information:</p>
    <ul>
      <li v-for="(scope, index) in requestedScopes" :key="index">
        {{ scope }}
      </li>
    </ul>
    <input type="submit" value="Ok" />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useRoute } from "vue-router"

import apiClient from "../utils/apiClient"
// import httpClient from "../utils/httpClient"

const ConsentPage = defineComponent({
  setup(props, context) {
    const route = useRoute()

    const consentChallenge = computed(() => route.query.consent_challenge as string)
    const clientName = computed(() => route.query.client_name as string)
    const requestedScopes = computed(() => route.query.requested_scope as string[])

    const sendConsent = async (e: Event) => {
      e.preventDefault()
      try {
        const body = { scopes: requestedScopes.value }
        const response = await apiClient.apiV1OauthConsentPost({ body, consentChallenge: consentChallenge.value })
        console.log(response)
        if (response.redirectTo) {
          window.location.href = response.redirectTo
        }
      } catch (error) {
        console.error(error)
      }
    }

    return {
      consentChallenge,
      sendConsent,
      clientName,
      requestedScopes,
    }
  },
})
export default ConsentPage
</script>

<style></style>
