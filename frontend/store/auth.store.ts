export interface IUser {
  displayName: string;
  email: string;
  id: string;
}

export const useAuthStore = defineStore("global/auth", () => {
  // const user = ref<IUser | null>(null);
  const isAuthCookie = useCookie("authorization");

  const {
    data: user,
    pending: isLoading,
    error,
    refresh,
  } = useFetch<IUser>("/api/auth/getMe", {
    headers: {
      Authorization: `Bearer ${isAuthCookie.value}`,
    },
  });

  const getMe = async () => {
    await refresh();
  };

  watch(
    () => error.value,
    () => {
      if (error.value) {
        isAuthCookie.value = null;
      }
    },
  );

  const logout = async () => {
    await $fetch("/api/auth/logout", { method: "DELETE" });
    isAuthCookie.value = null;
    user.value = null;
    navigateTo("/");
  };

  const isAuth = computed(() => {
    const isAuthCookie = useCookie("authorization");
    return !!isAuthCookie.value;
  });

  return {
    getMe,
    isAuth,
    isLoading,
    logout,
    user,
  };
});

export default useAuthStore;
