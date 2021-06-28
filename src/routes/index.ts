import { createRouter, createWebHistory } from "vue-router"
import queryString from "query-string"

import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Consent from "../pages/Consent.vue"
import Signup from "../pages/Signup.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/consent", component: Consent },
  { path: "/signup", component: Signup },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  parseQuery: query => {
    return queryString.parse(query, { arrayFormat: "index" })
  },
  stringifyQuery(query) {
    const result = queryString.stringify(query, { encode: false, arrayFormat: "index" })
    return result ? "?" + result : ""
  },
})

export default router
