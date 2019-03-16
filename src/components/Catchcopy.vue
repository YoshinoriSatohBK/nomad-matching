<template lang="pug">
  div.catchcopy
    div.mark-heart
      img(src="@/assets/images/mark_pc.png")
    SectionTitle(text="これからは、孤独じゃない")
    FullWidthImage(
      :imageSrc="require('@/assets/images/nomad_photo.jpg')"
    )
    div.copy-text
      p ノマドワーカーは孤独でした。
      p 場所に縛られない生き方を目指して、努力をします。その結果として「自由」を手に入れても、その先に「圧倒的な孤独感」があります。
      p １人で旅をしても、１人で自由を満喫しても、１人で素晴らしい景色を見ても、その感動を共有する「相手」がいなければ、SNSで投稿して、その後に「空虚な気持ち」を得るだけです。
      p 本サービス（Nomad Links）では、孤独なノマドワーカーを救います。
      p 人生における「場所に縛られない生き方」を手に入れたあなたへ。次のフェーズとして「人生の感動を共有できるパートナー」を探してみてください。
      p 「次は、2人でどこへ行こう」という言葉を交わすことができるパートナーがいれば、人生はさらに豊かになるはずです。
</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import FullWidthImage from "@/components/FullWidthImage";

export default {
  name: "Catchcopy",
  components: {
    SectionTitle,
    FullWidthImage
  }
};
</script>

<style scoped lang="stylus">
.catchcopy
  text-align center

.mark-heart
  width 100%
  img
    display inline-block
    width 37.54px
    height 48.3px

.copy-text
  color #6C5A3F
  font-size 12px
  font-family Hiragino Kaku Gothic ProN
  line-height 1.2rem
  text-align center
  padding 8px 16px
  margin-bottom 50px
  p
    margin 1rem 0
</style>
