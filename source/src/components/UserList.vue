<script>
import { loadUsers } from "../api/apiCalls";
import UserListItem from "../components/UserListItem.vue";

export default {
  components: { UserListItem },
  data() {
    return { page: { content: [], page: 0, size: 0, totalPages: 0 } };
  },
  async mounted() {
    const { data } = await loadUsers();
    this.page = data;
  },
  methods: {
    async loadData(pageIndex) {
      const { data } = await loadUsers(pageIndex);
      this.page = data;
    },
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
        @click="$router.push(`/user/${user.id}`)"
      >
        <UserListItem :user="user" />
      </li>
    </ul>

    <div class="card-footer">
      <button
        class="btn btn-outline-secondary btn-sm"
        @click="loadData(this.page.page - 1)"
        v-if="page.page > 0"
      >
        &lt; prev
      </button>
      <button
        class="btn btn-outline-secondary btn-sm float-end"
        @click="loadData(this.page.page + 1)"
        v-if="page.totalPages > page.page + 1"
      >
        next &gt;
      </button>
    </div>
  </div>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>
