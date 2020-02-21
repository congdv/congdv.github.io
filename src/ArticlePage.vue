<template>
  <div>
    <header-nav />
    <article-post />
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav";
import ArticlePost from "./components/ArticlePost"

export default {
  name: 'article-page',
  components: {
    HeaderNav,
    ArticlePost
  }
}
</script>

<style>
</style>
