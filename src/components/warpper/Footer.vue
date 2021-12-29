<template>
  <v-footer padless absolute dark>
    <v-card flat tile width="100%" class="flex">
      <v-card-text
        class="mt-4 white--text pt-0 justify-center d-flex align-center"
      >
        All Rights Reserved by Sorexproject. Designed and Developed by
        Williampilote.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="py-2 white--text text-center" background-color="back">
        2021 - {{ new Date().getFullYear() }} — <strong>Sorexproject@</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    //
  }),
};
</script>
