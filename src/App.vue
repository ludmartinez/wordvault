<template>
  <v-app>
    <wv-header />
    <v-content>
      <router-view />
    </v-content>
    <wv-footer />
  </v-app>
</template>

<script>
import WvHeader from "./components/WvHeader.vue";
import WvFooter from "./components/WvFooter.vue";

export default {
  name: "App",

  components: {
    WvHeader,
    WvFooter
  },

  data: () => ({
    //
  })
};
</script>
