<script setup lang="ts">
const isShow = ref(false)

const triggerDialog = (show: boolean) => {
  isShow.value = show
}

console.log('hello')
defineExpose({ triggerDialog })
</script>

<template>
  <div>
    <VDialog
      v-model="isShow"
      max-width="500"
      persistent
    >
      <VCard class="text-center">
        <VCardText class="d-flex justify-center flex-column align-center text-center">
          <div class="loader mt-5"/>

          <h6 class="text-lg font-weight-medium mt-5">
            Processing, Please wait...
          </h6>
          <div>
            Get some coffee, this may take a while
          </div>
          <VDivider style="inline-size: 100%;" class="my-3"/>
          <div>
            We are currently analyzing your fingerprint image. The process includes uploading the image, enhancing its quality, detecting key features like ridge endings and bifurcations, and visualizing these features. Thank you for your patience as we complete this detailed analysis.
          </div>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss" scoped>
.loader{
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  block-size:2rem;
  border-block-start: 6px solid rgb(55, 55, 55);
  inline-size:2rem
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% {transform: rotate(360deg) }
}
</style>
