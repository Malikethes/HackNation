export const useItemEdit = () => {
  const route = useRoute()
  const { fetchItems, fetchCategories, updateItem } = useApi()

  const form = ref(null)
  const valid = ref(false)
  const submitting = ref(false)
  const showSuccess = ref(false)
  const showError = ref(false)
  const errorMessage = ref('')
  const newPhoto = ref<File[] | null>(null)

  const itemData = ref({
    name: '',
    description: '',
    categoryId: null as number | null,
    dateLost: '',
    timeLost: '',
    status: 0,
    photoUrl: '',
  })

  const categories = ref<any[]>([])

  const statusOptions = [
    { title: 'Draft', value: 0 },
    { title: 'Published', value: 1 },
    { title: 'Archived', value: 2 },
  ]

  const rules = {
    required: (v: any) => !!v || 'This field is required',
  }

  const loadItem = async () => {
    try {
      const itemId = parseInt(route.params.id as string)
      const items = await fetchItems() as any[]
      const item = items.find((i: any) => i.id === itemId)
      
      if (!item) {
        errorMessage.value = 'Item not found'
        showError.value = true
        setTimeout(() => navigateTo('/dashboard'), 2000)
        return
      }

      itemData.value = {
        name: item.name,
        description: item.description,
        categoryId: item.categoryId,
        dateLost: item.dateLost?.split('T')[0] || '',
        timeLost: item.timeLost ? new Date(item.timeLost).toTimeString().slice(0, 5) : '',
        status: item.status,
        photoUrl: item.photoUrl || '',
      }
    } catch (error) {
      console.error('Failed to load item:', error)
      errorMessage.value = 'Failed to load item data'
      showError.value = true
    }
  }

  const loadCategories = async () => {
    try {
      categories.value = await fetchCategories() as any[]
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const handleSubmit = async () => {
    if (!valid.value) return

    submitting.value = true
    try {
      const itemId = parseInt(route.params.id as string)
      const formData = new FormData()
      
      formData.append('Name', itemData.value.name)
      formData.append('Description', itemData.value.description)
      formData.append('CategoryId', itemData.value.categoryId?.toString() || '')
      formData.append('DateLost', itemData.value.dateLost)
      
      if (itemData.value.timeLost) {
        const timeLostDate = new Date(`1970-01-01T${itemData.value.timeLost}:00`)
        formData.append('TimeLost', timeLostDate.toISOString())
      }
      
      formData.append('Status', itemData.value.status.toString())
      
      if (newPhoto.value && newPhoto.value.length > 0) {
        const photoFile = newPhoto.value[0]
        if (photoFile) {
          formData.append('photo', photoFile)
        }
      }

      await updateItem(itemId, formData)
      showSuccess.value = true
      
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 1500)
    } catch (error: any) {
      console.error('Failed to update item:', error)
      errorMessage.value = error.message || 'Failed to update item'
      showError.value = true
    } finally {
      submitting.value = false
    }
  }

  const initialize = () => {
    loadItem()
    loadCategories()
  }

  return {
    form,
    valid,
    submitting,
    showSuccess,
    showError,
    errorMessage,
    newPhoto,
    itemData,
    categories,
    statusOptions,
    rules,
    handleSubmit,
    initialize
  }
}
