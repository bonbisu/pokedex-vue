import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Home from "./Pages/Home.vue";
import PokemonDetails from "./Pages/PokemonDetails.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/details/:id", component: PokemonDetails },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
