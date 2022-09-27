<template>
  Todo SImple Form
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          v-model="todo"
          class="form-control"
          type="text"
          placeholder="Type new to-do"
        >
      </div>
      <div>
        <button
          class="btn btn-primary"
          type="submit"
        >
          Add
        </button>
      </div>
    </div>
    <div
      v-show="hasError"
      style="color: red"
    >
      This field cannot be empty
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["add-todo"],
  setup(props, { emit }) {
    const todo = ref("");
    const hasError = ref(false);

    // e.preventDefault(); == @submit.prevent="onSubmit"
    const onSubmit = (e) => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        todo.value = "";
        hasError.value = false;
      }
    };

    return { todo, hasError, onSubmit };
  },
};
</script>

<style></style>
