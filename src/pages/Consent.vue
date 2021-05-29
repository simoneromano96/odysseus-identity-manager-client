<template>
  <h1>Consent</h1>
  
  <form @submit="sendConsent">
    <p> The application {{clientName}} wants access to the following information: </p>
    <ul>
      <li v-for="scope, index in requestedScopes" :key="index">
        {{scope}}
      </li>
    </ul>
    <input type="submit" value="Ok">
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useRoute } from "vue-router"
import { HTTPError } from "ky"

import httpClient from "../utils/httpClient"

const ConsentPage = defineComponent({
  setup(props, context) {
    const route = useRoute()

    const consentChallenge = computed(() => route.query.challenge as string)
    const clientName = computed(() => route.query.client_name as string)
    const requestedScopes = computed(() => route.query.requested_scope as string[])

    const sendConsent = async (e: Event) => {
      e.preventDefault()
      try {
        const json = {scopes: requestedScopes.value};
        const response: { redirect_to?: string } = await httpClient.post("v1/consent", { json, searchParams: { "consent_challenge": consentChallenge.value } }).json()
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
      consentChallenge,
      sendConsent,
      clientName,
      requestedScopes
    }
  },
})
export default ConsentPage
</script>

<style>

</style>