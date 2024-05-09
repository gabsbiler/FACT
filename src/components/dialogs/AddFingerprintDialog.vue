<script setup lang="ts">
const props = defineProps(['id'])

const emits = defineEmits(['finish'])

const isDialogOpen = ref(false)
const fingerprintUploading = ref(false)
const deletionLoading = ref([])
const saveLoading = ref(false)

const formData = ref({
  fingerprint: [],
})

const rules = [
  value => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
  },
]

const fingerPrintTemp = ref({
  description: null,
  file: null,
})

const addFingerprint = async () => {
  fingerprintUploading.value = true
  try{
    const file = new FormData()

    file.append('folder', '008b8a66-ea48-49d5-a1df-3db69b96da54')
    file.append('file', fingerPrintTemp.value.file[0])
    console.log(fingerPrintTemp.value.file[0])

    const  response  = await $api('/files', {
      method: 'POST',
      body: file,
    })

    formData.value.fingerprint.push({
      description: fingerPrintTemp.value.description,
      file: response.data,
    })
  }catch(e){
    console.log("Error Uploading File: ", e)
  }finally{
    fingerPrintTemp.value = {
      description: null,
      file: null,
    }
    fingerprintUploading.value = false
  }
}

const removeFingerprint = async index => {
  deletionLoading.value[index] = true 
  try{
    await $api(`/files/${formData.value.fingerprint[index].file.id}`, {
      method: "DELETE",
    })

    formData.value.fingerprint.splice(index, 1)
  }catch(e){
    console.log(e)
  }finally {
    deletionLoading.value[index] = false // Set loading state to false for this index
  }
}

const apply = async () => {

  // console.log(formData.value.fingerprint.map(item => {
  //   return {
  //     person: props.id,
  //     description: item.description,
  //     file: item.file.id,
  //   }
  // }))

  saveLoading.value = true
  try{

    await $api('/items/fingerprints', {
      method: 'POST',
      body: formData.value.fingerprint.map(item => {
        return {
          person: props.id,
          description: item.description,
          image: item.file.id,
        }
      }),
    })

    emits('finish')
    
  }catch(e){
    console.log(e)
  }finally{
    isDialogOpen.value = false
    saveLoading.value = false
  }
}
</script>

<template>
  <div>
    <VBtn @click="isDialogOpen = !isDialogOpen">
      Add Fingerprint
    </VBtn>
    <VDialog v-model="isDialogOpen">
      <VCard
        class="mx-auto"
        title="Add Fingerprint"
        min-width="35rem"
      >
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th>
                  Description
                </th>
                <th>
                  Fingerprint Image
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(value, index) in formData.fingerprint "
                :key="index"
              >
                <td>
                  {{ value.description }}
                </td>
                <td>
                  {{ value.file.title }}
                </td>
                <td>
                  <VBtn
                    icon="ri-delete-bin-line"
                    variant="text"
                    :loading="deletionLoading[index]"
                    @click="removeFingerprint(index)"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <VTextField
                    v-model="fingerPrintTemp.description"
                    label="Description"
                    density="compact"
                  />
                </td>
                <td>
                  <VFileInput
                    v-model="fingerPrintTemp.file"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    label="Upload Fingerprint"
                    prepend-icon="ri-fingerprint-line"
                    clearable
                    density="compact"
                  />
                </td>
                <td>
                  <VBtn
                    icon="ri-add-circle-line"
                    variant="text"
                    :loading="fingerprintUploading"
                    @click="addFingerprint"
                  />
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            :loading="saveLoading"
            @click="apply"
          >
            Apply
          </VBtn>
          <VBtn @click="isDialogOpen = false">
            Cancel
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
