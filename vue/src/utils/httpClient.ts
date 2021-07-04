import ky from "ky"

const prefixUrl = import.meta.env.VITE_API_URL?.toString() || "http://localhost:8000/api/";

const httpClient = ky.create({
  prefixUrl,
  redirect: "follow",
  mode: "cors",
  throwHttpErrors: true,
  credentials: "include",
  hooks: {
    afterResponse: [
      (_input, _options, response) => {
        console.log(_input)
        console.log(_options)
        console.log(response)
        console.log(response.headers)
        console.log(response.headers.get("Location"))
        if (response.status === 303) {
          // window.location.href = response.headers.get("Location")
        }
      },
    ],
    beforeRequest: [
      (request, options) => {
        console.log(request)
        console.log(options)
      },
    ],
  },
})

export default httpClient
