<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      :value="subject"
      type="text"
      class="form-control"
      @input="onInput"
    >
    <div
      v-if="error"
      style="color: red"
    >
      {{ error }}
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from "vue";
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  // props 한개만 사용할 때는 modelValue 로 하고 v-model:modelValue 는 v-model로 생략 가능
  setup() {
    const { emit } = getCurrentInstance();
    const onInput = (e) => {
      emit("update:subject", e.target.value);
    };
    return { onInput };
  },
};
</script>
