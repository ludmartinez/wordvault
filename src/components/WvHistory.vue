<template>
  <v-card class="mx-auto" outlined>
    <v-list-item two-line v-for="(vault, i) in history" :key="i">
      <v-list-item-content>
        <v-list-item-title>{{ vault.string }}</v-list-item-title>
        <v-list-item-subtitle>{{ vault.hash }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "WvHistory",

  props: {
    vault: {
      type: Object
    }
  },

  data() {
    return {
      history: []
    };
  },

  watch: {
    vault(newVal) {
      const existence = this.history.find(vault => {
        return vault.hash === newVal.hash;
      });

      console.log(existence);

      if (!existence) {
        this.history.unshift({ ...newVal });
      }
    }
  }
};
</script>
