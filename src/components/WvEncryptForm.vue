<template>
  <div>
    <v-form>
      <v-text-field
        rounded
        outlined
        placeholder="Write a string..."
        class="mt-3"
        v-model="string"
      ></v-text-field>

      <h3 class="text-center" v-show="string">
        {{ `${this.string} : ${this.convertedString}` }}
      </h3>
    </v-form>
  </div>
</template>

<script>
import { md5 } from "../utils/encryption";

export default {
  name: "WvEncryptForm",

  data() {
    return {
      algorithms: ["md5", "sha-1", "des"],
      string: ""
    };
  },

  computed: {
    convertedString() {
      return md5(this.string);
    }
  }
};
</script>
