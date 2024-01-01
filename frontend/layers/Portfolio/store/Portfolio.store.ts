export const usePortfolioStore = defineStore("portfolio", () => {
  const isAuthCookie = useCookie("authorization");

  const { data, pending, refresh } = useFetch("/api/portfolios", {
    headers: {
      Authorization: `Bearer ${isAuthCookie.value}`,
    },
  });

  const createPortfolio = async () => {
    await $fetch("/api/portfolios/create", {
      headers: {
        Authorization: `Bearer ${isAuthCookie.value}`,
      },
      method: "POST",
    });
  };

  const isPortfolioEmpty = computed(() => {
    return !!data.value;
  });

  const getActives = async () => await refresh();

  return {
    createPortfolio,
    data,
    getActives,
    isPortfolioEmpty,
    pending,
  };
});
