<script setup>
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

definePage({
  meta: {
    layout: 'blank',
  },
})

const router = useRouter()
const loading = ref(false)

const form = ref({
  email: 'admin@admin.com',
  password: '@Dm1n@Dm1n',
})

const errorMessage = ref('')

const isPasswordVisible = ref(false)

const login = async() => {
  loading.value = true
  try{
    const response = await $api('/auth/login', {
      method: "POST",
      body: {
        email: form.value.email,
        password: form.value.password,
      },
    })

    sessionStorage.setItem('accessToken', response.data.access_token)
    sessionStorage.setItem('refreshToken', response.data.refresh_token)

    router.push('/')
  }catch(e){
    errorMessage.value = e.errors
  }finally{
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-sm-4 pa-md-7 pa-0"
      max-width="448"
    >
      <VCardText>
        <div class="d-flex align-center gap-x-3 justify-center mb-6">
          <VNodeRenderer :nodes="themeConfig.app.logo" />

          <h1 class="auth-title">
            {{ themeConfig.app.title }}
          </h1>
        </div>
        <h4 class="text-h4 mb-1">
          Please sign-in to your account
        </h4>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                label="Email"
                type="email"
                placeholder="johndoe@email.com"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            
            <VCol cols="12">
              <VBtn
                block
                type="submit"
                :loading="loading"
              >
                Login
              </VBtn>
            </VCol>

            <VCol cols="12">
              <p>
                {{ errorMessage }}
              </p>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
