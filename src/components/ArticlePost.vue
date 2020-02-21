<template>
  <div class="small-container">
    <div id="main-content">
      <header class="single-header">
        <h2>{{ title }}</h2>
      </header>
      <div class="post">
        <div id="post-content">
          <div v-html="content"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import axios from "axios"

export default {
  name:"article-post",
  data() {
    return {
      title:"",
      content: ""
    }
  },
  methods: {
    async loadPost() {
      console.log(this.$router.currentRoute.fullPath);
      const url = this.$router.currentRoute.fullPath +".md";
      const response = await axios.get(url);
      const post = getPost(response.data);
      this.content = marked(post.content);
      this.title = post.title;
    }
  },
  mounted() {
    this.loadPost();
  }
};
function getPost(data) {
  const tag = "---";
  const openedTagIndex = data.indexOf(tag);
  if(openedTagIndex > -1) {
    const closedTagIndex = data.indexOf(tag,openedTagIndex + tag.length);
    const titleTag = "title:";
    const titleTagIndex = data.indexOf(titleTag)
    const newLineTagIndex = data.indexOf('\n',titleTagIndex);
    const title = data.substring(titleTagIndex+titleTag.length, newLineTagIndex).trim();
    const content = data.substring(closedTagIndex + tag.length);
    return {
      title,
      content
    }
  }
  return data;
}
</script>