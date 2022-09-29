import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/index.vue";
import Todos from "@/pages/todos/index.vue";

const router = reateRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/todos",
      name: "Todos",
      component: Todos,
    },
  ],
});

//  /home   /todos   /todos/create   /todos/:id
export default router;
