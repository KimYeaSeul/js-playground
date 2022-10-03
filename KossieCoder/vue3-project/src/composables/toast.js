import { ref, onUnmounted } from "vue";

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastAlertType = ref("");
  const timeout = ref(null);
  const triggerToast = (message, type = "success") => {
    toastAlertType.value = type;
    toastMessage.value = message;
    showToast.value = true;
    // 페이지를 벗어났을 대 아래 부분을 실행 시킬 필요 없다.
    timeout.value = setTimeout(() => {
      toastAlertType.value = "";
      toastMessage.value = "";
      showToast.value = false;
    }, 3000);
  };
  onUnmounted(() => {
    clearTimeout(timeout.value);
  });
  return {
    triggerToast,
    toastAlertType,
    toastMessage,
    showToast,
  };
};
