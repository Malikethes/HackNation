export const useDashboardData = () => {
  const { fetchItems, fetchCategoriesById } = useApi()
  const items = ref<any[]>([])
  const loading = ref(false)
  const stats = ref({
    totalItems: 0,
    itemsThisMonth: 0,
    itemsAwaitingPublication: 0
  })

  const loadData = async () => {
    loading.value = true
    try {
      const response = await fetchItems()
      const itemsArray = Array.isArray(response) ? response : []

      const itemsWithCategories = await Promise.all(
        itemsArray.map(async (item: any) => {
          let categoryName = item.category?.name || 'Uncategorized'
          
          if (!item.category && item.categoryId) {
            try {
              const category = await fetchCategoriesById(item.categoryId)
              categoryName = category?.name || 'Uncategorized'
            } catch (error) {
              console.error(`Failed to fetch category ${item.categoryId}:`, error)
            }
          }
          
          return {
            id: `#${item.id}`,
            name: item.name || 'Unknown Item',
            description: item.description || item.name || 'No description',
            category: categoryName,
            dateAdded: new Date(item.dateLost || item.createdAt).toLocaleDateString('en-CA'),
            status: item.status === 1 ? 'Published' : 'Draft',
            rawStatus: item.status,
            photoUrl: item.photoUrl || 'https://via.placeholder.com/300',
            location: item.location
          }
        })
      )

      items.value = itemsWithCategories

      stats.value.totalItems = items.value.filter((item: any) => item.rawStatus === 1).length
      
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      
      stats.value.itemsThisMonth = items.value.filter((item: any) => {
        const itemDate = new Date(item.dateAdded)
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear
      }).length
      
      stats.value.itemsAwaitingPublication = items.value.filter((item: any) => item.rawStatus === 0).length
      
    } catch (error) {
      console.error('Failed to load items:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    stats,
    loadData
  }
}
