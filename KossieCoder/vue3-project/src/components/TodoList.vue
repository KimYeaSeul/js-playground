<template>
  <List :items="todos">
    <!-- List.vue에 보내기만 하면 for문 돌면서 item 을 이파일에서 쓸 수 없음. -->
    <!--  그래서 List.vue에서 slot에 :item지정해서 TodoList.vue로 또 데이터 보내주고 -->
    <!-- #default로 데이터 받아서 사용 -->
    <!-- slotProps안에 :item 이 들어오게되는 것이지 -->
    <!-- <template #default="slotProps"> -->
    <!-- 구조분해할당을 이용하여 item만 가져올수도 있음 -->

    <template #default="{ item, index }">
      <div
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <!-- v-model="todo.completed" -->
          <input
            class="ms-2 me-2"
            :checked="item.completed"
            type="checkbox"
            @change="toggleTodo(index, $event)"
            @click.stop
          >
          <!-- @change를 @click.stop으로 바꾸어 주어도 됨.! -->
          <span :class="{ todo: item.completed }">
            {{ item.subject }}
          </span>
        </div>
        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </List>

  <Teleport to="#modal">
    <Modal
      v-if="showModal"
      @close="closeModal"
      @delete="deleteTodo"
    />
  </Teleport>
</template>
<script>
import router from "@/router";
import { useRouter } from "vue-router";
// import Modal from "@/components/Modal.vue";
import Modal from "@/components/DeleteModal.vue";
import List from "@/components/List.vue";
import { ref } from "vue";
export default {
  components: { Modal, List },

  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const showModal = ref(false);
    const todoDeleteId = ref(null);
    const toggleTodo = (index, event) => {
      emit("toggle-todo", index, event.target.checked); // index를 부모에게 전달
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      emit("delete-todo", todoDeleteId.value);
      showModal.value = false;
      todoDeleteId.value = null;
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
    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
    };
  },
};
</script>
<style></style>
