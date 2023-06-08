<script>
import { loadUsers } from "../api/apiCalls";

export default {
  data() {
    return { page: { content: [], page: 0, size: 0, totalPages: 0 } };
  },
  async mounted() {
    const { data } = await loadUsers();
    this.page = data;
  },
};
</script>

<template>
  <div class="card">
    <div class="card-header text-center">
      <h3>Users</h3>
    </div>

    <ul class="list-group list-group-flash">
      <li
        class="list-group-item list-group-item-action"
        v-for="user in page.content"
        :key="user.id"
      >
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
