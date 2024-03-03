import { getMe } from "~/services/auth/auth.service";

export interface IUser {
  displayName: string;
  email: string;
  id: string;
}

export const useAuthStore = defineStore("global/auth", () => {
  // const user = ref<IUser | null>(null);
  const accessToken = useCookie("authorization");
  const { data: user, execute } = getMe();

  const logout = () => {
    accessToken.value = null;
    user.value = null;
    navigateTo("/");
  };

  const fetchUserInfo = async () => {
    if (user.value || !isAuth.value) return;
    await execute();
  };

  const isAuth = computed(() => {
    return !!accessToken.value;
  });

  return {
    accessToken,
    fetchUserInfo,
    isAuth,
    logout,
    user,
  };
});

export default useAuthStore;
