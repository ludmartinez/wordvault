<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-form @submit.prevent="decryptHash">
          <v-text-field
            rounded
            outlined
            placeholder="Write a hash.."
            class="mt-3"
            v-model="hash"
            counter="32"
          ></v-text-field>
          <v-btn type="submit" block color="success" class="mb-3" x-large
            >Decrypt</v-btn
          >
        </v-form>

        <v-card v-show="string" outlined>
          <h3 class="text-center">{{ `Hash - ${algorithmName}:` }}</h3>

          <p class="text-truncate text-center">
            {{ hash }}
          </p>

          <hr />

          <h3 class="text-center">String:</h3>

          <p class="text-truncate text-center">
            {{ string }}
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <wv-history :vault="vault" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WvHistory from "./WvHistory.vue";
import { searchStringByHash } from "../api/firebase";

export default {
  name: "WvDecryptForm",

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
      hash: "",
      string: "",
      vault: {}
    };
  },

  computed: {
    algorithmName() {
      return this.algorithms[this.selectAlgorithm];
    }
  },

  watch: {
    hash() {
      this.string = "";
    },

    selectAlgorithm() {
      this.string = "";
    }
  },

  methods: {
    async decryptHash() {
      if (this.string || !this.hash) return;

      switch (this.algorithmName) {
        case "md5": {
          try {
            const vault = await searchStringByHash("md5", this.hash);

            if (vault) {
              this.string = vault.string;

              this.vault = {
                string: this.string,

                hash: this.hash
              };
            } else {
              this.string = "Sorry!, The hash was not found ☹";
            }
          } catch (error) {
            console.log(error);
          }
          break;
        }

        default: {
          this.string =
            "We not count with that algorithm at moment. But wait for it 😊";
          break;
        }
      }
    }
  }
};
</script>
