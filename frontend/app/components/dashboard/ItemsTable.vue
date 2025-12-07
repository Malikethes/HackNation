<template>
  <v-card elevation="1" rounded="lg">
    <v-card-text>
      <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between mb-6">
        <div class="mb-4 mb-sm-0">
          <h3 class="text-h6 font-weight-bold mb-1">All Published Items</h3>
        </div>
        <v-text-field
          :model-value="search"
          @update:model-value="$emit('update:search', $event)"
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
            :color="item.status === 'Published' ? 'success' : (item.status === 'Archived' ? 'grey' : 'warning')"
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
              @click="$emit('view', item)"
            />
            <v-btn
              v-if="item.rawStatus === 0"
              icon="mdi-pencil"
              size="small"
              variant="text"
              color="primary"
              @click="$emit('edit', item)"
            />
            <v-btn
              v-if="item.rawStatus === 0"
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              @click="$emit('delete', item)"
            />
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  search: string
  items: any[]
  loading: boolean
}>()

defineEmits(['update:search', 'view', 'edit', 'delete'])

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
</script>
