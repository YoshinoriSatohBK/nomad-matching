<script src="../store/module/user.js"></script>
<template lang="pug">
  div.field
    select(
      v-model="value"
      v-on="inputListeners"
      :class="{ select: size !== 'small', 'select-sm': size === 'small' }"
      :style="{ color: color }"
    )
      option.option-placeholder(
        value="null"
      ) {{ placeholder }}
      option.option(
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      ) {{ option.displayValue }}
    <!--b-icon.angle-icon(-->
      <!--pack="fas"-->
      <!--icon="angle-down"-->
    <!--)-->
    slot
</template>

<script>
export default {
  name: "FieldInput",
  props: {
    type: String,
    placeholder: String,
    value: String,
    options: Array,
    size: {
      type: String,
      default: "medium"
    }
  },
  data() {
    return {
      placeholderStyle: {
        color: "blue"
      }
    };
  },
  computed: {
    color: function() {
      if (this.value === null) {
        if (this.size === "small") {
          return "#6C5A3F";
        } else {
          return "#AF9772";
        }
      }
      return "initial";
    },
    inputListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit("input", event.target.value);
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.field
  margin 0 0 1rem 0

.select
  width 100%
  height 43.68px
  padding-left 0.7rem
  background white
  border #AF9772 1px solid
  border-radius 0%
  font-family Hiragino Kaku Gothic ProN
  font-size 16px

.select-sm
  width 127px
  height 28.53px
  padding-left 0.7rem
  background white
  border #AF9772 1px solid
  border-radius 0%
  font-family Hiragino Kaku Gothic ProN
  font-size 12px

.option-placeholder
  display none

.option
  padding 0

.angle-icon
  position relative
  top 10px
  left -25px
  width 0
</style>
