<template>
  <div class="container">
    <h1>Todo List</h1>
    <form @submit="onSubmit" class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>
      <div class="">
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </form>
    <div class="card mt-2" v-for="todo in todos" v-bind:key="todo.id">
      <div class="card-body p-2">
        {{ todo.subject }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const todo = ref("");
    const todos = ref([
      { id: 1, subject: "휴대폰 바꾸기" },
      { id: 2, subject: "밥먹기" },
    ]);
    const onSubmit = (e) => {
      e.preventDefault();

      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      });
      todo.value = "";
    };
    return { todo, todos, onSubmit };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
