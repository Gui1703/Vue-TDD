<script>
import LanguageSelector from "./components/LanguageSelector.vue";

export default {
  name: "App",
  components: { LanguageSelector },
  data() {
    return { path: window.location.pathname };
  },
};
</script>

<template>
  <div class="shadow-sm bg-light mb-3">
    <nav class="navbar navbar-expand navbar-light container">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/" title="Home">
          <img src="./assets/hoaxify.png" alt="Hoaxify Logo" width="60" />
          Home
        </router-link>

        <ul class="navbar-nav ml-auto">
          <router-link class="nav-link" to="/signup" title="Sign Up">
            {{ $t("signUp") }}
          </router-link>
          <router-link class="nav-link" to="/login" title="Login">
            Login
          </router-link>
        </ul>
      </div>
    </nav>
  </div>

  <div class="container">
    <router-view />
    <LanguageSelector />
  </div>
</template>
