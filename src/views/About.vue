<template>
  <v-main>
    <v-container>
      <Navbar />
      <div class="about">
        <h1>About</h1>
      </div>
    </v-container>
    <Footer />
  </v-main>
</template>
<script>
import Footer from "../components/warpper/Footer";
import Navbar from "../components/warpper/Navbar";

export default {
  name: "Dashboard",

  components: {
    Footer,
    Navbar,
  },

  data: () => ({}),
};
</script>
