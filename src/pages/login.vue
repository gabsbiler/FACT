<script setup lang="ts">
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import miscMaskDark from '@images/misc/misc-mask-dark.png'
import miscMaskLight from '@images/misc/misc-mask-light.png'
import tree1 from '@images/misc/tree1.png'
import tree3 from '@images/misc/tree3.png'

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)

definePage({
  meta: {
    layout: 'blank',
  },
})

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
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
        <VForm @submit.prevent="() => {}">
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

              <div class="d-flex align-center flex-wrap justify-space-between my-5 gap-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />
              </div>

              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <div class="d-flex gap-x-2 auth-footer-start-tree">
      <img
        class="d-none d-md-block"
        :src="tree3"
        :height="120"
        :width="67"
      >
      <img
        class="d-none d-md-block align-self-end"
        :src="tree3"
        :height="70"
        :width="40"
      >
    </div>

    <img
      :src="tree1"
      class="auth-footer-end-tree d-none d-md-block"
      :width="97"
      :height="210"
    >

    <!-- bg img -->
    <img
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
      height="172"
    >
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
