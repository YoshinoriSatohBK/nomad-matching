<template lang="pug">
  div
    Title

    ButtonRegisterTwitter.button-wrap(
      @click="signin"
    )
    ButtonToSearch.button-wrap(
      @click="scrollTo('#worker-list')"
    )

    HowToUse

    ButtonRegisterTwitter.button-wrap(
      @click="signin"
    )
    ButtonToSearch(
      @click="scrollTo('#worker-list')"
    )

    WorkerList#worker-list

    Catchcopy

    // MediaPublished
</template>

<script>
import libAuth from "../lib/auth";
import VueScrollTo from "vue-scrollto";

import BDropdown from "buefy/src/components/dropdown/Dropdown";
import { Carousel, Slide } from "vue-carousel";
import Title from "@/components/Title";
import ButtonRegisterTwitter from "@/components/ButtonRegisterTwitter";
import ButtonToSearch from "@/components/ButtonToSearch";
import HowToUse from "@/components/HowToUse";
import WorkerList from "@/components/WorkerList";
import Catchcopy from "@/components/Catchcopy";
import MediaPublished from "@/components/MediaPublished";
import Footer from "@/components/Footer";

export default {
  name: "Top",
  components: {
    Footer,
    MediaPublished,
    BDropdown,
    Carousel,
    Slide,
    Title,
    ButtonRegisterTwitter,
    ButtonToSearch,
    HowToUse,
    WorkerList,
    Catchcopy
  },
  methods: {
    async signin() {
      if (await libAuth.authenticated()) {
        this.$toast.open("ログインしています");
      }
      await libAuth.authenticate();
    },
    scrollTo(scrollToId) {
      VueScrollTo.scrollTo(scrollToId, 1000, {
        easing: "ease"
      });
    }
  }
};
</script>

<style scope lang="stylus">
.button-wrap
  margin-bottom 1rem
</style>
