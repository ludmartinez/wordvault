<template>
  <v-container>
    <wv-option-selector
      :algorithms="algorithms"
      @selectedAction="selectAction($event)"
      @selectedAlgorithm="selectAlgorithm($event)"
    />
    <wv-encript-form />
  </v-container>
</template>

<script>
import WvEncriptForm from "../components/WvEncryptForm.vue";
import WvOptionSelector from "../components/WvOptionSelector.vue";

export default {
  name: "Home",

  components: {
    WvEncriptForm,
    WvOptionSelector
  },

  data() {
    return {
      action: null,
      algorithm: null
    };
  },

  computed: {
    algorithms() {
      return ["md5", "sha-1", "des"];
    }
  },

  methods: {
    selectAction(event) {
      this.action = event;
    },

    selectAlgorithm(event) {
      this.algorithm = event;
    }
  }
};
</script>
