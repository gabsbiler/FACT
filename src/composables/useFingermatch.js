import { $api } from "@/utils/api"

const fetchAllFingerprints = async () => {
  try {
    const response = await $api('/items/fingerprints')
    
    return response.data
  } catch (error) {
    console.error('Failed to fetch fingerprints:', error)
    
    return []
  }
}

const compareFingerprint = async formData => {
  try {
    const response = await fetch('http://20.205.137.176:5050/verify/fingerprint', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json() // Assuming the response is JSON
    
    console.log('Comparison result:', data)
    
    return data
  } catch (error) {
    console.error('Failed to compare fingerprint:', error)
  }
}

const enhanceFingerprint = async fingerprintFile => {
  const formData = new FormData()

  formData.append('image', fingerprintFile)

  try {
    const response = await fetch('https://factenhance.gabsbiler.com/enhance', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to enhance fingerprint')
    }

    return await response.blob()
  } catch (error) {
    console.error('Failed to enhance fingerprint:', error)
    
    return null
  }
}

export const matchToAll = async fingerprintFile => {
  const fingerprints = await fetchAllFingerprints()
  let results = []

  const enhancedFingerprint = await enhanceFingerprint(fingerprintFile)
  if (!enhancedFingerprint) {
    console.error('Failed to enhance the input fingerprint')
      
    return results
  }


  for (const fingerprint of fingerprints) {
    const formData = new FormData()
    try { 
      const imageResponse = await fetch(`http://20.205.137.176:8055/assets/${fingerprint.image}`)
      if (imageResponse.ok) { // Check if the response is successful
        const imageBlob = await imageResponse.blob()

        formData.append('file', enhancedFingerprint, 'enhancedImage.png')
        formData.append('file', imageBlob, 'referenceImage.png')
        
        const result = {
          result: await compareFingerprint(formData),
          response: `http://20.205.137.176:8055/assets/${fingerprint.image}`,
          personId: fingerprint.person,
        }

        results.push(result)

      } else {
        console.error('Failed to load image:', fingerprint.image)
      }
    } catch (error) {
      console.error('Error fetching image:', error)
    }
  }

  return results
}
