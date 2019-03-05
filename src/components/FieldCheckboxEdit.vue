<template lang="pug">
  div
    FieldCheckboxBase(
      :name="name"
      :label="label"
      :inputStyle="inputStyle"
      @input="input"
    )
      ErrorMessage(
        v-if="hasValidationError && errors.has(name)"
        :text="errorMessage"
      )
</template>

<script>
import FieldCheckboxBase from "@/components/FieldCheckboxBase";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "FieldCheckboxEdit",
  components: {
    FieldCheckboxBase,
    ErrorMessage
  },
  props: {
    name: String,
    label: String,
    errors: Object,
    errorMessage: String,
    hasValidationError: Boolean
  },
  data() {
    return {
      inputStyle: {
        "font-size": "16px",
        ":placeholder": {
          "font-size": "16px"
        }
      }
    };
  },
  methods: {
    async input(value) {
      await this.$emit("input", value);
    }
  }
};
</script>

<style scoped lang="stylus"></style>
