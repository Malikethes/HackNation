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

    <v-text-field
      :model-value="formData.uniqueIdentifiers"
      @update:model-value="formData.uniqueIdentifiers = $event"
      variant="outlined"
      color="primary"
      placeholder="e.g., Serial number, name tag, specific scratches"
      class="mb-4"
    >
      <template #label>
        <div class="d-flex align-center">
          <span>List any unique identifiers (optional)</span>
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-icon v-bind="props" size="small" class="ml-2">
                mdi-help-circle-outline
              </v-icon>
            </template>
            <span>Include details like serial numbers, engravings, name tags, or specific scratches that can uniquely identify the item.</span>
          </v-tooltip>
        </div>
      </template>
    </v-text-field>
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

