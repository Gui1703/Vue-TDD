<script lang="js">
import axios from 'axios'

export default {
  name: "SignUpPage",
  data() {
    return {
      apiProgress: false,
      signUpSuccess: false,
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      errors: {}
    };
  },

  methods: {
    submit() {
      this.apiProgress = true
      axios.post("/api/1.0/users", {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .then(() => this.signUpSuccess = true)
      .catch((error) => {
        if(error.response.status === 400){
          this.errors = error.response.data.validationErrors
        }
      })
      this.apiProgress = false
    },
  },

  computed: {
    isDisabled() {
      return this.password && this.passwordRepeat
        ? this.password !== this.passwordRepeat
        : true;
    },
  },
};
</script>

<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <form class="card mt-5" data-testid="form-sign-up" v-if="!signUpSuccess">
      <div class="card-header">
        <h1 class="text-center">Sign Up</h1>
      </div>

      <div class="card-body">
        <div class="mb-3">
          <label class="form-label" for="username">Username</label>
          <input
            class="form-control"
            id="username"
            type="text"
            v-model="username"
          />
          <span>{{ errors.username }}</span>
        </div>

        <div class="mb-3">
          <label class="form-label" for="email">E-mail</label>
          <input class="form-control" id="email" type="email" v-model="email" />
        </div>

        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            v-model="password"
          />
        </div>

        <div class="mb-3">
          <label class="form-label" for="password-repeat"
            >Password Repeat</label
          >
          <input
            class="form-control"
            id="password-repeat"
            type="password"
            v-model="passwordRepeat"
          />
        </div>

        <div class="text-center">
          <button
            class="btn btn-primary"
            :disabled="isDisabled || apiProgress"
            @click.prevent="submit"
          >
            <span
              v-if="apiProgress"
              class="spinner-border spinner-border-sm"
              role="status"
            />
            Sign Up
          </button>
        </div>
      </div>
    </form>

    <div class="alert alert-success mt-3" v-else>
      Please check your e-mail to activate your account
    </div>
  </div>
</template>
