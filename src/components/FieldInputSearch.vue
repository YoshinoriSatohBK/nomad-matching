<template lang="pug">
  div
    FieldInputBase(
      type="text"
      :placeholder="placeholder"
      :value="value"
      :inputStyle="inputStyle"
      @input="input"
    )
      img.search-icon(
        v-if="value.length <= 0"
        slot="icon"
        src="@/assets/images/zoom.png"
      )
      div.search-icon(
        v-else
        slot="icon"
      )
</template>

<script>
import FieldInputBase from "@/components/FieldInputBase";
export default {
  name: "FieldInputSearch",
  components: {
    FieldInputBase
  },
  props: {
    placeholder: String,
    value: String
  },
  data() {
    return {
      inputStyle: {
        width: "140px",
        height: "28.53px",
        "line-height": "100%",
        "font-size": "12px",
        ":placeholder": {
          "font-size": "12px"
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
.search-icon
  display inline
  position relative
  top 6px
  left -1.4rem
  width 15.9px
  height 15.9px
</style>
