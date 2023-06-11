<script lang="js">
import Card from "../components/Card.vue";
import ButtonWithProgress from "../components/ButtonWithProgress.vue";
import InputComponent from '../components/InputComponent.vue';
import { signUp } from '../api/apiCalls'

export default {
  name: "SignUpPage",
  components: {Card, ButtonWithProgress, InputComponent },
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
    async submit() {
      this.apiProgress = true;
      try {
        await signUp({
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.signUpSuccess = true;
      } catch (error) {
        console.log(error)
        if (error.response.status === 400) {
          this.errors = error.response.data.validationErrors;
        }
        this.apiProgress = false;
      }
    },
  },
  computed: {
    isDisabled() {
      return this.password && this.passwordRepeat
        ? this.password !== this.passwordRepeat
        : true;
    },
    hasPasswordMismatch() {
      return this.password !== this.passwordRepeat
    }
  },
  watch: {
    username() { delete this.errors.username },
    email() { delete this.errors.email },
    password() { delete this.errors.password },
  },
};
</script>

<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="signup-page"
  >
    <form class="mt-5" data-testid="form-sign-up" v-if="!signUpSuccess">
      <Card>
        <template v-slot:header>
          <h1>{{ $t("signUp") }}</h1>
        </template>

        <template v-slot:body>
          <InputComponent
            :label="$t('username')"
            id="username"
            type="text"
            :help="errors.username"
            v-model="username"
          />
          <InputComponent
            :label="$t('email')"
            id="email"
            type="email"
            :help="errors.email"
            v-model="email"
          />
          <InputComponent
            :label="$t('password')"
            id="password"
            type="password"
            :help="errors.password"
            v-model="password"
          />
          <InputComponent
            :label="$t('passwordRepeat')"
            id="password-repeat"
            type="password"
            v-model="passwordRepeat"
            :help="hasPasswordMismatch ? $t('passwordMismatchValidation') : ''"
          />

          <div class="text-center">
            <ButtonWithProgress
              :api-progress="apiProgress"
              :disabled="isDisabled"
              :on-click="submit"
            >
              {{ $t("signUp") }}
            </ButtonWithProgress>
          </div>
        </template>
      </Card>
    </form>

    <div class="alert alert-success mt-3" v-else>
      {{ $t("accountActivationNotification") }}
    </div>
  </div>
</template>
