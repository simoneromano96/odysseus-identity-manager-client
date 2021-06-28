import { createApp } from "vue"
import "materialize-css/dist/css/materialize.css"
import "materialize-css/dist/js/materialize.js"
import "@mdi/font/css/materialdesignicons.css"

import App from "./App.vue"
import router from "./routes"

const app = createApp(App)

app.use(router)

app.mount("#app")
