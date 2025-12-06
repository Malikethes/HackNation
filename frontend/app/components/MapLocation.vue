<template>
  <div class="mb-6">
    <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">Precise Location on Map</h3>
    <p class="text-body-2 text-medium-emphasis mb-4">
      Drag the pin to precisely mark the location on the map, or click on the map to set it.
    </p>

    <v-card elevation="2" rounded="lg" class="overflow-hidden position-relative" style="height: 400px">
      <v-img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX7v1ANTPXQq9KSJkIuaJJPs4aEpjbkQ81m6WRY_mOhe9ZRoc3s_G_b3U-3ryOci6FbvsXRXlwihWXyuC-iyCNsx5Uqj_T3mKWjhcuxpD0p1hM9mCJIgusllL0Td29j_M1nJrxpe9W6YSIWkNtaVgJlnybozw89kSwBi4CsYIdGpJT3Yr3oX7P-gwgZuK4WzIjtQojsAEKzGNPR_BGzioo8bUHb5tUsjkIHP0ejCSH2sHIJtMCNs9ZsXlhQuhChNSpLeOZg8KuHyU"
        alt="Map"
        cover
        height="100%"
      />
      <div class="map-pin">
        <v-icon size="60" color="error">mdi-map-marker</v-icon>
      </div>
    </v-card>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-text-field
          :model-value="formData.latitude"
          label="Latitude"
          variant="outlined"
          color="primary"
          readonly
          disabled
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :model-value="formData.longitude"
          label="Longitude"
          variant="outlined"
          color="primary"
          readonly
          disabled
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formData: any
}>()
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}

.map-pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}
</style>
