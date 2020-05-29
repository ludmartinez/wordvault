<template>
  <v-card class="mx-auto" outlined>
    <v-container>
      <v-row justify="end">
        <v-col cols="5">
          <v-text-field
            dense
            rounded
            outlined
            placeholder="Search in history..."
            append-icon="mdi-magnify"
            hide-details
            :disabled="!history.length"
            v-model="search"
          />
        </v-col>
      </v-row>

      <div v-if="!history.length" class="text-center blue-grey--text">
        <h4>
          You don't have any results yet
        </h4>

        <v-icon color="blue-grey">mdi-text-box-search</v-icon>
      </div>

      <v-list-item
        v-else
        two-line
        v-for="(vault, i) in filteredHistory"
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title>{{ vault.string }}</v-list-item-title>

          <v-list-item-subtitle>{{ vault.hash }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-container>
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
      history: [],
      filteredHistory: [],
      search: ""
    };
  },

  watch: {
    vault(newVal) {
      const existence = this.history.find(vault => {
        return vault.hash === newVal.hash;
      });

      // console.log(existence);

      if (!existence) {
        this.history.unshift({ ...newVal });
        this.filteredHistory = this.history;
        this.search = "";
      }
    },

    search(newVal) {
      newVal === ""
        ? (this.filteredHistory = this.history)
        : this.filterHistory();
    }
  },

  methods: {
    filterHistory() {
      if (!this.search) return;

      const result = this.history.filter(vault => {
        const string = vault.string.toLowerCase();

        const filter = this.search.toLowerCase();

        return string.includes(filter) || vault.hash.includes(filter);
      });

      this.filteredHistory = result;

      // console.log(result);
    }
  }
};
</script>
