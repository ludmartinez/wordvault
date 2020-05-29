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

      <v-col cols="12" md="6">
        <wv-history :vault="vault" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WvHistory from "./WvHistory.vue";
import { md5 } from "../utils/encryption";
import { searchHashByString, addVault } from "../api/firebase";

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
      convertedString: "",
      vault: {}
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
    },

    selectAlgorithm() {
      this.convertedString = "";
    }
  },

  methods: {
    async convertString() {
      if (this.convertedString || !this.string) return;
      // console.log("paso");
      switch (this.algorithmName) {
        case "md5": {
          try {
            const existence = await searchHashByString("md5", this.string);

            // console.log(querySnapshot.docs[0].data());
            if (existence) {
              this.convertedString = existence.hash;

              // console.log("Existence");
            } else {
              const convertedString = md5(this.string);

              const vault = await addVault("md5", {
                string: this.string,
                hash: convertedString
              });

              this.convertedString = convertedString;

              console.log(vault);
            }

            this.vault = {
              string: this.string,

              hash: this.convertedString
            };
          } catch (error) {
            console.log(error);
          }

          break;
        }

        default: {
          this.convertedString =
            "We not count with that algorithm at moment. But wait for it 😊";
          break;
        }
      }
    }
  }
};
</script>
