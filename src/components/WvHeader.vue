<template>
  <v-app-bar app color="teal" dark>
    <div class="d-flex align-center">
      <router-link :to="{ name: 'Home' }">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>

      <h1 class="shrink mt-1 hidden-sm-and-down title">
        WordVault
      </h1>
    </div>

    <v-spacer></v-spacer>
    <v-btn-toggle group mandatory>
      <v-btn value="Home" to="/">
        <span class="hidden-sm-and-down">Home</span>

        <v-icon right>mdi-home</v-icon>
      </v-btn>

      <v-btn value="About" to="/about">
        <span class="hidden-sm-and-down">About</span>

        <v-icon right>mdi-information</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<script>
export default {
  name: "WvHeader"
};
</script>
