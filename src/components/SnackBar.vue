<script setup lang="ts">
const isShow = ref(false)
const SnackbarColor = ref()
const SnackBarMessage = ref()

const show = (color: any, message: any) => {
  SnackbarColor.value = color
  SnackBarMessage.value = message
  isShow.value = true
}

const hello = "hello"

defineExpose({ show, hello })
</script>

<template>
  <VSnackbar
    v-model="isShow"
    location="top end"
    variant="flat"
    :color="SnackbarColor"
  >
    {{ SnackBarMessage }}
  </VSnackbar>
</template>
