<script setup lang="ts">
const loading = ref(false)

const headers = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "First Name",
    key: "firstName",
  },
  {
    title: "Middle Name",
    key: "middleName",
  },
  {
    title: "Last Name",
    key: "lastName",
  },
  {
    title: "Fingerprint Count",
    key: "fingerprintCount",
  },
  {
    title: "Actions",
    key: "action",
  },
]

const tableSettings = ref({
  itemsPerPage: 10,
  itemLength: 0,
  search: '',
  page: 1,
})

const data = ref()

const search = ref()

const fetchData = async options => {
  try{
    const response = await $api('/items/person', {
      params: {
        fields: ['*'],
        sort: "-date_created",
        limit: options.itemsPerPage,
        page: options.page,
        search: options.search,
        meta: ['*'],
       
      },
    })

    tableSettings.value.itemLength = response.meta.total_count
    data.value = response.data
  }catch(e){
    console.log(e)
  }
}

const deletePerson = async id => {
  deleteLoading.value = true
  try{
    await $api(`/items/person/${id}`, {
      method: "DELETE",
    })

    router.push('/database')
  }catch(e){
    console.log(e)
  }finally{
    deleteLoading.value = false
  }
}
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="d-flex mt-3 align-center  mx-2">
        <div>
          Database
        </div>
        <VSpacer />
        <VTextField
          v-model="tableSettings.search"
          label="Search"
          style="max-inline-size: 15rem;"
          class="me-3"
        />
        <VBtn to="/database/add">
          Add Entry
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VDataTableServer
          :items-per-page="tableSettings.itemsPerPage"
          :headers="headers"
          :items="data"
          :items-length="tableSettings.itemLength"
          :search="tableSettings.search"
          :loading="loading"
          @update:options="fetchData"
        >
          <template #item.fingerprintCount="{item}">
            {{ item.fingerprints.length }}
          </template>
          <template #item.action="{item}">
            <div>
              <VBtn
                icon="ri-eye-line"
                variant="text"
                :to="`/database/${item.id}`"
              />
              <VBtn
                icon="ri-delete-bin-line"
                variant="text"
                @click="deletePerson(item.id)"
              />
            </div>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>
  </div>
</template>
