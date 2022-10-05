<template>
  <div>Home page</div>
  <Datepicker
    v-model="date"
    :max-date="new Date()"
  />
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
export default {
  components: { Datepicker },
  setup() {
    const date = ref(new Date());

    return {
      date,
    };
  },
};
// https://vue3datepicker.com/api/props/#range
</script>
<style></style>
