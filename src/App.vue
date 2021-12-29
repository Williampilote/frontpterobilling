<template>
  <div>
    <v-app id="body">
      <Topbar />
      <router-view />
    </v-app>
  </div>
</template>

<style lang="scss">
#body {
  font-family: "IBM Plex Sans", Roboto, system-ui, sans-serif;

  font-weight: 500;
  letter-spacing: 0em;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<script>
import Topbar from "./components/warpper/Topbar";

export default {
  name: "App",

  components: {
    Topbar,
  },

  data: () => ({
    //
  }),
};
</script>
