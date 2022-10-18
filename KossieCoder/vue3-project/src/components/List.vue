<template>
  <div
    v-for="item in itmes"
    :key="item.id"
    class="card mt-2"
  >
    <slot :item="item" />
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style></style>
