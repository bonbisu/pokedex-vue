import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Home from "./Pages/Home.vue";
import PokemonDetails from "./Pages/PokemonDetails.vue";
import { createRouter, createWebHistory } from "vue-router";

// esse é basicamente o nosso arquivo principal, onde vamos importar tudo que precisamos para o nosso projeto
// e criar as rotas que vamos usar

// https://router.vuejs.org/guide/#javascript
const routes = [
  { path: "/", component: Home },
  // https://router.vuejs.org/guide/essentials/dynamic-matching.html#dynamic-route-matching-with-params
  { path: "/details/:id", component: PokemonDetails },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
