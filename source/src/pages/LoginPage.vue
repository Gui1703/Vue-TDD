<script>
import ButtonWithProgress from "../components/ButtonWithProgress.vue";
import Card from "../components/Card.vue";
import InputComponent from "../components/InputComponent.vue";
import { login } from "../api/apiCalls";
export default {
  name: "LoginPage",
  components: { ButtonWithProgress, Card, InputComponent },
  data() {
    return {
      email: "",
      password: "",
      apiProgress: false,
      failMessage: undefined,
    };
  },
  computed: {
    isDisabled() {
      return !(this.email && this.password);
    },
  },
  methods: {
    async submit() {
      this.apiProgress = true;
      try {
        const { data } = await login({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");

        const response = { ...data, header: `Bearer ${data.token}` };

        this.$store.commit("loginSuccess", response);
      } catch (error) {
        this.failMessage = error.response.data.message;
      }
      this.apiProgress = false;
    },
  },
  watch: {
    email() {
      this.failMessage = undefined;
    },
    password() {
      this.failMessage = undefined;
    },
  },
};
</script>

<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="login-page"
  >
    <form class="mt-5">
      <Card>
        <template v-slot:header>
          <h1>{{ $t("login") }}</h1>
        </template>
        <template v-slot:body>
          <InputComponent id="e-mail" :label="$t('email')" v-model="email" />
          <InputComponent
            id="password"
            :label="$t('password')"
            v-model="password"
            type="password"
          />
          <div class="alert alert-danger text-center" v-if="failMessage">
            {{ failMessage }}
          </div>
          <div class="text-center">
            <ButtonWithProgress
              :api-progress="apiProgress"
              :disabled="isDisabled"
              :on-click="submit"
            >
              {{ $t("login") }}
            </ButtonWithProgress>
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>
