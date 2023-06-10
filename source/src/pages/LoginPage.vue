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
            <button
              class="btn btn-primary"
              :disabled="isDisabled || apiProgress"
              @click.prevent="submit"
            >
              <Spinner />
              {{ $t("login") }}
            </button>
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>
<script>
import InputComponent from "../components/InputComponent.vue";
import Spinner from "../components/Spinner.vue";
import Card from "../components/Card.vue";
export default {
  name: "LoginPage",
  components: { Card, Spinner, InputComponent },
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
        this.$router.push("/");
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
