<template>
  <v-main style="background-color: #2c3b4c">
    <v-list-item>
      <h2 class="white--text pt-6">{{ name }}</h2>
    </v-list-item>
    <Navbar />
    <ServerRow />
    <Footer />
  </v-main>
</template>

<script>
import Footer from "../components/warpper/Footer";
import Navbar from "../components/warpper/Navbar";
import ServerRow from "../components/Dashboard/ServerRow.vue";
import { router } from "../router/index.js";

export default {
  name: "Dashboard",

  components: {
    Footer,
    Navbar,
    ServerRow,
  },

  data: () => ({
    name: [],
  }),
  methods: {
    async getRoute() {
      let namerouter = router.currentRoute.name;
      this.name = namerouter;
    },
  },
  beforeMount() {
    this.getRoute();
  },
};
</script>
