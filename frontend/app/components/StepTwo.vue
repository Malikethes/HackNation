<template>
  <v-form ref="form" @update:model-value="$emit('update:valid', $event)">
    <div class="mb-10">
      <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">Address</h3>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            :model-value="formData.province"
            @update:model-value="formData.province = $event"
            :items="provinces"
            label="Province"
            variant="outlined"
            color="primary"
            placeholder="Select province"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.city"
            @update:model-value="formData.city = $event"
            label="City/Town"
            variant="outlined"
            color="primary"
            placeholder="E.g., Warsaw"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.street"
            @update:model-value="formData.street = $event"
            label="Street and number"
            variant="outlined"
            color="primary"
            placeholder="E.g., Aleje Jerozolimskie 97"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.postalCode"
            @update:model-value="formData.postalCode = $event"
            label="Postal code"
            variant="outlined"
            color="primary"
            placeholder="E.g., 00-001"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
    </div>

    <div class="mb-10">
      <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">Date and Time</h3>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.dateDiscovery"
            @update:model-value="formData.dateDiscovery = $event"
            type="date"
            label="Date of discovery"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-calendar"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.timeDiscovery"
            @update:model-value="formData.timeDiscovery = $event"
            type="time"
            label="Approximate time of discovery"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-clock-outline"
          />
        </v-col>
      </v-row>
    </div>

    <MapLocation :formData="formData" />
  </v-form>
</template>

<script setup lang="ts">
defineProps<{
  formData: any
  provinces: string[]
  rules: any
  valid: boolean
}>()

defineEmits(['update:valid'])

const form = ref(null)
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}
</style>
