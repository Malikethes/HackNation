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
          title="Dashboard"
          value="dashboard"
          color="primary"
          rounded="lg"
          class="mb-2"
          active
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" color="surface" class="border-b"/>

    <v-main>
      <v-container fluid class="pa-6 pa-md-8 pa-lg-10">
        <div class="d-flex flex-wrap align-center justify-space-between mb-6">
          <h1 class="text-h3 font-weight-black">Dashboard</h1>
          <div class="d-flex gap-3">
            <v-btn color="secondary" class="mr-3" prepend-icon="mdi-camera-iris" size="large" @click="aiSearchDialog = true">
              Find item using AI
            </v-btn>
            <v-btn color="primary" prepend-icon="mdi-plus-circle" size="large" @click="navigateTo('/')">
              Add New Item
            </v-btn>
          </div>
        </div>

        <v-row class="mb-8">
          <v-col cols="12" sm="6" lg="4">
            <v-card elevation="1" rounded="lg">
              <v-card-text>
                <p class="text-body-1 text-medium-emphasis mb-2">Total Items Published</p>
                <p class="text-h4 font-weight-bold">{{ stats.totalItems }}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-card elevation="1" rounded="lg">
              <v-card-text>
                <p class="text-body-1 text-medium-emphasis mb-2">Items Found this Month</p>
                <p class="text-h4 font-weight-bold">{{ stats.itemsThisMonth }}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-card elevation="1" rounded="lg">
              <v-card-text>
                <p class="text-body-1 text-medium-emphasis mb-2">Items Awaiting Publication</p>
                <p class="text-h4 font-weight-bold">{{ stats.itemsAwaitingPublication }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card elevation="1" rounded="lg">
          <v-card-text>
            <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between mb-6">
              <div class="mb-4 mb-sm-0">
                <h3 class="text-h6 font-weight-bold mb-1">All Published Items</h3>
              </div>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                placeholder="Search for items..."
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 320px"
              />
            </div>

            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              :loading="loading"
              class="elevation-0"
              hover
            >
              <template #item.id="{ item }">
                <span class="font-weight-medium">{{ item.id }}</span>
              </template>

              <template #item.photo="{ item }">
                <v-avatar size="48" rounded="lg" class="my-2">
                  <v-img :src="item.photoUrl" cover />
                </v-avatar>
              </template>

              <template #item.status="{ item }">
                <v-chip
                  :color="item.status === 'Published' ? 'success' : 'warning'"
                  size="small"
                  variant="flat"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template #item.actions="{ item }">
                <div class="d-flex gap-2">
                  <v-btn
                    icon="mdi-eye"
                    size="small"
                    variant="text"
                    color="primary"
                    @click="viewItem(item)"
                  />
                  <v-btn
                    v-if="item.rawStatus === 0"
                    icon="mdi-pencil"
                    size="small"
                    variant="text"
                    color="primary"
                    @click="editItem(item)"
                  />
                  <v-btn
                    v-if="item.rawStatus === 0"
                    icon="mdi-delete"
                    size="small"
                    variant="text"
                    color="error"
                    @click="deleteItemConfirm(item)"
                  />
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <!-- View Item Dialog -->
    <v-dialog v-model="viewDialog" max-width="600">
      <v-card v-if="selectedItem">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h5">Item Details</span>
          <v-btn icon="mdi-close" variant="text" @click="viewDialog = false" />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-img
            v-if="selectedItem.photoUrl"
            :src="selectedItem.photoUrl"
            class="mb-4 rounded-lg"
            height="300"
            cover
          />
          <div class="mb-3">
            <p class="text-caption text-medium-emphasis">Item ID</p>
            <p class="text-body-1 font-weight-medium">{{ selectedItem.id }}</p>
          </div>
          <div class="mb-3">
            <p class="text-caption text-medium-emphasis">Description</p>
            <p class="text-body-1">{{ selectedItem.description }}</p>
          </div>
          <div class="mb-3">
            <p class="text-caption text-medium-emphasis">Category</p>
            <p class="text-body-1">{{ selectedItem.category }}</p>
          </div>
          <div class="mb-3">
            <p class="text-caption text-medium-emphasis">Date Added</p>
            <p class="text-body-1">{{ selectedItem.dateAdded }}</p>
          </div>
          <div>
            <p class="text-caption text-medium-emphasis">Status</p>
            <v-chip
              :color="selectedItem.status === 'Published' ? 'success' : 'warning'"
              size="small"
              variant="flat"
            >
              {{ selectedItem.status }}
            </v-chip>
          </div>
          <div v-if="selectedItem.location" class="mt-4">
            <p class="text-caption text-medium-emphasis mb-2">Location on Map</p>
            <v-card elevation="0" rounded="lg" class="overflow-hidden">
              <iframe
                :src="getMapUrl(selectedItem.location)"
                width="100%"
                height="300"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-card>
            <v-btn
              color="primary"
              variant="tonal"
              prepend-icon="mdi-map-marker"
              class="mt-3"
              block
              @click="openMapForItem(selectedItem.location)"
            >
              View on Google Maps
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
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

    <!-- AI Search Dialog -->
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
            <v-btn color="primary" variant="tonal">
              Choose File
            </v-btn>
            <input 
              ref="fileInput" 
              type="file" 
              accept="image/*" 
              style="display: none" 
              @change="handleFileUpload"
            />
          </div>
          
          <div v-else class="uploaded-preview">
            <v-img :src="uploadedPhoto" class="rounded-lg mb-4" max-height="300" contain />
            <div class="d-flex gap-2 mb-4">
              <v-btn variant="outlined" color="error" @click="removePhoto" prepend-icon="mdi-delete">
                Remove Photo
              </v-btn>
              <v-btn variant="outlined" @click="triggerFileInput" prepend-icon="mdi-camera">
                Change Photo
              </v-btn>
            </div>
            <v-divider class="my-4" />
            <v-btn 
              color="primary" 
              size="large" 
              block 
              prepend-icon="mdi-magnify" 
              :loading="searchingAI"
              @click="searchWithAI"
            >
              Search with AI
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
const search = ref('')
const deleteDialog = ref(false)
const viewDialog = ref(false)
const selectedItem = ref<any>(null)
const aiSearchDialog = ref(false)
const uploadedPhoto = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const searchingAI = ref(false)

const headers = [
  { title: 'Item ID', key: 'id', sortable: true },
  { title: 'Photo', key: 'photo', sortable: false },
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Description', key: 'description', sortable: true },
  { title: 'Category', key: 'category', sortable: true },
  { title: 'Date Added', key: 'dateAdded', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
]

const { items, loading, stats, loadData } = useDashboardData()
const { deleteItem } = useApi()

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

const getMapUrl = (location: any) => {
  const lat = location?.latitude || '52.2297'
  const lng = location?.longitude || '21.0122'
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=15`
}

const openMapForItem = (location: any) => {
  const lat = location?.latitude || '52.2297'
  const lng = location?.longitude || '21.0122'
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
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
  // Simulate AI search - placeholder for future implementation
  await new Promise(resolve => setTimeout(resolve, 2000))
  searchingAI.value = false
  // TODO: Implement AI search logic here
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
