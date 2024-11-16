import { defineStore } from "pinia";
import { ref } from "vue";
import { http } from "../shared/Http";
import { AxiosResponse } from "axios";

export const useMeStore = defineStore("meStore", () => {
  const me = ref<User>();
  const mePromise = ref<Promise<AxiosResponse<Resource<User>>>>();
  const refreshMe = () => {
    mePromise.value = http.get<Resource<User>>("/me",{},{_mock:"me"});
  };
  return { me, mePromise, refreshMe };
});
