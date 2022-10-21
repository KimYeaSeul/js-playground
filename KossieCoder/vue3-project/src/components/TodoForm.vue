<template>
  <div v-if="loading">
    Loading...
  </div>
  <form
    v-else
    @submit.prevent="onSave"
  >
    <div class="row">
      <div class="col-6">
        <Input
          v-model:subject="todo.subject"
          label="Subject"
          :error="subjectError"
        />
      </div>
      <div
        v-if="editing"
        class="col-6"
      >
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

      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea
            id=""
            v-model="todo.body"
            cols="30"
            rows="10"
            class="form-control"
          />
        </div>
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="todoUpdated"
    >
      {{ editing ? "Update" : "Create" }}
    </button>
    <button
      class="btn btn-outline-dark ml-2"
      @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>
  <!-- <transition name="fade">
    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastAlertType"
    />
  </transition> -->
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onUpdated } from "vue";
import axios from "@/axios";
import router from "@/router";
import _ from "lodash";
// import Toast from "@/components/Toast.vue";
import { useToast } from "@/composables/toast";
import Input from "@/components/Input.vue";

export default {
  components: { Input },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: "",
      completed: false,
      body: "",
    });
    const subjectError = ref("");
    const originalTodo = ref(null);
    const loading = ref(false);
    const todoId = route.params.id;

    //쉽게 확인하는 툴
    onUpdated(() => {
      console.log(todo.value.subject);
    });

    const { triggerToast, toastAlertType, toastMessage, showToast } =
      useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`todos/${todoId}`);
        // todo.value = res.data;
        // originalTodo.value = res.data; // 같은 메모리를 바라보게 됨.
        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (err) {
        loading.value = false;
        console.log(err);
        triggerToast("Something went wrong", "danger");
      }
    };
    if (props.editing) {
      getTodo();
    }

    const todoUpdated = computed(() => {
      return _.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };

    const onSave = async () => {
      subjectError.value = "";
      if (!todo.value.subject) {
        subjectError.value = "Subject is required";
        return;
      }
      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        if (props.editing) {
          res = await axios.put(`todos/${todoId}`, data);
          originalTodo.value = { ...res.data };
        } else {
          res = await axios.post(`todos`, data);
        }
        console.log("onsave" + props.editing);
        const message = props.editing ? "Updated!" : "Created!";
        triggerToast("Successfully " + message);

        if (!props.editing) {
          router.push({
            name: "Todos",
          });
        }
      } catch (err) {
        console.log(err);
        triggerToast("Something went wrong", "danger");
      }
    };
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
      subjectError,
    };
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
