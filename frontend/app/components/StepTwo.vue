<template>
  <v-form ref="form" @update:model-value="$emit('update:valid', $event)">
    <div class="mb-10">
      <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">Address</h3>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            :model-value="formData.province"
            @update:model-value="formData.province = $event"
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
            :model-value="formData.city"
            @update:model-value="formData.city = $event"
            label="City/Town"
            variant="outlined"
            color="primary"
            placeholder="E.g., Warsaw"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.street"
            @update:model-value="formData.street = $event"
            label="Street and number"
            variant="outlined"
            color="primary"
            placeholder="E.g., Aleje Jerozolimskie 97"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.postalCode"
            @update:model-value="formData.postalCode = $event"
            label="Postal code"
            variant="outlined"
            color="primary"
            density="comfortable"
            placeholder="E.g., 00-001"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
    </div>

    <div class="mb-10">
      <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">Date and Time</h3>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.dateDiscovery"
            @update:model-value="formData.dateDiscovery = $event"
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
            :model-value="formData.timeDiscovery"
            @update:model-value="formData.timeDiscovery = $event"
            type="time"
            label="Approximate time of discovery"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-clock-outline"
          />
        </v-col>
      </v-row>
    </div>

    <div class="mb-6">
      <h3 class="text-h6 font-weight-bold mb-4 pb-3 border-b">Location on Map</h3>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.latitude"
            @update:model-value="formData.latitude = $event"
            label="Latitude"
            variant="outlined"
            color="primary"
            placeholder="E.g., 52.2297"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="formData.longitude"
            @update:model-value="formData.longitude = $event"
            label="Longitude"
            variant="outlined"
            color="primary"
            placeholder="E.g., 21.0122"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12">
          <v-card elevation="0" rounded="lg" class="overflow-hidden mb-4">
            <div ref="mapContainer" style="width: 100%; height: 400px;"></div>
          </v-card>
          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-map-marker"
            @click="openMapLink"
            block
          >
            View on Google Maps
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script setup lang="ts">
const props = defineProps<{
  formData: any
  provinces: string[]
  rules: any
  valid: boolean
}>()

const emit = defineEmits(['update:valid'])

const form = ref(null)
const mapContainer = ref<HTMLElement | null>(null)
let map: google.maps.Map | null = null
let marker: google.maps.Marker | null = null

const openMapLink = () => {
  const lat = props.formData.latitude || '52.2297'
  const lng = props.formData.longitude || '21.0122'
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
}

const initMap = () => {
  if (!mapContainer.value) return

  const lat = parseFloat(props.formData.latitude) || 52.2297
  const lng = parseFloat(props.formData.longitude) || 21.0122
  const center = { lat, lng }

  map = new google.maps.Map(mapContainer.value, {
    center: center,
    zoom: 15,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
  })

  marker = new google.maps.Marker({
    position: center,
    map: map,
    draggable: true,
    title: 'Click to set location'
  })

  // Update coordinates when marker is dragged
  marker.addListener('dragend', () => {
    if (marker) {
      const position = marker.getPosition()
      if (position) {
        props.formData.latitude = position.lat().toFixed(6)
        props.formData.longitude = position.lng().toFixed(6)
      }
    }
  })

  // Update marker position when clicking on map
  map.addListener('click', (e: google.maps.MapMouseEvent) => {
    if (e.latLng && marker) {
      marker.setPosition(e.latLng)
      props.formData.latitude = e.latLng.lat().toFixed(6)
      props.formData.longitude = e.latLng.lng().toFixed(6)
    }
  })
}

const loadGoogleMaps = () => {
  if (typeof google !== 'undefined' && google.maps) {
    initMap()
    return
  }

  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
  script.async = true
  script.defer = true
  script.onload = () => {
    initMap()
  }
  document.head.appendChild(script)
}

// Watch for coordinate changes from text fields
watch([() => props.formData.latitude, () => props.formData.longitude], ([newLat, newLng]) => {
  if (marker && newLat && newLng) {
    const lat = parseFloat(newLat)
    const lng = parseFloat(newLng)
    if (!isNaN(lat) && !isNaN(lng)) {
      const newPosition = { lat, lng }
      marker.setPosition(newPosition)
      if (map) {
        map.setCenter(newPosition)
      }
    }
  }
})

onMounted(() => {
  loadGoogleMaps()
})
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}
</style>
