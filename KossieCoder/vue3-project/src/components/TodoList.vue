<template>
  <div
    v-for="(todo, index) in todos"
    :key="todo.id"
    class="card mt-2"
  >
    <div
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(todo.id)"
    >
      <div class="form-check flex-grow-1">
        <!-- v-model="todo.completed" -->
        <input
          :checked="todo.completed"
          class="form-check-input"
          type="checkbox"
          @change="toggleTodo(index, $event)"
          @click.stop
        >
        <!-- @change를 @click.stop으로 바꾸어 주어도 됨.! -->
        <label
          class="form-check-label"
          :class="{ todo: todo.completed }"
        >
          {{ todo.subject }}
        </label>
      </div>
      <div>
        <button
          class="btn btn-danger btn-sm"
          @click.stop="deleteTodo(index)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import { useRouter } from "vue-router";
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const toggleTodo = (index, event) => {
      emit("toggle-todo", index, event.target.checked); // index를 부모에게 전달
    };

    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };

    const moveToPage = (todoId) => {
      console.log(todoId);
      // router.push("todos/" + todoId);
      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };
    return { toggleTodo, deleteTodo, moveToPage };
  },
};
</script>
<style></style>
