export const useAISearch = () => {
  const uploadedPhoto = ref<string | null>(null)
  const fileInput = ref<HTMLInputElement | null>(null)
  const searchingAI = ref(false)

  const triggerFileInput = () => {
    fileInput.value?.click()
  }

  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        uploadedPhoto.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    uploadedPhoto.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  const searchWithAI = async () => {
    searchingAI.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    searchingAI.value = false
    console.log('AI search with photo:', uploadedPhoto.value)
  }

  return {
    uploadedPhoto,
    fileInput,
    searchingAI,
    triggerFileInput,
    handleFileUpload,
    removePhoto,
    searchWithAI
  }
}
