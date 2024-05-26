import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: 'http://20.205.137.176:8055',
  async onRequest({ options }) {
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
  
  async onResponseError({ response }) {
    if (response.status === 401) {
      console.log("Unauthorized, redirecting to login...")
      sessionStorage.clear()

      // Redirect to the login page using window.location
      window.location.href = '/login'
    }
  },
})
