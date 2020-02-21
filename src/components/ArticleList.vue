<template>
  <div id="main-content">
    <div v-for="article in articles " v-bind:key="article.id">
      <span >{{article.publishDate | moment}}</span>
      <router-link v-bind:to="article.path" class="title">{{ article.title}}</router-link>
  </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "article-list",
  props: {
    articles: Array
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY-DD-MM");
    },
    
  }
}
</script>
<style scoped>
.title {
  padding: 0 1.2rem;
  font-size: 1.2em;
}
div > span {
  font-size: 1.0em;
}
</style>