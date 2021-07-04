<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"

export default defineComponent({
  name: "App",
  setup: () => {
    onMounted(() => {
      M.AutoInit()
    })
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
