<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-form @submit.prevent="convertString">
          <v-text-field
            rounded
            outlined
            placeholder="Write a string..."
            class="mt-3"
            v-model="string"
          ></v-text-field>
          <v-btn type="submit" block color="primary" class="mb-3" x-large
            >Encrypt</v-btn
          >
        </v-form>

        <v-card v-show="convertedString" outlined>
          <h3 class="text-center">String:</h3>

          <p class="text-truncate text-center">
            {{ string }}
          </p>

          <hr />

          <h3 class="text-center">{{ algorithmName }}:</h3>

          <p class="text-truncate text-center">
            {{ convertedString }}
          </p>
        </v-card>
      </v-col>

      <v-col>
        <wv-history />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WvHistory from "./WvHistory.vue";
import { md5 } from "../utils/encryption";

export default {
  name: "WvEncryptForm",

  components: {
    WvHistory
  },

  props: {
    selectAlgorithm: {
      type: Number,
      required: true
    },

    algorithms: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      string: "",
      convertedString: ""
    };
  },

  computed: {
    algorithmName() {
      return this.algorithms[this.selectAlgorithm];
    }
  },

  watch: {
    string() {
      this.convertedString = "";
    }
  },

  methods: {
    convertString() {
      if (this.convertedString || !this.string) return;
      // console.log("paso");
      switch (this.algorithmName) {
        case "md5":
          this.convertedString = md5(this.string);
          break;

        default:
          this.convertedString =
            "We not count with that algorithm at moment. But wait for it 😊";
          break;
      }
    }
  }
};
</script>
