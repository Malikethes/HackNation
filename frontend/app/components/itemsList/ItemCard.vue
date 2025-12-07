<template>
  <v-card elevation="2" rounded="lg" hover class="item-card">
    <v-img
      :src="item.photoUrl || 'https://via.placeholder.com/400x300?text=No+Image'"
      height="250"
      cover
      class="item-image"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </template>
    </v-img>

    <v-card-text class="pb-2">
      <div class="d-flex align-center justify-space-between mb-2">
        <h3 class="text-h6 font-weight-bold text-truncate" style="max-width: 200px">
          {{ item.name }}
        </h3>
        <v-chip
          :color="item.status === 'Published' ? 'success' : 'warning'"
          size="small"
          variant="flat"
        >
          {{ item.status }}
        </v-chip>
      </div>

      <p class="text-body-2 text-medium-emphasis mb-2">
        <v-icon size="small" class="mr-1">mdi-tag</v-icon>
        {{ item.category }}
      </p>

      <p class="text-caption text-medium-emphasis mb-3">
        <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
        {{ item.dateAdded }}
      </p>

      <p class="text-body-2 item-description">
        {{ item.description }}
      </p>
    </v-card-text>

    <v-card-actions class="px-4 pb-4 pt-0">
      <v-btn
        variant="tonal"
        color="primary"
        size="small"
        prepend-icon="mdi-eye"
        @click="$emit('view', item)"
        block
      >
        View Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  item: any
}>()

defineEmits(['view'])
</script>

<style scoped>
.item-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
}

.item-image {
  flex-shrink: 0;
}

.item-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}
</style>
