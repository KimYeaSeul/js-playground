<template>
  <div>
    <h1>Todo List</h1>
    <input
      v-model="searchText"
      class="form-control"
      type="text"
      placeholder="Search"
      @keyup.enter="searchTodo"
    >
    <hr>
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">
      {{ error }}
    </div>
    <div v-if="!todos.length">
      There is noting to display
    </div>

    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="currentPage === 1 ? 'disabled' : ''"
        >
          <a
            style="cursor: pointer"
            class="page-link"
            aria-label="Previous"
            @click="getTodos(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
            <!-- <span class="sr-only">Previous</span> -->
          </a>
        </li>

        <li
          v-for="page in numOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(page)"
          >
            {{ page }}</a>
        </li>

        <li
          class="page-item"
          :class="currentPage === numOfPages ? 'disabled' : ''"
        >
          <a
            style="cursor: pointer"
            class="page-link"
            href="#"
            aria-label="Next"
            @click="getTodos(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
            <!-- <span class="sr-only">Next</span> -->
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import axios from "axios";

export default {
  components: { TodoSimpleForm, TodoList },
  setup() {
    const todos = ref([]);
    const error = ref("");
    const numOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1); //reactive
    const numOfPages = computed(() => {
      return Math.ceil(numOfTodos.value / limit);
    });

    const searchText = ref("");

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
        );
        // console.log(res.headers["x-total-count"]);
        numOfTodos.value = res.headers["x-total-count"];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    };
    getTodos();
    // async await 방식
    const addTodo = async (todo) => {
      // json db에 todo저장
      // (api 주소, data obj)
      error.value = "";
      console.log("1");
      try {
        const res = await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        });
        console.log("2");
        getTodos();
        // todos.value.push(res.data); // 배열이 추가 안되엠빼앰
      } catch (err) {
        error.value = "Something went wrong.";
      }
      console.log("3");
    };

    const toggleTodo = async (index, checked) => {
      console.log(checked);
      error.value = "";
      const id = todos.value[index].id;
      try {
        console.log("completeed");
        await axios.patch("http://localhost:3000/todos/" + id, {
          completed: checked,
        });
        todos.value[index].completed = checked; // 초기 코드
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    };

    const deleteTodo = async (index) => {
      error.value = "";
      const id = todos.value[index].id;
      try {
        const res = await axios.delete("http://localhost:3000/todos/" + id);
        console.log(res);
        getTodos();
        // todos.value.splice(index, 1); // 초기 삭제 코드
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    };

    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter((todo) => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }
    //   return todos.value;
    // });

    let timeout = null;
    // computed로만 하면 다른 페이지 제목은 검색이 안되는 문제가 있음
    watch(searchText, () => {
      // console.log(current, prev);
      // setTimeout (함수, 시간)
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 100);
    });

    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      error,
      getTodos,
      numOfPages,
      currentPage,
      searchTodo,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
