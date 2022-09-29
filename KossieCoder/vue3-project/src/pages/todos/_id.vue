<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">
    Loading...
  </div>
  <form
    v-else
    @submit.prevent="onSave"
  >
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input
            v-model="todo.subject"
            type="text"
            class="form-control"
          >
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              type="button"
              class="btn"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? "Completed" : "Incomplete" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-primary"
    >
      save
    </button>
    <button
      class="btn btn-outline-dark ml-2"
      @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
export default {
  setup() {
    const route = useRoute();
    const todo = ref(null);
    const loading = ref(true);

    const getTodo = async () => {
      const res = await axios.get(
        "http://localhost:3000/todos/" + route.params.id
      );
      todo.value = res.data;
      loading.value = false;
    };
    getTodo();

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };

    const onSave = async () => {
      await axios.put("http://localhost:3000/todos/" + route.params.id);
    };
    return { todo, loading, toggleTodoStatus, moveToTodoListPage };
  },
};
</script>
<style></style>
