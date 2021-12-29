<template>
  <v-main>
    <Navbar />
    <v-container fluid>
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
    </v-container>
    <Footer />
  </v-main>
</template>

<script>
import Footer from "../components/warpper/Footer";
import Navbar from "../components/warpper/Navbar";

export default {
  name: "Home",

  components: {
    Footer,
    Navbar,
  },

  data: () => ({}),
};
</script>
