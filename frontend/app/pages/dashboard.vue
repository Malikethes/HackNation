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
        <v-list-item
          prepend-icon="mdi-format-list-text"
          title="All Items"
          value="all-items"
          rounded="lg"
          class="mb-2"
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
                <p class="text-h4 font-weight-bold">1,234</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-card elevation="1" rounded="lg">
              <v-card-text>
                <p class="text-body-1 text-medium-emphasis mb-2">Items Found this Month</p>
                <p class="text-h4 font-weight-bold">89</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-card elevation="1" rounded="lg">
              <v-card-text>
                <p class="text-body-1 text-medium-emphasis mb-2">Items Awaiting Publication</p>
                <p class="text-h4 font-weight-bold">12</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card elevation="1" rounded="lg">
          <v-card-text>
            <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between mb-6">
              <div class="mb-4 mb-sm-0">
                <h3 class="text-h6 font-weight-bold mb-1">Recently Published Items</h3>
                <p class="text-body-2 text-medium-emphasis">A list of the most recently added items.</p>
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

const headers = [
  { title: 'Item ID', key: 'id', sortable: true },
  { title: 'Description', key: 'description', sortable: true },
  { title: 'Category', key: 'category', sortable: true },
  { title: 'Date Added', key: 'dateAdded', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
]


// Sample data
const items = ref([
  {
    id: '#1203',
    description: 'Black Leather Wallet',
    category: 'Personal Items',
    dateAdded: '2023-10-26',
    status: 'Published',
  },
  {
    id: '#1202',
    description: 'iPhone 14 Pro',
    category: 'Electronics',
    dateAdded: '2023-10-25',
    status: 'Published',
  },
  {
    id: '#1201',
    description: 'Set of Keys',
    category: 'Keys',
    dateAdded: '2023-10-24',
    status: 'Draft',
  },
  {
    id: '#1200',
    description: 'Blue Bicycle',
    category: 'Vehicles',
    dateAdded: '2023-10-23',
    status: 'Published',
  },
  {
    id: '#1199',
    description: 'Brown Sunglasses',
    category: 'Accessories',
    dateAdded: '2023-10-22',
    status: 'Published',
  },
])
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
