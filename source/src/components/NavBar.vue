<template>
  <div class="shadow-sm bg-light mb-3">
    <nav class="navbar navbar-expand navbar-light container">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/" title="Home">
          <img src="./assets/hoaxify.png" alt="Hoaxify Logo" width="60" />
          Home
        </router-link>

        <ul class="navbar-nav ml-auto">
          <router-link
            class="nav-link"
            to="/signup"
            title="Sign Up"
            v-if="!$store.state.isLoggedIn"
          >
            {{ $t("signUp") }}
          </router-link>
          <router-link
            class="nav-link"
            to="/login"
            title="Login"
            v-if="!$store.state.isLoggedIn"
          >
            Login
          </router-link>
          <router-link
            class="nav-link"
            :to="`'user/${$store.state.id}`"
            v-if="$store.state.isLoggedIn"
          >
            My Profile
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>
