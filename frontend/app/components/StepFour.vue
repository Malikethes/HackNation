<template>
  <v-form ref="form" @update:model-value="$emit('update:valid', $event)">
    <v-card elevation="0" rounded="lg" class="mb-6 pa-6" style="border: 1px solid rgba(var(--v-theme-on-surface), 0.12);">
      <v-text-field
        :model-value="formData.storageLocation"
        @update:model-value="formData.storageLocation = $event"
        label="Storage Location / Department"
        variant="outlined"
        color="primary"
        :rules="[rules.required]"
        prepend-inner-icon="mdi-office-building"
        density="comfortable"
        class="mb-4"
      />

      <v-textarea
        :model-value="formData.storageAddress"
        @update:model-value="formData.storageAddress = $event"
        label="Detailed Pickup Address"
        variant="outlined"
        color="primary"
        :rules="[rules.required]"
        prepend-inner-icon="mdi-map-marker"
        rows="3"
        density="comfortable"
        class="mb-4"
      />

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.storagePhone"
            @update:model-value="formData.storagePhone = $event"
            label="Storage Contact Phone"
            variant="outlined"
            color="primary"
            :rules="[rules.required, rules.phone]"
            prepend-inner-icon="mdi-phone"
            density="comfortable"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.storageEmail"
            @update:model-value="formData.storageEmail = $event"
            label="Storage Contact Email"
            variant="outlined"
            color="primary"
            type="email"
            :rules="[rules.email]"
            prepend-inner-icon="mdi-email"
            density="comfortable"
          />
        </v-col>
      </v-row>

      <v-textarea
        :model-value="formData.storageInstructions"
        @update:model-value="formData.storageInstructions = $event"
        label="Pickup Instructions (Optional)"
        variant="outlined"
        color="primary"
        prepend-inner-icon="mdi-information"
        rows="3"
        density="comfortable"
        class="mt-4"
      />
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
defineProps<{
  formData: any
  rules: any
  valid: boolean
}>()

defineEmits(['update:valid'])

const form = ref(null)
</script>