<template lang="pug">
  div
    FieldInputBase.input-wrap(
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :inputStyle="inputStyle"
      @input="input"
    )
      div(v-if="unit" slot="unit").unit {{ unit }}
      ErrorMessage(
        v-if="hasValidationError && errors.has(name)"
        :text="errors.first(name)"
      )
</template>

<script>
import FieldInputBase from "@/components/FieldInputBase";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "FieldInputEdit",
  components: {
    FieldInputBase,
    ErrorMessage
  },
  props: {
    type: String,
    placeholder: String,
    name: String,
    value: String,
    unit: String,
    errors: Object,
    hasValidationError: Boolean
  },
  data() {
    return {
      inputStyle: {
        width: "100%",
        height: "43.68px",
        "line-height": "100%",
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

<style scoped lang="stylus">
.input-wrap
  width 100%
.unit
  display inline-block
  width 100px
  margin auto
</style>
