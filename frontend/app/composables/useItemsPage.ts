export const useItemsPage = () => {
  const search = ref('')
  const filterCategory = ref<string | null>(null)
  const filterStatus = ref<string | null>(null)
  const sortBy = ref('dateNewest')
  const deleteDialog = ref(false)
  const viewDialog = ref(false)
  const selectedItem = ref<any>(null)

  const { items, loading, loadData } = useDashboardData()
  const { deleteItem } = useApi()

  const categoryOptions = computed(() => {
    const categories = new Set(items.value.map((item: any) => item.category).filter(Boolean))
    return Array.from(categories).sort()
  })

  const filteredItems = computed(() => {
    let filtered = [...items.value]
    
    if (search.value) {
      const searchLower = search.value.toLowerCase()
      filtered = filtered.filter((item: any) => 
        item.name?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower)
      )
    }
    
    if (filterCategory.value) {
      filtered = filtered.filter((item: any) => item.category === filterCategory.value)
    }
    
    if (filterStatus.value) {
      filtered = filtered.filter((item: any) => item.status === filterStatus.value)
    }
    
    filtered.sort((a: any, b: any) => {
      switch (sortBy.value) {
        case 'dateNewest':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case 'dateOldest':
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        case 'nameAsc':
          return (a.name || '').localeCompare(b.name || '')
        case 'nameDesc':
          return (b.name || '').localeCompare(a.name || '')
        case 'category':
          return (a.category || '').localeCompare(b.category || '')
        default:
          return 0
      }
    })
    
    return filtered
  })

  const viewItem = (item: any) => {
    selectedItem.value = item
    viewDialog.value = true
  }

  const editItem = (item: any) => {
    const itemId = item.id.replace('#', '')
    navigateTo(`/edit/${itemId}`)
  }

  const deleteItemConfirm = (item: any) => {
    selectedItem.value = item
    deleteDialog.value = true
  }

  const confirmDelete = async () => {
    if (!selectedItem.value) return
    
    try {
      const itemId = parseInt(selectedItem.value.id.replace('#', ''))
      await deleteItem(itemId)
      deleteDialog.value = false
      selectedItem.value = null
      await loadData()
    } catch (error) {
      console.error('Failed to delete item:', error)
    }
  }

  return {
    search,
    filterCategory,
    filterStatus,
    sortBy,
    deleteDialog,
    viewDialog,
    selectedItem,
    items,
    loading,
    categoryOptions,
    filteredItems,
    loadData,
    viewItem,
    editItem,
    deleteItemConfirm,
    confirmDelete
  }
}
