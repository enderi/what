<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Whats..?</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'notes' }">Notes</b-nav-item>
        <b-nav-item :to="{ name: 'categories' }">Categories</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-button
          size="sm"
          variant="outline-primary text-white"
          class="my-2 my-sm-0"
          type="submit"
          @click="logout"
          >Log out</b-button
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Topbar",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("user", null);
      this.$router.push("/login");
    },
  },
};
</script>
