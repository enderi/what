<template>
  <ul class="pb-2">
    <li v-for="comment in reversed">
      {{ comment.text }} <small class="text-muted">{{ comment.created_at | moment('YYYY-MM-DD') }}</small>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    comments: Array,
    maxRows: Number,
  },
  computed: {
    reversed() {
      return this.comments.reverse()
    }
  },
  data() {
    return {};
  },
  methods: {},
};
</script>