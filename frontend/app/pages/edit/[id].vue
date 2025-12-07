<template>
  <v-app>
    <v-app-bar elevation="0" color="surface" class="border-b">
      <v-container>
        <div class="d-flex align-center">
          <v-btn icon variant="text" @click="navigateTo('/dashboard')">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h2 class="text-h6 font-weight-bold ml-4">Edit Item</h2>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8">
        <v-card max-width="800" class="mx-auto" elevation="1" rounded="lg">
          <v-card-text class="pa-6 pa-md-8">
            <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
              <!-- Item Photo -->
              <div v-if="itemData.photoUrl" class="mb-6 text-center">
                <v-img
                  :src="itemData.photoUrl"
                  max-height="300"
                  contain
                  class="rounded-lg mb-4"
                />
                <v-file-input
                  v-model="newPhoto"
                  label="Upload new photo"
                  accept="image/*"
                  variant="outlined"
                  prepend-icon=""
                  prepend-inner-icon="mdi-camera"
                  density="comfortable"
                  clearable
                />
              </div>

              <!-- Item Name -->
              <v-text-field
                v-model="itemData.name"
                label="Item Name"
                variant="outlined"
                color="primary"
                class="mb-4"
                :rules="[rules.required]"
              />

              <!-- Description -->
              <v-textarea
                v-model="itemData.description"
                label="Description"
                variant="outlined"
                color="primary"
                rows="4"
                class="mb-4"
                :rules="[rules.required]"
              />

              <!-- Category -->
              <v-select
                v-model="itemData.categoryId"
                :items="categories"
                item-title="name"
                item-value="id"
                label="Category"
                variant="outlined"
                color="primary"
                class="mb-4"
                :rules="[rules.required]"
              />

              <!-- Date Lost -->
              <v-text-field
                v-model="itemData.dateLost"
                type="date"
                label="Date Lost"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-calendar"
                class="mb-4"
                :rules="[rules.required]"
              />

              <!-- Time Lost -->
              <v-text-field
                v-model="itemData.timeLost"
                type="time"
                label="Time Lost"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-clock-outline"
                class="mb-4"
              />

              <!-- Status -->
              <div class="mb-6">
                <v-select
                  v-model="itemData.status"
                  :items="statusOptions"
                  label="Status"
                  variant="outlined"
                  color="primary"
                  :rules="[rules.required]"
                />
                <v-chip
                  v-if="itemData.status === 2"
                  color="grey"
                  size="small"
                  class="mt-2"
                  prepend-icon="mdi-archive"
                >
                  Archived
                </v-chip>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex gap-4">
                <v-btn
                  variant="outlined"
                  color="grey"
                  size="large"
                  @click="navigateTo('/dashboard')"
                  class="flex-grow-1"
                >
                  Cancel
                </v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  :loading="submitting"
                  :disabled="!valid || submitting"
                  class="flex-grow-1"
                >
                  Save Changes
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <!-- Success Snackbar -->
    <v-snackbar v-model="showSuccess" color="success" timeout="3000">
      Item updated successfully!
    </v-snackbar>

    <!-- Error Snackbar -->
    <v-snackbar v-model="showError" color="error" timeout="5000">
      {{ errorMessage }}
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
const {
  form,
  valid,
  submitting,
  showSuccess,
  showError,
  errorMessage,
  newPhoto,
  itemData,
  categories,
  statusOptions,
  rules,
  handleSubmit,
  initialize
} = useItemEdit()

onMounted(() => {
  initialize()
})
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}
</style>
