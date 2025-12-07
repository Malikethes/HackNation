<template>
  <v-row class="mb-8">
    <v-col cols="12" sm="6" lg="4">
      <v-card elevation="1" rounded="lg">
        <v-card-text>
          <p class="text-body-1 text-medium-emphasis mb-2">Total Items Published</p>
          <p class="text-h4 font-weight-bold">{{ stats.totalItems }}</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card elevation="1" rounded="lg">
        <v-card-text>
          <p class="text-body-1 text-medium-emphasis mb-2">Items Found this Month</p>
          <p class="text-h4 font-weight-bold">{{ stats.itemsThisMonth }}</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card elevation="1" rounded="lg">
        <v-card-text>
          <p class="text-body-1 text-medium-emphasis mb-2">Items Awaiting Publication</p>
          <p class="text-h4 font-weight-bold">{{ stats.itemsAwaitingPublication }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps<{
  stats: {
    totalItems: number
    itemsThisMonth: number
    itemsAwaitingPublication: number
  }
}>()
</script>
