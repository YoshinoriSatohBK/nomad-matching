<template lang="pug">
  div
    Title

    ButtonRegisterTwitter
    ButtonToSearch(scrollToId="#worker-list")

    HowToUse

    ButtonRegisterTwitter
    ButtonToSearch(scrollToId="#worker-list")

    WorkerList#worker-list

    Catchcopy

    MediaPublished
</template>

<script>
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
  }
};
</script>

<style lang="stylus"></style>
