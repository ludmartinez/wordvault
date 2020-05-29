<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>
        {{
          `${selectedAction.toUpperCase()} - ${algorithms[
            selectedAlgorithm
          ].toUpperCase()} (${totalVaults} vaults)`
        }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

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
import { documentCount } from "../api/firebase";

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
      iconActions: ["mdi-lock", "mdi-lock-open-variant"],
      totalVaults: 0
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
  },

  watch: {
    selectedAction(selection) {
      this.$emit("selectedAction", selection);
    },

    selectedAlgorithm(selection) {
      this.$emit("selectedAlgorithm", selection);
    }
  },

  created() {
    documentCount("md5", count => {
      this.totalVaults = count;
    });
  },

  mounted() {
    this.$emit("selectedAction", this.selectedAction);
    this.$emit("selectedAlgorithm", this.selectedAlgorithm);
  }
};
</script>

<style lang="sass" scoped>
.hidden
  visibility: hidden
</style>
