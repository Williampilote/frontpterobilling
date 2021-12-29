<template>
  <v-navigation-drawer
    app
    class="accent-4 d-none d-sm-flex"
    style="background-color: #23324"
    dark
  >
    <v-list>
      <v-list-item class="justify-center d-flex align-center" href="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="https://cdn.discordapp.com/attachments/760210364008366200/867840957991092254/serverslogos.png"
          transition="scale-transition"
          width="40"
        />
        <v-card-title id> Sorexproject </v-card-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="route in routes"
        :key="route.name"
        link
        :href="route.path"
      >
        <v-list-item-icon>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ route.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <router-view />

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { navbar } from "../../router/index.js";
export default {
  name: "navbar",

  data: () => ({
    routes: navbar,
  }),
};
</script>
