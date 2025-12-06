<template>
  <div>
    <v-card elevation="1" rounded="lg" class="mb-6">
      <v-card-title class="text-h6 font-weight-bold pa-6">
        Item Details
      </v-card-title>
      <v-card-text class="pa-6 pt-0">
        <v-divider class="mb-4" />
        
        <div class="summary-row">
          <span class="summary-label">Category / Item Type</span>
          <span class="summary-value">{{ formData.itemType || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Detailed Description</span>
          <span class="summary-value">{{ formData.description || 'Not specified' }}</span>
        </div>
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Unique Identifiers</span>
          <span class="summary-value">{{ formData.uniqueIdentifiers || 'None' }}</span>
        </div>
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
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="0" rounded="lg" class="overflow-hidden" height="250">
              <v-img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY574PyvwW_vqNGAijaKTUlhov6b33stomHgh_A-xVaPYLJpqmg1D1Wkp54easDLiCK8vQGLLu9QCgS4eHhJKWDTDT1TxI0rDkGDboVo02v5XXV_K_x79K2NGTQ3pmIP2Sb1Vlp4vX9ywJjNNS57tM4HjAVqxL1n8scZOwCAmxh4IUpMMSG-Ndoh9NYka6L3SanrFg-WihVnnyaGuH9YRXKja6XsIvzGgfyNDbW-6k4062NDgD_UL1kRkwViHRFNSkzLSPtpt5xEA"
                alt="Map"
                cover
                height="100%"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card elevation="1" rounded="lg" class="mb-6">
      <v-card-title class="text-h6 font-weight-bold pa-6">
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
        <v-divider />
        
        <div class="summary-row">
          <span class="summary-label">Storage Address</span>
          <span class="summary-value">{{ formData.storageAddress || 'Not specified' }}</span>
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
        @click="$emit('cancel')"
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
        @click="$emit('confirm')"
      >
        Publish Data
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formData: any
}>()

defineEmits(['confirm', 'edit', 'cancel'])
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
