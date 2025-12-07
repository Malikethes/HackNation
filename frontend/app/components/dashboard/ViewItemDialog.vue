<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600">
    <v-card v-if="item">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Item Details</span>
        <v-btn icon="mdi-close" variant="text" @click="$emit('update:modelValue', false)" />
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-6">
        <v-img
          v-if="item.photoUrl"
          :src="item.photoUrl"
          class="mb-4 rounded-lg"
          height="300"
          cover
        />
        <div class="mb-3">
          <p class="text-caption text-medium-emphasis">Item ID</p>
          <p class="text-body-1 font-weight-medium">{{ item.id }}</p>
        </div>
        <div class="mb-3">
          <p class="text-caption text-medium-emphasis">Description</p>
          <p class="text-body-1">{{ item.description }}</p>
        </div>
        <div class="mb-3">
          <p class="text-caption text-medium-emphasis">Category</p>
          <p class="text-body-1">{{ item.category }}</p>
        </div>
        <div class="mb-3">
          <p class="text-caption text-medium-emphasis">Date Added</p>
          <p class="text-body-1">{{ item.dateAdded }}</p>
        </div>
        <div>
          <p class="text-caption text-medium-emphasis">Status</p>
          <v-chip
            :color="item.status === 'Published' ? 'success' : 'warning'"
            size="small"
            variant="flat"
          >
            {{ item.status }}
          </v-chip>
        </div>
        <div v-if="item.location" class="mt-4">
          <p class="text-caption text-medium-emphasis mb-2">Location on Map</p>
          <v-card elevation="0" rounded="lg" class="overflow-hidden">
            <iframe
              :src="getMapUrl(item.location)"
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
            @click="openMapForItem(item.location)"
          >
            View on Google Maps
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  item: any | null
}>()

defineEmits(['update:modelValue'])

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
</script>
