<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container class="py-10">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8" xl="7">
            <div class="mb-8">
              <div class="d-flex flex-wrap justify-center align-center gap-3 mb-6">
                <v-chip
                  :color="currentStep > 1 ? 'primary' : 'primary'"
                  :variant="currentStep > 1 ? 'tonal' : 'flat'"
                  :prepend-icon="currentStep > 1 ? 'mdi-check-circle' : 'mdi-numeric-1-circle'"
                  class="px-3"
                >
                  Item Details
                </v-chip>
                <v-chip
                  :color="currentStep > 2 ? 'primary' : currentStep === 2 ? 'primary' : 'default'"
                  :variant="currentStep > 2 ? 'tonal' : currentStep === 2 ? 'flat' : 'tonal'"
                  :prepend-icon="currentStep > 2 ? 'mdi-check-circle' : 'mdi-numeric-2-circle'"
                  class="px-3"
                >
                  Location Info
                </v-chip>
                <v-chip
                  :color="currentStep > 3 ? 'primary' : currentStep === 3 ? 'primary' : 'default'"
                  :variant="currentStep > 3 ? 'tonal' : currentStep === 3 ? 'flat' : 'tonal'"
                  :prepend-icon="currentStep > 3 ? 'mdi-check-circle' : 'mdi-numeric-3-circle'"
                  class="px-3"
                >
                  Finder Info
                </v-chip>
                <v-chip
                  :color="currentStep > 4 ? 'primary' : currentStep === 4 ? 'primary' : 'default'"
                  :variant="currentStep > 4 ? 'tonal' : currentStep === 4 ? 'flat' : 'tonal'"
                  :prepend-icon="currentStep > 4 ? 'mdi-check-circle' : 'mdi-numeric-4-circle'"
                  class="px-3"
                >
                  Review
                </v-chip>
                <v-chip
                  :color="currentStep === 5 ? 'primary' : 'default'"
                  :variant="currentStep === 5 ? 'flat' : 'tonal'"
                  prepend-icon="mdi-numeric-5-circle"
                  class="px-3"
                >
                  Publish
                </v-chip>
              </div>

              <p class="text-body-1 font-weight-medium mb-3">
                Step {{ currentStep }} of {{ totalSteps }}: {{ stepConfig.title }}
              </p>
              <v-progress-linear
                :model-value="stepConfig.progress"
                color="primary"
                height="8"
                rounded
              />
            </div>

            <div v-if="currentStep !== 5" class="flex flex-col gap-6">
              <div v-if="stepConfig.heading" class="flex flex-col gap-2 text-center">
                <h1 class="text-h3 text-md-h4 font-weight-black">
                  {{ stepConfig.heading }}
                </h1>
                <p v-if="stepConfig.description" class="text-body-1 text-medium-emphasis">
                  {{ stepConfig.description }}
                </p>
              </div>

              <v-card elevation="1" rounded="xl" class="pa-6 pa-sm-8 mt-6">

              <StepOne
                v-if="currentStep === 1"
                :formData="formData"
                :itemTypes="itemTypes"
                :rules="rules"
                :valid="valid"
                @update:valid="valid = $event"
              />

              <StepTwo
                v-if="currentStep === 2"
                :formData="formData"
                :provinces="provinces"
                :rules="rules"
                :valid="valid"
                @update:valid="valid = $event"
              />

              <StepThree
                v-if="currentStep === 3"
                :formData="formData"
                :provinces="provinces"
                :rules="rules"
                :valid="valid"
                @update:valid="valid = $event"
              />

              <StepFour
                v-if="currentStep === 4"
                :formData="formData"
                :rules="rules"
                :valid="valid"
                @update:valid="valid = $event"
              />

              </v-card>

              <div class="d-flex flex-column-reverse flex-sm-row align-center justify-space-between gap-3 mt-8 pt-6" style="border-top: 1px solid rgb(var(--v-theme-surface-variant))">
                <v-btn
                  variant="outlined"
                  color="slate"
                  size="large"
                  rounded="lg"
                  class="text-none font-weight-semibold"
                  @click="handleBack"
                >
                  {{ currentStep === 1 ? 'Cancel' : currentStep === 3 ? 'Skip This Step' : 'Back' }}
                </v-btn>
                <v-btn
                  color="primary"
                  size="large"
                  rounded="lg"
                  elevation="0"
                  class="text-none font-weight-semibold px-6"
                  :disabled="!valid && currentStep !== 3"
                  @click="handleNext"
                >
                  Next Step
                </v-btn>
              </div>
            </div>

            <StepFive
              v-if="currentStep === 5"
              :formData="formData"
              :submitting="submitting"
              @confirm="handleConfirm"
              @edit="handleEdit"
              @cancel="handleCancel"
            />

            <v-alert
              v-if="submitError"
              type="error"
              variant="tonal"
              class="mt-4"
              closable
              @click:close="submitError = ''"
            >
              {{ submitError }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const { 
  currentStep, 
  totalSteps, 
  formData, 
  provinces, 
  itemTypes, 
  rules, 
  getStepConfig, 
  nextStep, 
  prevStep 
} = useFormSteps()

const valid =    ref(false)
const form = ref(null)

const stepConfig = computed(() => getStepConfig(currentStep.value))

const handleBack = () => {
  if (currentStep.value === 1) {
    navigateTo('/dashboard')
  } else {
    prevStep()
  }
}

const handleNext = () => {
  if (valid.value) {
    nextStep()
  }
}

const { createItem, createLocation, fetchCategories } = useApi()
const submitting = ref(false)
const submitError = ref('')

const handleConfirm = async () => {
  submitting.value = true
  submitError.value = ''
  
  try {
    // First, get all categories to find the matching one
    const categories: any = await fetchCategories()
    const category = categories.find((cat: any) => 
      cat.name.toLowerCase() === formData.itemType.toLowerCase()
    )
    const categoryId = category?.id || 1 // Fallback to category 1 if not found

    // Create location first
    const locationData = {
      longitude: parseFloat(formData.longitude) || 0,
      latitude: parseFloat(formData.latitude) || 0,
      address: formData.street || 'Unknown Address',
      city: formData.city || 'Unknown City',
      provinceId: 1,
      postalCode: formData.postalCode || '00-000' // Format XX-XXX required by API
    }
    
    console.log('Creating location with data:', locationData)
    const location: any = await createLocation(locationData)
    console.log('Location created:', location)
    
    // Create item with location using FormData
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.itemType || 'Unknown Item')
    formDataToSend.append('description', formData.description || 'No description')
    formDataToSend.append('dateLost', formData.dateDiscovery || new Date().toISOString().split('T')[0])
    if (formData.timeDiscovery) {
      formDataToSend.append('timeLost', formData.timeDiscovery)
    }
    formDataToSend.append('categoryId', categoryId.toString())
    formDataToSend.append('locationId', location.id.toString())
    formDataToSend.append('status', '1') // 0 = Draft
    
    console.log('Creating item with FormData')
    await createItem(formDataToSend)
    
    // Success - redirect to dashboard
    await navigateTo('/dashboard')
  } catch (error: any) {
    console.error('Failed to submit item:', error)
    submitError.value = error.message || 'Failed to submit item. Please try again.'
  } finally {
    submitting.value = false
  }
}

const handleEdit = () => {
  currentStep.value = 1
}

const handleCancel = () => {
  navigateTo('/dashboard')
}
</script>


