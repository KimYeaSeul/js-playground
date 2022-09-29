import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { userSetter } from "core-js/fn/symbol";

createApp(App).use(router).mount("#app");
