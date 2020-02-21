import Vue from "vue";
import Router from "vue-router";
import HomePage from "../HomePage";
import AboutMePage from "../AboutMePage";
import ContactPage from "../ContactPage";
import ArticlePage from "../ArticlePage";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/", name: "home", component: HomePage,
    },
    {
      path: "/about-me", name: "about-me", component: AboutMePage,
    },
    {
      path: "/contact", name: "contact", component: ContactPage,
    },
    { path: '*', component: ArticlePage }
  ]
})