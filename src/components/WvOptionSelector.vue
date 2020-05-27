<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>{{
        `${selectedAction.toUpperCase()} - ${algorithms[
          selectedAlgorithm
        ].toUpperCase()}`
      }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleSearchBar">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field
        ref="searchBar"
        @blur="toggleSearchBar"
        dense
        single-line
        hide-details
        :class="{ 'd-none': !searchBar }"
        autofocus
      >
      </v-text-field>

      <v-btn icon @click="toggleAction">
        <v-icon>{{ selectedIconAction }}</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="selectedAlgorithm">
          <v-tab v-for="algorithm in algorithms" :key="algorithm">
            {{ algorithm.toUpperCase() }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "WvOptionSelector",

  props: {
    algorithms: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      selectedAlgorithm: 0,
      searchBar: false,
      selectedAction: "encrypt",
      iconActions: ["mdi-lock", "mdi-lock-open-variant"]
    };
  },

  computed: {
    selectedIconAction() {
      if (this.selectedAction === "encrypt") {
        return this.iconActions[1];
      } else {
        return this.iconActions[0];
      }
    }
  },

  methods: {
    toggleAction() {
      this.selectedAction === "encrypt"
        ? (this.selectedAction = "decrypt")
        : (this.selectedAction = "encrypt");
    },
    toggleSearchBar() {
      this.searchBar = !this.searchBar;
      // console.log(this.$refs.searchBar.$refs.input);
    }
  }
};
</script>

<style lang="sass" scoped>
.hidden
  visibility: hidden
</style>
