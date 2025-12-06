<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col sm:flex-row flex-wrap items-end gap-6">
      <label class="flex flex-col min-w-40 flex-1 mt-4">
        <p class="text-base font-medium pb-2">First Name</p>
        <v-text-field
          :model-value="formData.contactPerson"
          @update:model-value="formData.contactPerson = $event"
          variant="outlined"
          color="primary"
          placeholder="e.g. John"
          hide-details="auto"
          :rules="[rules.required]"
        />
      </label>
      <label class="flex flex-col min-w-40 flex-1">
        <p class="text-base font-medium pb-2 mt-4">Last Name</p>
        <v-text-field
          variant="outlined"
          color="primary"
          placeholder="e.g. Smith"
          hide-details="auto"
        />
      </label>
    </div>

    <div class="flex flex-col sm:flex-row flex-wrap items-end gap-6">
      <label class="flex flex-col min-w-40 flex-1">
        <p class="text-base font-medium pb-2 mt-4">Phone Number</p>
        <v-text-field
          :model-value="formData.contactPhone"
          @update:model-value="formData.contactPhone = $event"
          variant="outlined"
          color="primary"
          placeholder="e.g. +44 123 456 789"
          hide-details="auto"
          :rules="[rules.required, rules.phone]"
        />
      </label>
      <label class="flex flex-col min-w-40 flex-1">
        <p class="text-base font-medium pb-2 mt-4">Email Address</p>
        <v-text-field
          :model-value="formData.contactEmail"
          @update:model-value="formData.contactEmail = $event"
          variant="outlined"
          color="primary"
          placeholder="e.g. john.smith@email.com"
          type="email"
          hide-details="auto"
          :rules="[rules.required, rules.email]"
        />
      </label>
    </div>
  </div>
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
