<template>
  <div>
    <header-nav />
    <ContactMe/>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav";
import ContactMe from "./components/ContactMe"

export default {
  name: 'about-me-page',
  components: {
    HeaderNav,
    ContactMe,
  }
}
</script>

<style>
</style>
