<script setup lang="ts">
import AppDateTimePicker from '@/@core/components/app-form-elements/AppDateTimePicker.vue'
import { $api } from '@/utils/api'

const fingerprintUploading = ref(false)
const deletionLoading = ref([])
const saveLoading = ref(false)
const router = useRouter()

const formData = ref({
  firstName: null,
  lastName: null,
  middleName: null,
  birthDate: null,
  residence: null,
  fingerprint: [],
})

const fingerPrintTemp = ref({
  description: null,
  file: null,
})

const enhance = async () => {
  fingerprintUploading.value = true

  const fileData = new FormData()

  fileData.append('image', fingerPrintTemp.value.file[0])

  try {
    const response = await $api('http://20.205.137.176:5000/enhance', {
      method: 'POST',
      body: fileData,
    })

    const blob = await response
    const enhancedFile = new File([response], 'enhanced_fingerprint.png', { type: 'image/png' })

    console.log(enhancedFile)

    // Now upload the enhanced file
    await uploadEnhancedImage(enhancedFile)
  } catch (e) {
    console.error('Error enhancing image:', e)
  } finally {
    fingerprintUploading.value = false
  }
}

const uploadEnhancedImage = async enhancedFile => {
  const uploadData = new FormData()

  uploadData.append('folder', '008b8a66-ea48-49d5-a1df-3db69b96da54')
  uploadData.append('file', enhancedFile)

  try {
    const response = await $api('/files', {
      method: 'POST',
      body: uploadData,
    })

    formData.value.fingerprint.push({
      description: fingerPrintTemp.value.description,
      file: response.data,
    })

    fingerPrintTemp.value = {
      description: null,
      file: null,
    }
  } catch (e) {
    console.error('Error uploading file:', e)
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

const rules = [
  value => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
  },
]

const addPersonToDatabase = async () => {
  saveLoading.value = true
  try{
    const payload = {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      middleName: formData.value.middleName,
      birthDate: formData.value.birthDate,
      residence: formData.value.residence,
      fingerprints: formData.value.fingerprint.map(item => {        
        return {
          description: item.description,
          image: item.file.id,
        }
      }),
    }

    await $api('/items/person', {
      method: 'POST',
      body: payload,
    })
    formData.value = {
      firstName: null,
      lastName: null,
      middleName: null,
      birthDate: null,
      residence: null,
      fingerprint: [],
    }
    router.push('/database')
  }catch(e){
    console.log(e)
  }finally{
    saveLoading.value = false
  }
}
</script>

<template>
  <div>
    <VCard
      class="mx-auto"
      title="Add Person"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="formData.firstName"
              label="First Name"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="formData.middleName"
              label="Middle Name"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="formData.lastName"
              label="Last Name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="formData.birthDate"
              label="Birthdate"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="formData.residence"
              label="Place of Residence"
            />
          </VCol>
          <VCol cols="12">
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
                      placeholder="Upload Fingerprint"
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
                      @click="enhance"
                    />
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCol>
          <VCol
            cols="12"
            class="d-flex gap-x-3 justify-end"
          >
            <VBtn
              :loading="saveLoading"
              @click="addPersonToDatabase"
            >
              Save & Upload
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>
