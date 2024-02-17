import { useAuthStore } from "~/store/auth.store";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (!authStore.isAuth) {
    authStore.logout();
  }
  useAsyncData("fetch-user-info", authStore.fetchUserInfo);
});
