<template>
  <h1>User Info</h1>
  <h2>Manage your account</h2>
  <div>
    <img src="../assets/logo.svg" alt="Odysseus logo" />
  </div>
  <div>
    <p>Welcome back, {{ userInfoRef?.email }}!</p>
    <p>
      <label class="email-verified">
        <input readonly="true" type="checkbox" class="filled-in" :checked="userInfoRef?.emailVerified" />
        <span>Email verified</span>
      </label>
    </p>
    <span v-if="!userInfoRef?.emailVerified">Please check your email for the verification code</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { HTTPError } from "ky"

// import httpClient from "../utils/httpClient"
import apiClient from "../utils/apiClient"
import { UserInfo } from "../openapi"

const UserInfoPage = defineComponent({
  setup(props, context) {
    const userInfoRef = ref<UserInfo>()

    const getUserInfo = async () => {
      try {
        const response = await apiClient.apiV1LocalUserInfoGet()
        userInfoRef.value = response
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(getUserInfo)

    return {
      userInfoRef,
    }
  },
})

export default UserInfoPage
</script>

<style lang="sass">
.email-verified
  pointer-events: none
</style>
