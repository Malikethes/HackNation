<template>
  <div class="flex flex-col gap-8">
    <label class="flex flex-col mt-4">
      <p class="text-base font-medium pb-2">Finder's Full Name (Optional)</p>
      <v-text-field
        :model-value="formData.contactPerson"
        @update:model-value="formData.contactPerson = $event"
        variant="outlined"
        color="primary"
        placeholder="Enter full name"
        hide-details="auto"
      />
    </label>

    <label class="flex flex-col">
      <p class="text-base font-medium pb-2 mt-4">Finder's Contact Phone (Optional)</p>
      <v-text-field
        :model-value="formData.contactPhone"
        @update:model-value="formData.contactPhone = $event"
        variant="outlined"
        color="primary"
        placeholder="Enter contact phone"
        type="tel"
        hide-details="auto"
        :rules="[rules.phone]"
      />
    </label>

    <label class="flex flex-col">
      <p class="text-base font-medium pb-2 mt-4">Finder's Email Address (Optional)</p>
      <v-text-field
        :model-value="formData.contactEmail"
        @update:model-value="formData.contactEmail = $event"
        variant="outlined"
        color="primary"
        placeholder="Enter email address"
        type="email"
        hide-details="auto"
        :rules="[rules.email]"
      />
    </label>
  </div>
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
