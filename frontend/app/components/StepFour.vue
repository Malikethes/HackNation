<template>
  <v-form ref="form" @update:model-value="$emit('update:valid', $event)">
    <v-card elevation="0" rounded="lg" class="mb-6 pa-6" style="border: 1px solid rgba(var(--v-theme-on-surface), 0.12);">
      <h3 class="text-h6 font-weight-bold mb-6">Contact & Pickup Information</h3>
      
      <v-text-field
        :model-value="formData.contactPerson"
        @update:model-value="formData.contactPerson = $event"
        label="Contact Person / Department"
        variant="outlined"
        color="primary"
        placeholder="Enter the name of the contact person or department"
        :rules="[rules.required]"
        density="comfortable"
        class="mb-4"
      />

      <v-row class="mb-4">
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.contactPhone"
            @update:model-value="formData.contactPhone = $event"
            label="Contact Phone"
            variant="outlined"
            color="primary"
            placeholder="Enter phone number"
            :rules="[rules.required, rules.phone]"
            density="comfortable"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.contactEmail"
            @update:model-value="formData.contactEmail = $event"
            label="Contact Email"
            variant="outlined"
            color="primary"
            placeholder="Enter email address"
            type="email"
            :rules="[rules.required, rules.email]"
            density="comfortable"
          />
        </v-col>
      </v-row>

      <v-textarea
        :model-value="formData.storageAddress"
        @update:model-value="formData.storageAddress = $event"
        label="Storage Location / Pickup Address"
        variant="outlined"
        color="primary"
        :rules="[rules.required]"
        rows="4"
        density="comfortable"
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