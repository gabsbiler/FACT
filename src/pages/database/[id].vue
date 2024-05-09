<script setup lang="ts">
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const data = ref()
const deleteLoading = ref(false)
const loadingFingerprint = ref([])

const fetchData = async () => {
  try{
    const response = await $api(`/items/person/${route.params.id}`, {
      params: {
        fields: ['*', 'fingerprints.*'],
      },
    })

    data.value = response.data
  }catch(e){
    console.log(e)
  }
}

const deletePerson = async () => {
  deleteLoading.value = true
  try{
    await $api(`/items/person/${route.params.id}`, {
      method: "DELETE",
    })

    router.push('/database')
  }catch(e){
    console.log(e)
  }finally{
    deleteLoading.value = false
  }
}

const deletFingerprint = async item => {
  loadingFingerprint.value[item.id] = true 
  try{
    await $api(`/files/${item.image}`, {
      method: "DELETE",
    })
    await $api(`/items/fingerprints/${item.id}`, {
      method: "DELETE",
    })
  }catch(e){
    console.log('Error in Deleting Fingerprint')
    
    return
  }finally{
    fetchData()
    loadingFingerprint.value[item.id] = false 
  }
}

onMounted(()=>{
  fetchData()
})
</script>

<template>
  <div v-if="data">
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center mt-3 mb-2">
        <div class="d-flex align-center">
          <VBtn
            variant="text"
            icon="ri-arrow-left-s-line"
            @click="router.back()"
          />
          <div class="text-h5">
            <b>Person #{{ data.id }}</b>
          </div>
        </div>
        <VBtn
          icon="ri-delete-bin-line"
          color="error"
          :loading="deleteLoading"
          @click="deletePerson"
        />
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <h6 class="text-h6">
              <b>First Name: </b> {{ data.firstName }}
            </h6>
          </VCol>
          <VCol
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <h6 class="text-h6">
              <b>Middle Name: </b> {{ data.middleName }}
            </h6>
          </VCol>
          <VCol
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <h6 class="text-h6">
              <b>Last Name: </b> {{ data.lastName }}
            </h6>
          </VCol>
          <VCol
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <h6 class="text-h6">
              <b>Birth Date: </b> {{ data.birthDate }}
            </h6>
          </VCol>
          <VCol
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <h6 class="text-h6">
              <b>Residence: </b> {{ data.residence }}
            </h6>
          </VCol>
        </VRow>

        <VDivider class="mt-5 mb-4" />

        <div class="d-flex justify-space-between align-center my-3">
          <h6 class="text-h5 mb-3">
            Fingerprints
          </h6>
          <AddFingerprintDialog
            :id="route.params.id"
            @finish="fetchData"
          />
        </div>

        <div>
          <VRow>
            <VCol
              v-for="(value, index) in data.fingerprints"
              :key="index"
              cols="12"
              lg="2"
              md="4"
              sm="6"
            >
              <VCard class="text-center">
                <VImg
                  :src="`https://apifact.gabsbiler.com/assets/${value.image}`"
                  height="15rem"
                  cover
                />
                <!-- style="position: absolute; z-index: 10; inset-block-start: .5rem; inset-inline-end: .5rem" -->
                <div class="d-flex justify-space-between ps-3 pe-2 pb-1">
                  <VLabel><b>{{ value.description }}</b></VLabel>
                  <VBtn
                    icon="ri-delete-bin-line"
                    variant="text"
                    density="compact"
                    :loading="loadingFingerprint[value.id]"
                    @click="deletFingerprint(value)"
                  />
                </div>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
