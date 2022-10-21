<template>
  <div>Home page</div>
  <div>{{ count }}</div>
  <button @click="count++">
    Add
  </button>
  <Datepicker
    v-model="date"
    :max-date="new Date()"
  />
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import { useCount } from "@/composables/count";
export default {
  components: { Datepicker },
  setup() {
    // 객체를 구조분해해서 가져오믄 반응성을 잃게 된다.
    // 따라서 toRefs 사용
    const { count } = useCount();
    const date = ref(new Date());

    return {
      date,
      count,
    };
  },
};
// https://vue3datepicker.com/api/props/#range
</script>
<style></style>
