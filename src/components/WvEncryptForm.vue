<template>
  <div>
    <wv-option-selector :algorithms="algorithms" />
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
import WvOptionSelector from "./WvOptionSelector.vue";

export default {
  name: "WvEncryptForm",

  components: {
    WvOptionSelector
  },

  data() {
    return {
      algorithms: ["md5", "sha-1", "des"],
      string: ""
    };
  },

  computed: {
    convertedString() {
      return null;
    }
  }
};
</script>
