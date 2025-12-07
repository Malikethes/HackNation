<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center pa-6">
        <div>
          <h3 class="text-h5 font-weight-bold mb-1">Find Your Item with AI</h3>
          <p class="text-body-2 text-medium-emphasis">Upload a photo and let AI help you find matching items</p>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="$emit('update:modelValue', false)" />
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-6">
        <div v-if="!uploadedPhoto" class="upload-area" @click="triggerFileInput">
          <v-icon size="64" color="primary" class="mb-4">mdi-cloud-upload</v-icon>
          <p class="text-h6 mb-2">Upload a photo</p>
          <p class="text-body-2 text-medium-emphasis mb-4">Click to browse or drag and drop</p>
          <v-btn color="primary" variant="tonal">Choose File</v-btn>
          <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleFileUpload" />
        </div>
        
        <div v-else class="uploaded-preview">
          <v-img :src="uploadedPhoto" class="rounded-lg mb-4" max-height="300" contain />
          <div class="d-flex gap-2 mb-4">
            <v-btn variant="outlined" color="error" @click="removePhoto" prepend-icon="mdi-delete">Remove Photo</v-btn>
            <v-btn variant="outlined" @click="triggerFileInput" prepend-icon="mdi-camera">Change Photo</v-btn>
          </div>
          <v-divider class="my-4" />
          <v-btn color="primary" size="large" block prepend-icon="mdi-magnify" :loading="searchingAI" @click="searchWithAI">
            Search with AI
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits(['update:modelValue'])

const {
  uploadedPhoto,
  fileInput,
  searchingAI,
  triggerFileInput,
  handleFileUpload,
  removePhoto,
  searchWithAI
} = useAISearch()
</script>

<style scoped>
.upload-area {
  border: 2px dashed rgb(var(--v-theme-primary));
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-area:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
  border-color: rgb(var(--v-theme-primary));
}

.uploaded-preview {
  text-align: center;
}
</style>
