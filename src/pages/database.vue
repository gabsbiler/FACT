<script setup lang="ts">
const header = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "First Name",
    key: "firstName",
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

const data = [
  { id: 1, firstName: "John", lastName: "Doe", fingerprintCount: 10 },
  { id: 2, firstName: "Jane", lastName: "Smith", fingerprintCount: 8 },
  { id: 3, firstName: "Alice", lastName: "Johnson", fingerprintCount: 9 },
  { id: 4, firstName: "Bob", lastName: "Williams", fingerprintCount: 7 },
  { id: 5, firstName: "Charlie", lastName: "Brown", fingerprintCount: 5 },
  { id: 6, firstName: "David", lastName: "Davis", fingerprintCount: 11 },
  { id: 7, firstName: "Emily", lastName: "Miller", fingerprintCount: 4 },
  { id: 8, firstName: "Frank", lastName: "Wilson", fingerprintCount: 12 },
  { id: 9, firstName: "Grace", lastName: "Moore", fingerprintCount: 6 },
  { id: 10, firstName: "Henry", lastName: "Taylor", fingerprintCount: 10 },
]

const search = ref()
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
        <VDataTable
          :headers="header"
          :items="data"
          :search="search"
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
        </VDataTable>
      </VCardText>
    </VCard>
  </div>
</template>
