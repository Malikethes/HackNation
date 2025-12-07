export const useItemSubmit = () => {
  const { createItem, createLocation, fetchCategories } = useApi()
  const submitting = ref(false)
  const submitError = ref('')

  const submitItem = async (formData: any, isDraft: boolean = false) => {
    submitting.value = true
    submitError.value = ''
    
    try {
      const categories: any = await fetchCategories()
      const category = categories.find((cat: any) => 
        cat.name.toLowerCase() === formData.itemType.toLowerCase()
      )
      const categoryId = category?.id || 1

      const locationData = {
        Longitude: parseFloat(formData.longitude) || 0,
        Latitude: parseFloat(formData.latitude) || 0,
        Address: formData.street || 'Unknown Address',
        City: formData.city || 'Unknown City',
        ProvinceId: 1,
        PostalCode: formData.postalCode || '00-000'
      }
      
      const location: any = await createLocation(locationData)
      
      // Create item with FormData
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.itemType || 'Unknown Item')
      formDataToSend.append('description', formData.description || 'No description')
      formDataToSend.append('dateLost', formData.dateDiscovery || new Date().toISOString().split('T')[0])
      
      if (formData.timeDiscovery) {
        formDataToSend.append('timeLost', formData.timeDiscovery)
      }
      
      formDataToSend.append('categoryId', categoryId.toString())
      formDataToSend.append('locationId', location.id.toString())
      formDataToSend.append('status', isDraft ? '0' : '1') 
      
      await createItem(formDataToSend)
      
      return { success: true }
    } catch (error: any) {
      console.error('Failed to submit item:', error)
      submitError.value = error.message || 'Failed to submit item. Please try again.'
      return { success: false, error: submitError.value }
    } finally {
      submitting.value = false
    }
  }

  return {
    submitItem,
    submitting,
    submitError
  }
}
