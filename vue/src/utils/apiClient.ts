import { Configuration, DefaultApi } from "../openapi"

const prefixUrl = import.meta.env.VITE_API_URL?.toString() || "http://localhost:8000"

const apiClient = new DefaultApi(
  new Configuration({
    basePath: prefixUrl,
    credentials: "include",
  }),
)

export default apiClient
