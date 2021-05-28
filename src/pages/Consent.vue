<template>
  <h1>Consent</h1>
  
  <form @submit="sendConsent">
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

    const consentChallenge = computed(() => route.query.consent_challenge as string)

    const sendConsent = async (e: Event) => {
      e.preventDefault()
      try {
        const response: { redirectTo?: string } = await httpClient.get("v1/consent", { searchParams: { "consent_challenge": consentChallenge.value } }).json()
        console.log(response);
        if (response?.redirectTo) {
          window.location.href = response?.redirectTo
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
    }
  },
})
export default ConsentPage
</script>

<style>

</style>