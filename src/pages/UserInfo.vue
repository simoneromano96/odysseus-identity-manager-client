<template>
  <h1>User Info</h1>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { HTTPError } from "ky"

// import httpClient from "../utils/httpClient"
import apiClient from "../utils/apiClient"

const UserInfoPage = defineComponent({
  setup(props, context) {
    const userInfoRef = ref()

    const getUserInfo = async () => {
      try {
        const response = await apiClient.apiV1LocalUserInfoGet()
        userInfoRef.value = response
      } catch (error) {
        console.error(error)
        if (error instanceof HTTPError) {
          console.log(error.response)
          console.log(error.message)
          console.log(error.name)
        }
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
