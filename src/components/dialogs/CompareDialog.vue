<script setup lang="ts">
const isDialogOpen = ref(false)
const fingerprint1 = ref('')
const fingerprint2 = ref('')
const LoadingRef = ref(null)

const openDialog = async (file, fingerprint2Url) => {
  LoadingRef.value.triggerDialog(true)

  const reader = new FileReader()

  reader.onload = e => {
    fingerprint1.value = e.target.result
  }
  reader.readAsDataURL(file)

  fingerprint2.value = fingerprint2Url
  isDialogOpen.value = true

  await processFingerprint1(file)
  await processFingerprint2(fingerprint2Url)

  LoadingRef.value.triggerDialog(false)
}

const getFeatures = async file => {
  const formData = new FormData()

  if (typeof file === 'string') {
    const imageResponse = await fetch(file)
    if (imageResponse.ok) {

      const imageBlob = await imageResponse.blob()

      console.log(imageBlob)

      formData.append('file', imageBlob, 'referenceImage.png')
    } else {
      console.error('Failed to load image:', fingerprint.image)
    }
  } else {
    formData.append('file', file, 'enhancedImage.png')
  }

  try {
    return await fetch('http://20.205.137.176:54321/process_fingerprints', {
      method: 'POST',
      body: formData,
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

const processFingerprint1 = async file => {
  const response = await getFeatures(file)
  const blob = await response.blob()

  fingerprint1.value = URL.createObjectURL(blob)
}

const processFingerprint2 = async file => {
  const response = await getFeatures(file)
  const blob = await response.blob()

  fingerprint2.value = URL.createObjectURL(blob)
}

defineExpose({
  openDialog,
})
</script>

<template>
  <div>
    <VDialog v-model="isDialogOpen">
      <VCard class="mx-auto">
        <VCardTitle>
          <div class="text-h5 mt-2">
            Compare Fingerprint
          </div>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VImg
                :src="fingerprint1"
                style="border-radius: 1rem;"
                min-width="30rem"
                min-height="35rem"
                cover
                class="mx-auto"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VImg
                :src="fingerprint2"
                style="border-radius: 1rem;"
                min-width="30rem"
                min-height="35rem"
                cover
                class="mx-auto"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn @click="isDialogOpen = false">
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>


    <Loading ref="LoadingRef" />
  </div>
</template>
