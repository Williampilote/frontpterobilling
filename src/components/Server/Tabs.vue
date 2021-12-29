<template>
  <v-sheet elevation="6">
    <v-tabs
      background-color="#243242"
      dark
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="link in router" :key="link.name" :href="link.path">
        {{ link.name }}
      </v-tab>
    </v-tabs>
  </v-sheet>
</template>

<script>
import { router } from "../../router/index.js";

export default {
  name: "Tabs",

  components: {},

  data: () => ({
    name: [],
    router: [
      { name: "Console", path: router.currentRoute.path + "./" },
      { name: "Files", path: router.currentRoute.path + "/files" },
    ],
  }),
  methods: {},
};
</script>
