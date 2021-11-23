<template>
<div>
<ul class="list-group list-group-flush">
    <li v-for="note in notes" class="list-group-item">
      {{ note.text }}
    </li>
</ul>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    notes: Array
  },
  data() {
      return {
        
      }
  },
  methods: {
  },
};
</script>