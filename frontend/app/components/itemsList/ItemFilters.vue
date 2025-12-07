<template>
  <div class="d-flex flex-wrap gap-3">
    <v-text-field
        class="mr-2"
      :model-value="search"
      @update:model-value="$emit('update:search', $event)"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search items..."
      variant="outlined"
      density="comfortable"
      hide-details
      style="flex: 1; min-width: 250px; max-width: 500px"
    />
    
    <v-select
        class="mr-2"
      :model-value="filterCategory"
      @update:model-value="$emit('update:filterCategory', $event)"
      :items="categoryOptions"
      label="Category"
      variant="outlined"
      density="comfortable"
      hide-details
      clearable
      prepend-inner-icon="mdi-tag"
      style="min-width: 180px"
    />
    
    <v-select
        class="mr-2"
      :model-value="filterStatus"
      @update:model-value="$emit('update:filterStatus', $event)"
      :items="statusOptions"
      label="Status"
      variant="outlined"
      density="comfortable"
      hide-details
      clearable
      prepend-inner-icon="mdi-information"
      style="min-width: 150px"
    />
    
    <v-select
        class="mr-2"
      :model-value="sortBy"
      @update:model-value="$emit('update:sortBy', $event)"
      :items="sortOptions"
      label="Sort By"
      variant="outlined"
      density="comfortable"
      hide-details
      prepend-inner-icon="mdi-sort"
      style="min-width: 180px"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  search: string
  filterCategory: string | null
  filterStatus: string | null
  sortBy: string
  categoryOptions: string[]
}>()

defineEmits(['update:search', 'update:filterCategory', 'update:filterStatus', 'update:sortBy'])

const statusOptions = [
  { title: 'Published', value: 'Published' },
  { title: 'Draft', value: 'Draft' },
  { title: 'Archived', value: 'Archived' }
]

const sortOptions = [
  { title: 'Date (Newest First)', value: 'dateNewest' },
  { title: 'Date (Oldest First)', value: 'dateOldest' },
  { title: 'Name (A-Z)', value: 'nameAsc' },
  { title: 'Name (Z-A)', value: 'nameDesc' },
  { title: 'Category', value: 'category' }
]
</script>
