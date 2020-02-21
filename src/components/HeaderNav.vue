<template>
  <nav class="nav"  v-bind:class="{ scroll: scroll}">
    <div class="nav-container">
      <div class="brand">
         <router-link to="/">me.io</router-link>
      </div>
      <div class="links">
        <a href="/about-me">About me</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name:"header-nav",
  data () {
    return {
      scroll: false
    }
  },
  created() {
     window.addEventListener('scroll', this.handleScroll);
  },
  methods:  {
    handleScroll() {
      if (window.scrollY > 20) {
      this.scroll = true;
    } else {
      this.scroll = false;
    }
    }
  }
  
}
</script>

<style lang="scss">
@import "../assets/main.scss";
</style>