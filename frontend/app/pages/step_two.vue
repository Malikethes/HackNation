<template>
  <v-app>
    <AppBar />

    <v-main>
      <v-container class="py-5 py-sm-8 py-lg-12">
        <v-row justify="center">
          <v-col cols="12" lg="10" xl="8">
            <div class="mb-8">
              <p class="text-body-1 font-weight-medium mb-3">
                Step 3 of 5: Location Details
              </p>
              <v-progress-linear
                :model-value="60"
                color="primary"
                height="8"
                rounded
              />
            </div>

            <v-card elevation="1" rounded="xl" class="overflow-hidden">

              <!-- Main Content -->
              <div class="pa-6 pa-sm-8">
                <h2 class="text-h4 text-md-h3 font-weight-black mb-2">
                  Specify the place and time of discovery
                </h2>

                <v-form ref="form" v-model="valid" class="mt-8">
                  <!-- Address Section -->
                  <div class="mb-10">
                    <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">
                      Address
                    </h3>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="formData.province"
                          :items="provinces"
                          label="Province"
                          variant="outlined"
                          color="primary"
                          placeholder="Select province"
                          :rules="[rules.required]"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.city"
                          label="City/Town"
                          variant="outlined"
                          color="primary"
                          placeholder="E.g., Warsaw"
                          :rules="[rules.required]"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.street"
                          label="Street and number"
                          variant="outlined"
                          color="primary"
                          placeholder="E.g., Aleje Jerozolimskie 97"
                          :rules="[rules.required]"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.postalCode"
                          label="Postal code"
                          variant="outlined"
                          color="primary"
                          placeholder="E.g., 00-001"
                          :rules="[rules.required]"
                        />
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Date and Time Section -->
                  <div class="mb-10">
                    <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">
                      Date and Time
                    </h3>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.dateDiscovery"
                          type="date"
                          label="Date of discovery"
                          variant="outlined"
                          color="primary"
                          prepend-inner-icon="mdi-calendar"
                          :rules="[rules.required]"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.timeDiscovery"
                          type="time"
                          label="Approximate time of discovery"
                          variant="outlined"
                          color="primary"
                          prepend-inner-icon="mdi-clock-outline"
                        />
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Map Section -->
                  <div class="mb-6">
                    <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">
                      Precise Location on Map
                    </h3>
                    <p class="text-body-2 text-medium-emphasis mb-4">
                      Drag the pin to precisely mark the location on the map, or click on the map to set it.
                    </p>

                    <!-- Map Container -->
                    <v-card elevation="2" rounded="lg" class="overflow-hidden position-relative" style="height: 400px">
                      <v-img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX7v1ANTPXQq9KSJkIuaJJPs4aEpjbkQ81m6WRY_mOhe9ZRoc3s_G_b3U-3ryOci6FbvsXRXlwihWXyuC-iyCNsx5Uqj_T3mKWjhcuxpD0p1hM9mCJIgusllL0Td29j_M1nJrxpe9W6YSIWkNtaVgJlnybozw89kSwBi4CsYIdGpJT3Yr3oX7P-gwgZuK4WzIjtQojsAEKzGNPR_BGzioo8bUHb5tUsjkIHP0ejCSH2sHIJtMCNs9ZsXlhQuhChNSpLeOZg8KuHyU"
                        alt="Satellite map view of a city with streets and buildings"
                        cover
                        height="100%"
                      />
                      <div class="map-pin">
                        <v-icon size="60" color="error">mdi-map-marker</v-icon>
                      </div>
                    </v-card>

                    <!-- Coordinates -->
                    <v-row class="mt-4">
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.latitude"
                          label="Latitude"
                          variant="outlined"
                          color="primary"
                          readonly
                          disabled
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.longitude"
                          label="Longitude"
                          variant="outlined"
                          color="primary"
                          readonly
                          disabled
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </div>

              <div class="d-flex justify-space-between align-center py-6 px-6">
                <v-btn
                  variant="text"
                  color="medium-emphasis"
                  size="large"
                  @click="handleBack"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  size="large"
                  :disabled="!valid"
                  @click="handleNext"
                >
                  Next: Add Location
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const valid = ref(false)
const form = ref(null)

const breadcrumbs = [
  { title: 'Step 1: Item Information', disabled: false, href: '/step_one' },
  { title: 'Step 2: Location', disabled: false, href: '/step_two' },
  { title: 'Step 3: Summary', disabled: true },
]

const formData = ref({
  province: '',
  city: '',
  street: '',
  postalCode: '',
  dateDiscovery: '',
  timeDiscovery: '',
  latitude: '52.2297',
  longitude: '21.0122',
})

const provinces = [
  'Mazowieckie',
  'Małopolskie',
  'Śląskie',
  'Wielkopolskie',
  'Dolnośląskie',
  'Pomorskie',
  'Łódzkie',
  'Zachodniopomorskie',
]

const rules = {
  required: (value: string) => !!value || 'This field is required',
}

const handleBack = () => {
  navigateTo('/step_one')
}

const handleNext = () => {
  if (valid.value) {
    navigateTo('/step_three')
  }
}
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}

.border-t {
  border-top: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}

.map-pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}
</style>
