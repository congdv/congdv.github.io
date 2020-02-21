<template>
  <div class="home">
    <header-nav />
    <div class="small-container">
      <div class="tags">
          <li><a @click="listArticles('all')" v-bind:class="{ active: all}">All</a></li>
          <li><a @click="listArticles('en')" v-bind:class="{ active: en}">EN</a></li>
          <li><a @click="listArticles('vi')" v-bind:class="{ active: vi}">VI</a></li>
        </div>
      <article-list v-bind:articles="articles"/>
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav";
import ArticleList from "./components/ArticleList";
import moment from "moment";
import axios from "axios";

export default {
  name: 'home-page',
  components: {
    ArticleList,
    HeaderNav
  },
  data() {
    return {
      articles: [],
      viArtivles: [],
      allArticles:[],
      all: false,
      en: true,
      vi: false
    }
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      const response = await axios.get("./db.json");
      const articles =  response.data.articles;
      this.allArticles = articles.sort((firstArticle, secondArticle) => {
        if(moment(firstArticle.publishDate).isAfter(secondArticle.publishDate)) {
          return -1;
        }
        if(moment(firstArticle.publishDate).isBefore(secondArticle.publishDate)) {
          return 1
        }
        return 0;
      });
      this.articles = this.allArticles.filter((article) => !article.tags.includes('vi'));
    },
    listArticles: function(tag) {
      switch(tag) {
        case "vi":
          this.articles = this.allArticles.filter((article) => article.tags.includes('vi'))
          this.all = false;
          this.en = false;
          this.vi = true;
          break;
        case "en":
          this.articles = this.allArticles.filter((article) => !article.tags.includes('vi'));
          this.all = false;
          this.en = true;
          this.vi = false;
          break;
        case "all":
          this.articles = this.allArticles;
          this.all = true;
          this.en = false;
          this.vi = false;
          break;
        default:
          this.articles = this.allArticles.filter((article) => !article.tags.includes('vi'));
          this.all = false;
          this.en = true;
          this.vi = false;
      }
    }
  }
}
</script>

<style>
</style>
