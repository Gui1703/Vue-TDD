<script>
export default { props: { user: { username: String, image: String } } };
</script>

<template>
  <img
    class="rounded-circle shadow-sm"
    src="../assets/profile.png"
    width="30"
    alt="profile"
  />
  {{ user.username }}
</template>
