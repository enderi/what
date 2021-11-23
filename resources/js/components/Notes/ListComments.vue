<template>
  <ul class="list-group list-group-flush">
    <li v-for="comment in comments" class="list-group-item">
      <div class="row">
        <div class="col-8">
          {{ comment.text }}
        </div>
        <div class="col-4">
          <span class="text-right"
            ><small>{{ comment.created_at | moment('YYYY-MM-DD') }}</small></span
          >
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    comments: Array,
    maxRows: Number,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>