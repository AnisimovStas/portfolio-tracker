<template>
  <div class="page__container">
    <h1>Добро пожаловать в портфолио!</h1>
    <h1>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolorem,
      error, explicabo illum neque nihil perspiciatis quae repellat, sit tenetur
      totam ut. Aperiam dignissimos eligendi necessitatibus officia perspiciatis
      quos sunt!
    </h1>
    <h1>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur
      cupiditate debitis delectus dolorem eaque error iusto, libero
      reprehenderit sint, temporibus vero vitae, voluptate. Accusantium
      consequatur culpa debitis deserunt, dolorem eum facere mollitia, nisi,
      numquam pariatur praesentium quam quos recusandae sapiente sint vitae
      voluptatem! Autem incidunt ipsam magnam pariatur! Ipsa?
    </h1>
    <h1>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at consequatur
      corporis culpa cumque debitis deserunt dolor doloribus fuga nesciunt
      nostrum, obcaecati officiis praesentium qui quisquam quod tempora, vel
      veniam.
    </h1>
    <h1>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto
      aspernatur atque beatae debitis esse ex excepturi exercitationem facilis
      fuga fugit natus obcaecati omnis quod, reiciendis similique sint tempora
      voluptatem?
    </h1>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();

onBeforeMount(async () => {
  if (authStore.isAuth && !authStore.user) {
    await authStore.getMe();
  }
});
</script>
<style scoped>
.page__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: var(--gap-s);
}
</style>
