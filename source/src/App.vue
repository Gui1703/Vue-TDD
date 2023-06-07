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
      this.path = event.currentTarget.attributes.href.value;
      window.history.pushState({}, "", this.path);
    },
  },
};
</script>

<template>
  <div class="shadow-sm bg-light">
    <nav class="navbar navbar-expand navbar-light container">
      <div class="container-fluid">
        <a
          class="navbar-brand"
          @click.prevent="onClickLink"
          href="/"
          title="Home"
        >
          <img src="./assets/hoaxify.png" alt="Hoaxify Logo" width="60" />
          Hoaxify
        </a>

        <ul class="navbar-nav ml-auto">
          <a
            class="nav-link"
            @click.prevent="onClickLink"
            href="/signup"
            title="Sign Up"
          >
            {{ $t("signUp") }}
          </a>
          <a
            class="nav-link"
            @click.prevent="onClickLink"
            href="/login"
            title="Login"
          >
            Login
          </a>
        </ul>
      </div>
    </nav>
  </div>

  <div class="container">
    <HomePage v-if="path === '/'" />
    <LoginPage v-else-if="path === '/login'" />
    <SignUpPage v-else-if="path === '/signup'" />
    <UserPage v-else-if="path.startsWith('/user/')" />
    <LanguageSelector />
  </div>
</template>
