<template>
  <v-footer dark padless>
    <v-card flat tile class="blue-grey lighten-1 white--text text-center">
      <v-card-text>
        <v-btn
          v-for="(icon, index) in proyectIcons"
          :key="index"
          class="mx-4 white"
          rounded
          icon
          :href="icon.link"
          target="_blank"
        >
          <v-icon size="24px" :color="icon.color">{{ icon.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        WordVault permit you encrypt and decrypt md5 algorithm strings (by the
        moment), implements modern techologies that make easily obtain the
        results. Our database increase day by day. Be free to use WordVault 😺.
        The project information are on the links above, you can access when you
        want and contribuit whit the project.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>
          ( Powered by: Diego Martínez
          <v-btn
            icon
            v-for="(icon, index) in authorIcons"
            :key="index"
            :href="icon.link"
            target="_blank"
          >
            <v-icon>{{ icon.icon }}</v-icon>
          </v-btn>
          )
        </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "WvFooter",

  data: () => ({
    proyectIcons: [
      {
        icon: "mdi-github",
        link: "https://github.com/ludmartinez",
        color: "black"
      },
      {
        icon: "mdi-vuejs",
        link: "https://vuejs.org",
        color: "green lighten-1"
      },
      { icon: "mdi-vuetify", link: "https://vuetifyjs.com", color: "blue" }
    ],

    authorIcons: [
      { icon: "mdi-github", link: "http://github.com/ludmartinez" },
      { icon: "mdi-instagram", link: "https://www.instagram.com/l.diego.nm" }
    ]
  })
};
</script>
