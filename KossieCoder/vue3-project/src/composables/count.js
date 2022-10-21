// convention 으로 앞에 use를 붙이더라.!
// property에 반응성을 넣어준다리~~
import { reactive, toRefs } from "vue";
export const useCount = () => {
  const state = reactive({
    count: 0,
  });
  // 객체 자체는 reactive하지만 안에있는 count(property)는 reactive하지 않다
  return toRefs(state);
};
// import 방법 1
// export default useCount
// import useCount

// import 방법 2
// import {useCount}
