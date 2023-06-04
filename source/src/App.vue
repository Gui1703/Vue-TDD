<script>
import LanguageSelector from "./components/LanguageSelector.vue";
import SignUpPage from "./pages/SignUpPage.vue";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import UserPage from "./pages/UserPage.vue";

export default {
  name: "App",
  components: { UserPage, LoginPage, HomePage, SignUpPage, LanguageSelector },
  data() {
    return { path: window.location.pathname };
  },
  methods: {
    onClickLink(event) {
      this.path = event.target.attributes.href.value;
      window.history.pushState({}, "", this.path);
    },
  },
};
</script>

<template>
  <div class="container">
    <a @click.prevent="onClickLink" href="/" title="Home">Hoaxify</a>
    <a @click.prevent="onClickLink" href="/signup" title="Sign Up">
      {{ $t("signUp") }}
    </a>
    <a @click.prevent="onClickLink" href="/login" title="Login">Login</a>
    <HomePage v-if="path === '/'" />
    <LoginPage v-else-if="path === '/login'" />
    <SignUpPage v-else-if="path === '/signup'" />
    <UserPage v-else-if="path.startsWith('/user/')" />
    <LanguageSelector />
  </div>
</template>
