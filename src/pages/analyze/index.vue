<script setup lang="ts">
import { matchToAll } from '@/composables/useFingermatch'
import { ref } from 'vue'

const file = ref(null)
const LoadingRef = ref(null)
const result = ref([])

const analyze = async () => {
  LoadingRef.value.triggerDialog(true)

  const fileData = file.value[0]

  console.log(fileData)
  
  const response = await matchToAll(fileData)

  result.value = response
    .sort((a, b) => b.result.match_score - a.result.match_score)
    .slice(0, 10)
  LoadingRef.value.triggerDialog(false)
}
</script>

<template>
  <div>
    <VCard title="Analyze">
      <VCardText>
        <div class="d-flex gap-x-3 align-center">
          <VFileInput
            v-model="file"
            label="Upload File to Analyze"
          />
          <VBtn @click="analyze">
            Analyze
          </VBtn>
        </div>
        
        <VDivider class="my-5" />

        <div v-if="result.length > 0">
          <h5 class="text-h5 mb-3">
            <b>Top 10 Results: </b> 
          </h5>
          <VRow class="px-3">
            <VCol
              v-for="(value, index) in result"
              :key="index"
              class="d-flex flex-column align-center"
              cols="12"
              lg="3"
              md="4"
              sm="6"
            >
              <VCard>
                <VImg
                  :src="value.response"
                  cover
                  max-height="200px"
                />

                <VCardText>
                  <div class="text-h6 text-center">
                    Feature Comparison Result
                  </div>
                  <div class="text-h5 text-center">
                    <b>
                      {{ `${value.result.match_score.toFixed(2)}%` }}
                    </b>
                  </div>
                </VCardText>
                <VCardActions>
                  <VBtn :to="`/database/${value.personId}`">
                    Show Person
                  </VBtn>
                  <VBtn disbaled>
                    Compare
                  </VBtn>
                </VCardActions>
              </VCard>
            </VCol>
          </VRow>
        </div>


        <div
          v-else
          class="text-h5 text-center"
        >
          Upload Fingerprint Image to Analyze
        </div>

        <Loading ref="LoadingRef" />
      </VCardText>
    </VCard> 
  </div>
</template>
