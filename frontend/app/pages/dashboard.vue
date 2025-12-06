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
          <v-btn color="primary" prepend-icon="mdi-plus-circle" size="large" @click="navigateTo('/')">
            Add New Item
          </v-btn>
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

              <template #item.status="{ item }">
                <v-chip
                  :color="item.status === 'Published' ? 'success' : 'warning'"
                  size="small"
                  variant="flat"
                >
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const search = ref('')
const items = ref<any[]>([])
const loading = ref(false)
const stats = ref({
  totalItems: 0,
  itemsThisMonth: 0,
  itemsAwaitingPublication: 0
})

const headers = [
  { title: 'Item ID', key: 'id', sortable: true },
  { title: 'Description', key: 'description', sortable: true },
  { title: 'Category', key: 'category', sortable: true },
  { title: 'Date Added', key: 'dateAdded', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
]

const { fetchItems } = useApi()

const loadData = async () => {
  loading.value = true
  try {
    const response = await fetchItems()
    const itemsArray = Array.isArray(response) ? response : []

    items.value = itemsArray.map((item: any) => ({
      id: `#${item.id}`,
      description: item.description || item.name || 'No description',
      category: item.category?.name || 'Uncategorized',
      dateAdded: new Date(item.dateLost || item.createdAt).toLocaleDateString('en-CA'),
      status: item.status === 1 ? 'Published' : 'Draft',
      rawStatus: item.status
    }))

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
</style>
