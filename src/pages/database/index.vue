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
          v-model="search"
          label="Search"
          style="max-inline-size: 15rem;"
          class="me-3"
        />
        <AddDatabaseEntryDialog />
      </VCardTitle>
      <VCardText>
        <VDataTableServer
          v-model:items-per-page="tableSettings.itemsPerPage"
          :headers="headers"
          :items="data"
          :items-length="tableSettings.itemLength"
          :search="tableSettings.search"
          :loading="loading"
          @update:options="fetchData"
        >
          <template #item.action>
            <div>
              <VBtn
                icon="ri-eye-line"
                variant="text"
              />
              <VBtn
                icon="ri-delete-bin-line"
                variant="text"
              />
            </div>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>
  </div>
</template>
