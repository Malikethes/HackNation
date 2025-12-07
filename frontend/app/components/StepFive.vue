<template>
  <div>
    <v-card elevation="1" rounded="lg" class="mb-6">
      <v-card-title class="text-h6 font-weight-bold pa-6">
        Item Details
      </v-card-title>
      <v-card-text class="pa-6 pt-0">
        <v-divider class="mb-4" />
        
        <div class="summary-row">
          <span class="summary-label">Item Name</span>
          <span class="summary-value">{{ formData.itemType || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Category</span>
          <span class="summary-value">{{ formData.itemType || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Detailed Description</span>
          <span class="summary-value">{{ formData.description || 'Not specified' }}</span>
        </div>
        <v-divider />
        
      </v-card-text>
    </v-card>

    <v-card elevation="1" rounded="lg" class="mb-6">
      <v-card-title class="text-h6 font-weight-bold pa-6">
        Place and Time of Finding
      </v-card-title>

      <v-card-text class="pa-6 pt-0">
        <v-row>
          <v-col cols="12" md="6">
            <div class="mb-5">
              <div class="d-flex mb-2">
                <span class="location-label">Location</span>
              </div>
              <span class="location-value">{{ formData.street }}, {{ formData.city }}, {{ formData.province }}</span>
            </div>
            <div class="mb-5">
              <div class="d-flex mb-2">
                <span class="location-label">Date of finding</span>
              </div>
              <span class="location-value">{{ formData.dateDiscovery || 'Not specified' }}</span>
            </div>
            <div class="mb-5">
              <div class="d-flex mb-2">
                <span class="location-label">Time of finding</span>
              </div>
              <span class="location-value">{{ formData.timeDiscovery || 'Not specified' }}</span>
            </div>
            <div class="mb-5">
              <div class="d-flex mb-2">
                <span class="location-label">Coordinates</span>
              </div>
              <span class="location-value">{{ formData.latitude }}, {{ formData.longitude }}</span>
            </div>
            <v-btn
              color="primary"
              variant="tonal"
              prepend-icon="mdi-map-marker"
              @click="openMapLink"
              block
            >
              View on Google Maps
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="0" rounded="lg" class="overflow-hidden" height="300">
              <iframe
                :src="mapUrl"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card elevation="1" rounded="lg" class="mb-6">
      <v-card-title class="text-h6 font-weight-bold pa-6">
        <v-icon icon="mdi-account" class="mr-2" color="primary" />
        Finder's Details
      </v-card-title>
      <v-card-text class="pa-6 pt-0">
        <v-divider class="mb-4" color="grey-lighten-2" />
        
        <div class="summary-row">
          <span class="summary-label">Full Name</span>
          <span class="summary-value">{{ formData.contactPerson || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Phone Number</span>
          <span class="summary-value">{{ formData.contactPhone || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Email Address</span>
          <span class="summary-value">{{ formData.contactEmail || 'Not specified' }}</span>
        </div>
      </v-card-text>
    </v-card>

    <v-card elevation="1" rounded="lg" class="mb-6">
      <v-card-title class="text-h6 font-weight-bold pa-6">
        <v-icon icon="mdi-package-variant-closed" class="mr-2" color="primary" />
        Storage Information
      </v-card-title>
      <v-card-text class="pa-6 pt-0">
        <v-divider class="mb-4" color="grey-lighten-2" />
        
        <div class="summary-row">
          <span class="summary-label">Storage Location</span>
          <span class="summary-value">{{ formData.storageLocation || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Pickup Address</span>
          <span class="summary-value">{{ formData.storageAddress || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Storage Contact Phone</span>
          <span class="summary-value">{{ formData.storagePhone || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Storage Contact Email</span>
          <span class="summary-value">{{ formData.storageEmail || 'Not specified' }}</span>
        </div>
        <v-divider v-if="formData.storageInstructions" />
        
        <div v-if="formData.storageInstructions" class="summary-row">
          <span class="summary-label">Pickup Instructions</span>
          <span class="summary-value">{{ formData.storageInstructions }}</span>
        </div>
      </v-card-text>
    </v-card>

   <div class="d-flex flex-column-reverse flex-sm-row align-center justify-space-between gap-4 pa-4 mt-6" style="border-top: 1px solid rgba(0, 0, 0, 0.12)">
      <v-btn
        variant="outlined"
        color="slate"
        size="large"
        rounded="lg"
        class="text-none font-weight-semibold"
        :disabled="submitting"
        @click="$emit('save-draft')"
      >
        Save Draft
      </v-btn>
      <v-btn
        color="primary"
        size="large"
        rounded="lg"
        elevation="0"
        class="text-none font-weight-semibold px-6"
        prepend-icon="mdi-check-circle"
        :loading="submitting"
        :disabled="submitting"
        @click="$emit('confirm')"
      >
        Publish Data
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  formData: any
  submitting?: boolean
}>()

defineEmits(['confirm', 'save-draft', 'edit', 'cancel'])

const mapUrl = computed(() => {
  const lat = props.formData.latitude || '52.2297'
  const lng = props.formData.longitude || '21.0122'
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=15`
})

const openMapLink = () => {
  const lat = props.formData.latitude || '52.2297'
  const lng = props.formData.longitude || '21.0122'
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
}
</script>

<style scoped>
.summary-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  padding: 1.25rem 0;
  align-items: start;
}

@media (max-width: 960px) {
  .summary-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

.summary-label {
  font-size: 0.875rem;
  opacity: 0.7;
}

.summary-value {
  font-size: 0.875rem;
  font-weight: 500;
}

.location-label {
  font-size: 0.875rem;
  opacity: 0.7;
  min-width: 120px;
}

.location-value {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
