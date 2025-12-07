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
          active
        />
        <v-list-item
          prepend-icon="mdi-format-list-bulleted-square"
          title="Items List"
          value="items"
          color="primary"
          rounded="lg"
          class="mb-2"
          @click="navigateTo('/items')"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" color="surface" class="border-b"/>

    <v-main>
      <v-container fluid class="pa-6 pa-md-8 pa-lg-10">
        <div class="d-flex flex-wrap align-center justify-space-between mb-6">
          <h1 class="text-h3 font-weight-black">Dashboard</h1>
          <div class="d-flex gap-3">
            <v-btn color="primary" prepend-icon="mdi-plus-circle" size="large" @click="navigateTo('/')">
              Add New Item
            </v-btn>
          </div>
        </div>

        <StatsCards :stats="stats" />

        <ItemsTable
          v-model:search="search"
          :items="items"
          :loading="loading"
          @view="viewItem"
          @edit="editItem"
          @delete="deleteItemConfirm"
        />
      </v-container>
    </v-main>

    <ViewItemDialog
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

    <AISearchDialog v-model="aiSearchDialog" />
  </v-app>
</template>

<script setup lang="ts">
import StatsCards from '~/components/dashboard/StatsCards.vue'
import ItemsTable from '~/components/dashboard/ItemsTable.vue'
import ViewItemDialog from '~/components/dashboard/ViewItemDialog.vue'
import AISearchDialog from '~/components/dashboard/AISearchDialog.vue'

const search = ref('')
const deleteDialog = ref(false)
const viewDialog = ref(false)
const selectedItem = ref<any>(null)
const aiSearchDialog = ref(false)

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
