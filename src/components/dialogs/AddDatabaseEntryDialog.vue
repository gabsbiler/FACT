<script setup lang="ts">
const isDialogOpen = ref(true)

const formData = ref({
  firstName: null,
  lastName: null,
  fingerprint: [
    {
      description: "Thumb",
      file: [
        {
          name: "Thumbmark.png",
        },
      ],
    },
  ],
})

const fingerPrintTemp = ref({
  description: null,
  file: null,
})

const addFingerprint = () => {
  formData.value.fingerprint.push(fingerPrintTemp.value)
  fingerPrintTemp.value = {
    description: null,
    file: null,
  }
}

const removeFingerprint = index => {
  formData.value.fingerprint.splice(index, 1)
}
</script>

<template>
  <div>
    <VBtn>
      Add Entry
    </VBtn>

    <VDialog v-model="isDialogOpen">
      <VCard
        class="mx-auto"
        title="Add Entry"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="formData.firstName"
                label="First Name"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formData.lastName"
                label="Last Name"
              />
            </VCol>
            <VCol>
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
                      {{ value.file[0].name }}
                    </td>
                    <td>
                      <VBtn
                        icon="ri-delete-bin-line"
                        variant="text"
                        @click="removeFingerprint(index)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <VTextField
                        v-model="fingerPrintTemp.description"
                        label="Description"
                      />
                    </td>
                    <td>
                      <VFileInput
                        v-model="fingerPrintTemp.file"
                        clearable
                      />
                    </td>
                    <td>
                      <VBtn
                        icon="ri-add-circle-line"
                        variant="text"
                        @click="addFingerprint"
                      />
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
            <VCol cols="12">
              <VBtn block>
                Add
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
