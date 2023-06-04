<script>
import LanguageSelector from "./components/LanguageSelector.vue";
import SignUpPage from "./pages/SignUpPage.vue";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import UserPage from "./pages/UserPage.vue";

export default {
  name: "App",
  components: { UserPage, LoginPage, HomePage, SignUpPage, LanguageSelector },
  computed: {
    path() {
      return window.location.pathname;
    },
  },
};
</script>

<template>
  <div class="container">
    <HomePage v-if="path === '/'" />
    <LoginPage v-else-if="path === '/login'" />
    <SignUpPage v-else-if="path === '/signup'" />
    <UserPage v-else-if="path.startsWith('/user/')" />
    <LanguageSelector />
  </div>
</template>
