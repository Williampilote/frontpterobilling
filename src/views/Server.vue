<template>
  <v-main style="background-color: #2c3b4c">
    <Navbar />
    <Console />
    <Footer />
  </v-main>
</template>

<script>
import Footer from "../components/warpper/Footer";
import Navbar from "../components/warpper/Navbar";
import Console from "../components/Server/Console.vue";

export default {
  name: "Server",

  components: {
    Footer,
    Navbar,
    Console,
  },

  data: () => ({}),
  methods: {},
};
</script>
