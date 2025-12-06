<template>
  <v-form ref="form" @update:model-value="$emit('update:valid', $event)">
    <v-select
      :model-value="formData.itemType"
      @update:model-value="formData.itemType = $event"
      :items="itemTypes"
      label="What type of item is it?"
      variant="outlined"
      color="primary"
      class="mb-4"
      :rules="[rules.required]"
      placeholder="Select item type"
    />

    <v-textarea
      :model-value="formData.description"
      @update:model-value="formData.description = $event"
      label="Provide a brief description"
      variant="outlined"
      color="primary"
      rows="4"
      class="mb-4"
      :rules="[rules.required]"
    />

  </v-form>
</template>

<script setup lang="ts">
defineProps<{
  formData: any
  itemTypes: any[]
  rules: any
  valid: boolean
}>()

defineEmits(['update:valid'])

const form = ref(null)
</script>

