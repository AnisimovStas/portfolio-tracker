<template>
  <div class="miniprofile__container">
    <div v-if="!authStore.isAuth" class="auth-block">
      <p class="auth-text">Войдите:</p>
      <div class="auth-methods">
        <Icon
          src="SvgoAuthGoogleIcon"
          size="sm"
          @click="
            navigateTo(`${baseConfigUrl}/api/auth/google/login`, {
              external: true,
            })
          "
        />
      </div>
    </div>
    <div v-else class="miniprofile">
      <p v-if="authStore.user" class="user-text">
        {{ authStore.user.displayName }}
      </p>
      <div>
        <Icon size="sm" src="SvgoLogoutIcon" @click="authStore.logout" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

const config = useRuntimeConfig();
const baseConfigUrl = config.public.backendBaseUrl;

const authStore = useAuthStore();
</script>
<style scoped>
.miniprofile__container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 70px;
  color: var(--white);
}

.auth-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}

.auth-text {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}

.miniprofile {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}

.user-text {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  text-overflow: ellipsis;
}
</style>
