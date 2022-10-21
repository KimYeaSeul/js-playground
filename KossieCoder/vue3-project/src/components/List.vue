<template>
  <div
    v-for="(item, index) in items"
    :key="item.id"
    class="card mt-2"
  >
    <!-- 데이터를 올려보내자. -->
    <slot
      :item="item"
      :index="index"
    />
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
