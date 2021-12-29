z
<template>
  <v-container fluid>
    <v-card :loading="loading" class="mx-auto my-4" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="blue"
          :loading="loading"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
    </v-card>

    <v-row no-gutters :style="noserver">
      <v-col cols="2" />
      <v-col cols="8">
        <v-card
          style="background: #243242; border-raduis: 10px"
          class="height: 90% rounded-xl"
        >
          <v-card-text class="white--text justify-center d-flex align-center">
            There are no other servers to display.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="2" />
    </v-row>

    <v-card
      class="mb-6 pt-6 px-8 rounded-xl"
      style="background: #243242"
      fluid
      v-for="server in servers"
      :key="server.machine.identifier"
      :href="/servers/ + server.machine.identifier"
    >
      <v-list-item-icon>
        <h2 class="white--text">{{ server.machine.name }}</h2>
        <v-chip class="white--text" :style="server.state" :color="server.state">
          {{ server.resources.current_state }}</v-chip
        >
        <v-chip class="white--text" :style="server.suspended" color="red ml-6 ">
          Suspended</v-chip
        >
      </v-list-item-icon>
      <v-row no-gutters>
        <v-col>
          <v-list-item-icon>
            <v-icon dark>mdi-server-network</v-icon>
            <v-card-text class="white--text">
              {{
                `${server.machine.relationships.allocations.data[0].attributes.ip_alias}:${server.machine.relationships.allocations.data[0].attributes.port}`
              }}
            </v-card-text>
          </v-list-item-icon>
          <v-list-item-icon>
            <v-icon dark>mdi-av-timer</v-icon>
            <v-card-text class="white--text">
              {{ server.uptime }}
            </v-card-text>
          </v-list-item-icon>
          <v-list-item-icon>
            <v-icon dark>mdi-chip</v-icon>
            <v-card-text class="white--text">
              {{ server.resources.resources.cpu_absolute }}% of 100%
            </v-card-text>
          </v-list-item-icon>
          <v-list-item-icon>
            <v-icon dark>mdi-memory</v-icon>
            <v-card-text class="white--text">
              {{ server.memory }} of {{ server.memoryinit }}</v-card-text
            >
          </v-list-item-icon>
          <v-list-item-icon>
            <v-icon dark>mdi-harddisk</v-icon>
            <v-card-text class="white--text">
              {{ server.disk }}
              of
              {{ server.diskinit }}
            </v-card-text>
          </v-list-item-icon>
        </v-col>
      </v-row>
      <!-- <v-btn @click="postPower()"> Kill </v-btn> -->
    </v-card>
  </v-container>
</template>

<script>
import { formatMegabyte } from "../elements/formatMegabyte.ts";
import { formatBytes } from "../elements/formatBytes.ts";
import { formatUptime } from "../elements/formatUptime.ts";

export default {
  name: "ServerRow",

  components: {},

  data: () => ({
    servers: [],
    noserver: "visibility: hidden;",
    identifier: "",
    serverResourse: "",
    power: "kill",
    loading: true,
  }),
  methods: {
    async getServers() {
      try {
        const requestServers = new Request("/api/client", {
          method: "GET",
          mode: "cors",
          cache: "default",
        });

        let res = await fetch(requestServers);
        res = await res.json();

        if (res.length === 0) {
          this.noserver = "visibility: visible;";
          this.loading = false;
        } else {
          console.log(res);
          for (let server of res) {
            const resources = await this.getResource(server.identifier);
            if (server.is_suspended === false) {
              const memoryinit = await formatMegabyte(server.limits.memory);
              const memory = await formatBytes(
                resources.resources.memory_bytes
              );
              const diskinit = await formatMegabyte(server.limits.disk);
              const disk = await formatBytes(resources.resources.disk_bytes);
              const uptime = await formatUptime(resources.resources.uptime);
              const suspended = await this.formatSuspended(server.is_suspended);
              const state = await this.formatState(resources.current_state);
              this.servers.push({
                resources: resources,
                machine: server,
                memoryinit: memoryinit,
                memory: memory,
                disk: disk,
                diskinit: diskinit,
                uptime: uptime,
                suspended: suspended,
                state: state,
              });
            }

            if (server.is_suspended === true) {
              const memoryinit = await formatMegabyte(server.limits.memory);
              const memory = "0";
              const diskinit = await formatMegabyte(server.limits.disk);
              const disk = "0";
              const uptime = "0";
              const resourcesNull = {
                current_state: "Offline",
                resources: {
                  memory_bytes: 0,
                  cpu_absolute: 0,
                  disk_bytes: 0,
                  network_rx_bytes: 0,
                  network_tx_bytes: 0,
                  uptime: 0,
                },
              };
              const suspended = await this.formatSuspended(server.is_suspended);
              this.servers.push({
                resources: resourcesNull,
                machine: server,
                memoryinit: memoryinit,
                memory: memory,
                disk: disk,
                diskinit: diskinit,
                uptime: uptime,
                suspended: suspended,
                state: "red ml-6",
              });
            }
          }
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async formatState(state) {
      if (state === "running") return "green ml-6";
      if (state === "starting") return "orange  ml-6";
      if (state === "offline") return "red ml-6";
    },
    async formatSuspended(suspended) {
      if (suspended === true) return "visibility: visible;";
      if (suspended === false) return "visibility: hidden;";
    },
    async getResource(identifier) {
      this.loading = true;
      try {
        const request = new Request(
          `/api/client/servers/${identifier}/resources`,
          {
            method: "GET",
            mode: "cors",
            cache: "default",
          }
        );
        const res = await fetch(request);
        const serverResourse = await res.json();
        this.loading = false;

        return serverResourse;
      } catch (error) {
        console.log(error);
      }
    },
    // async postPower() {
    //   const request = new Request("/api/client/servers/7d11655a/power", {
    //     method: "POST",
    //     mode: "cors",
    //     cache: "default",
    //     body: JSON.stringify(this.power),
    //   });
    //   const res = await fetch(request);
    //   const nameserver = await res.json();
    //   console.log(nameserver);
    //   // this.nameserver = nameserver.data[0].attributes.name;
    // },
  },
  beforeMount() {
    this.getServers();

    // console.log(process.env.VUE_APP_PANEL);
  },
};
</script>
