import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: 'https://apifact.gabsbiler.com',
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
