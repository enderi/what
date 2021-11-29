<template>
  <ul class="pb-2">
    <li v-for="comment in reversed">
      <span :class="{'strikethrough': comment.resolved}" >{{ comment.text }}</span> <small class="text-muted">{{ comment.created_at | moment('YYYY-MM-DD') }}</small>
      <small v-if="!comment.resolved"><a class="btn btn-link text-danger" href="" @click="resolveComment(comment, $event)"><i class="fa fa-times"></i></a></small>
    </li>
  </ul>
</template>

<style scoped>
.strikethrough {
  text-decoration:line-through;
}
</style>

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
  methods: {
    resolveComment(comment, event) {
      event.preventDefault()
      axios.post('comments/' + comment.id + '/resolve')
      .then(() => {
        this.$emit('commentchanged');
      })
    }
  },
};
</script>