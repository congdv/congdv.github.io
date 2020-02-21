<template>
  <div>
    <header-nav />
    <AboutMe/>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav";
import AboutMe from "./components/AboutMe"

export default {
  name: 'about-me-page',
  components: {
    HeaderNav,
    AboutMe,
  }
}
</script>

<style>
</style>
