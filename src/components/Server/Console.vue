<template>
  <!-- Provides the application the proper gutter -->

  <v-container fluid>
    <v-card
      style="background: #243242"
      class="py-6"
      fluid
      v-for="server in servers"
      :key="server.machine.identifier"
    >
      <div class="ml-6">
        <h2 class="white--text">{{ server.machine.name }}</h2>
        <div
          class="form-control wizard-form-control d-flex align-items-center testing-code px-20px mb-10px"
        >
          <a @click.stop.prevent="CodeToCopy" class="white--text">
            {{
              `${server.machine.relationships.allocations.data[0].attributes.ip_alias}:${server.machine.relationships.allocations.data[0].attributes.port}`
            }}</a
          >
          <input
            type="hidden"
            id="CodeToCopy"
            :value="`${server.machine.relationships.allocations.data[0].attributes.ip_alias}:${server.machine.relationships.allocations.data[0].attributes.port}`"
          />
        </div>

        <h3 class="white--text"></h3>
      </div>
    </v-card>
    <Tabs />
  </v-container>
</template>

<script>
import { router } from "../../router/index.js";
import Tabs from "./Tabs.vue";

export default {
  name: "Console",

  components: { Tabs },

  data: () => ({
    servers: [],
    identifier: "",
    serverResourse: "",
    power: "kill",
    loading: true,
  }),

  methods: {
    async getServer() {
      try {
        const request = new Request(`/api/client${router.currentRoute.path}`, {
          method: "GET",
          mode: "cors",
          cache: "default",
        });
        let res = await fetch(request);
        res = await res.json();
        console.log(res.is_suspended);
        console.log(res.identifier);

        this.servers.push({
          machine: res,
        });
        // if (res.is_suspended === true) {
        // }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    CodeToCopy() {
      let CodeToCopy = document.querySelector("#CodeToCopy");
      CodeToCopy.setAttribute("type", "text");
      CodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("IP was copied " + msg);
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      CodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
  beforeMount() {
    this.getServer();
    // console.log(process.env.VUE_APP_PANEL);
  },
};
</script>
