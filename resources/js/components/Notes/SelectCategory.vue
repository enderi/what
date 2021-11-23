<template>
<div>
  {{categories}}
<ul class="list-group list-group-flush">
    <li v-for="category in categories" class="list-group-item">
      {{ category.tag }}
    </li>
</ul>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["categories"]),
  },  
  props: {
    category: String
  },
  mounted() {
  },
  data() {
    return {};
  },
  methods: {},
};
</script>