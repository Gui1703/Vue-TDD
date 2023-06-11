<script>
import { loadUsers } from "../api/apiCalls";
import Card from "../components/Card.vue";
import Spinner from "../components/Spinner.vue";
import UserListItem from "../components/UserListItem.vue";

export default {
  components: { Card, Spinner, UserListItem },
  data() {
    return {
      page: { content: [], page: 0, size: 0, totalPages: 0 },
      progress: false,
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData(pageIndex) {
      this.progress = true;
      const { data } = await loadUsers(pageIndex);
      this.page = data;
      this.progress = false;
    },
  },
};
</script>

<template>
  <Card>
    <template v-slot:header>
      <h3>{{ $t("users") }}</h3>
    </template>
    <template v-slot:default>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item list-group-item-action"
          v-for="user in page.content"
          @click="$router.push('/user/' + user.id)"
          :key="user.id"
        >
          <UserListItem :user="user" />
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <button
        class="btn btn-outline-secondary btn-sm float-start"
        @click="loadData(this.page.page - 1)"
        v-show="this.page.page !== 0 && !this.progress"
      >
        {{ $t("previousPage") }}
      </button>
      <button
        class="btn btn-outline-secondary btn-sm float-end"
        @click="loadData(page.page + 1)"
        v-show="this.page.totalPages > page.page + 1 && !this.progress"
      >
        {{ $t("nextPage") }}
      </button>
      <Spinner size="normal" v-show="this.progress" />
    </template>
  </Card>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>
