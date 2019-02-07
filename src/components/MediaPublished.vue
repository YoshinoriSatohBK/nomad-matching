<template lang="pug">
  div.media-published
    SectionTitle(text="メディア掲載")
    div (画像当て込む)
</template>

<script>
import SectionTitle from "@/components/SectionTitle";

export default {
  name: "MediaPublished",
  components: {
    SectionTitle
  }
};
</script>

<style scoped lang="stylus">
.media-published
  text-align center
</style>
