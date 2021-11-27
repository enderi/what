<template>
  <b-container>
    <Topbar class="mb-3" />
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import Topbar from "../components/Topbar";

export default {
  name: "AdminLayout",
  components: {
    Topbar,
  },
  mounted() {},
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
