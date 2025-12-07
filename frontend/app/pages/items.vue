<template>
  <v-app>
    <v-navigation-drawer permanent width="256">
      <div class="pa-6 border-b d-flex align-center">
        <div class="logo-icon mr-3">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <g clip-path="url(#clip0_6_535)">
              <path clip-rule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fill-rule="evenodd"/>
            </g>
            <defs>
              <clipPath id="clip0_6_535"><rect fill="white" height="48" width="48"/></clipPath>
            </defs>
          </svg>
        </div>
        <h2 class="text-h6 font-weight-bold">Swift&Found</h2>
      </div>

      <v-list density="compact" class="pa-4">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Admin Dashboard"
          value="dashboard"
          color="primary"
          rounded="lg"
          class="mb-2"
          @click="navigateTo('/dashboard')"
        />
        <v-list-item
          prepend-icon="mdi-format-list-bulleted-square"
          title="Items List"
          value="items"
          color="primary"
          rounded="lg"
          class="mb-2"
          @click="navigateTo('/items')"
          active
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" color="surface" class="border-b"/>

    <v-main>
      <v-container fluid class="pa-6 pa-md-8 pa-lg-10">
        <div class="d-flex flex-wrap align-center justify-space-between gap-3 mb-6">
          <h1 class="text-h3 font-weight-black">Items Gallery</h1>
          <div class="d-flex flex-wrap gap-3">
            <v-btn color="secondary" class="mr-4" prepend-icon="mdi-camera-iris" size="large" @click="aiSearchDialog = true">
              Find with AI
            </v-btn>
          </div>
        </div>

        <ItemFilters
          v-model:search="search"
          v-model:filterCategory="filterCategory"
          v-model:filterStatus="filterStatus"
          v-model:sortBy="sortBy"
          :categoryOptions="categoryOptions"
          class="mb-8"
        />

        <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-6" />

        <div v-if="!loading && filteredItems.length === 0" class="text-center py-16">
          <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-package-variant</v-icon>
          <p class="text-h6 text-medium-emphasis">No items found</p>
        </div>

        <v-row v-else>
          <v-col
            v-for="item in filteredItems"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ItemCard
              :item="item"
              @view="viewItem"
              @edit="editItem"
              @delete="deleteItemConfirm"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <ItemViewDialog
      v-model="viewDialog"
      :item="selectedItem"
    />

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Delete Item?</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" variant="flat" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="aiSearchDialog" max-width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <div>
            <h3 class="text-h5 font-weight-bold mb-1">Find Your Item with AI</h3>
            <p class="text-body-2 text-medium-emphasis">Upload a photo and let AI help you find matching items</p>
          </div>
          <v-btn icon="mdi-close" variant="text" @click="aiSearchDialog = false" />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <div v-if="!uploadedPhoto" class="upload-area" @click="triggerFileInput">
            <v-icon size="64" color="primary" class="mb-4">mdi-cloud-upload</v-icon>
            <p class="text-h6 mb-2">Upload a photo</p>
            <p class="text-body-2 text-medium-emphasis mb-4">Click to browse or drag and drop</p>
            <v-btn color="primary" variant="tonal">Choose File</v-btn>
            <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleFileUpload" />
          </div>
          
          <div v-else class="uploaded-preview">
            <v-img :src="uploadedPhoto" class="rounded-lg mb-4" max-height="300" contain />
            <div class="d-flex gap-2 mb-4">
              <v-btn variant="outlined" color="error" @click="removePhoto" prepend-icon="mdi-delete">Remove Photo</v-btn>
              <v-btn variant="outlined" @click="triggerFileInput" prepend-icon="mdi-camera">Change Photo</v-btn>
            </div>
            <v-divider class="my-4" />
            <v-btn color="primary" size="large" block prepend-icon="mdi-magnify" :loading="searchingAI" @click="searchWithAI">
              Search with AI
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import ItemFilters from '~/components/itemsList/ItemFilters.vue'
import ItemCard from '~/components/itemsList/ItemCard.vue'
import ItemViewDialog from '~/components/itemsList/ItemViewDialog.vue'

const search = ref('')
const deleteDialog = ref(false)
const viewDialog = ref(false)
const selectedItem = ref<any>(null)
const filterCategory = ref<string | null>(null)
const filterStatus = ref<string | null>(null)
const sortBy = ref('dateNewest')
const aiSearchDialog = ref(false)
const uploadedPhoto = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const searchingAI = ref(false)

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

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}

.logo-icon {
  color: rgb(var(--v-theme-primary));
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area {
  border: 2px dashed rgb(var(--v-theme-primary));
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-area:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
  border-color: rgb(var(--v-theme-primary));
}

.uploaded-preview {
  text-align: center;
}
</style>
