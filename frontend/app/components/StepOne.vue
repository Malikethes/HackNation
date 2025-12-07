<template>
  <v-form ref="form" @update:model-value="$emit('update:valid', $event)">
    <!-- Photo Upload -->
    <div class="mb-6">
      <v-file-input
        :model-value="formData.photo"
        @update:model-value="formData.photo = $event"
        label="Upload item photo"
        accept="image/*"
        variant="outlined"
        color="primary"
        prepend-icon=""
        prepend-inner-icon="mdi-camera"
        :rules="[rules.required]"
        clearable
        show-size
        class="mb-2"
      >
        <template v-slot:selection="{ fileNames }">
          <v-chip
            color="primary"
            size="small"
            label
          >
            {{ fileNames[0] }}
          </v-chip>
        </template>
      </v-file-input>
      
      <!-- Photo Preview -->
      <v-card
        v-if="photoPreview"
        class="mt-2"
        elevation="2"
        rounded="lg"
      >
        <v-img
          :src="photoPreview"
          max-height="300"
          cover
          class="rounded-lg"
        />
      </v-card>
    </div>

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
const props = defineProps<{
  formData: any
  itemTypes: any[]
  rules: any
  valid: boolean
}>()

defineEmits(['update:valid'])

const form = ref(null)

// Photo preview
const photoPreview = ref<string | null>(null)

watch(() => props.formData.photo, (newPhoto) => {
  if (newPhoto && newPhoto.length > 0) {
    const file = newPhoto[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        photoPreview.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  } else {
    photoPreview.value = null
  }
})
</script>

