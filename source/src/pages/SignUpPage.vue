<script lang="js">
import InputComponent from '../components/InputComponent.vue';
import axios from 'axios'

export default {
  name: "SignUpPage",
  components: { InputComponent },
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
      this.apiProgress = true;
      axios.post("/api/1.0/users", {
        username: this.username,
        email: this.email,
        password: this.password,
      })
        .then(() => this.signUpSuccess = true)
        .catch((error) => {
          if (error.response.status === 400) {
            this.errors = error.response.data.validationErrors;
          }
        });
      this.apiProgress = false;
    },
  },
  computed: {
    isDisabled() {
      return this.password && this.passwordRepeat
        ? this.password !== this.passwordRepeat
        : true;
    },
  }
};
</script>

<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <form class="card mt-5" data-testid="form-sign-up" v-if="!signUpSuccess">
      <div class="card-header">
        <h1 class="text-center">Sign Up</h1>
      </div>

      <div class="card-body">
        <InputComponent
          label="Username"
          id="username"
          type="text"
          :help="errors.username"
          v-model="username"
        />
        <InputComponent
          label="E-mail"
          id="email"
          type="email"
          :help="errors.email"
          v-model="email"
        />
        <InputComponent
          label="Password"
          id="password"
          type="password"
          :help="errors.password"
          v-model="password"
        />
        <InputComponent
          label="Password Repeat"
          id="password-repeat"
          type="password"
          v-model="passwordRepeat"
        />

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
