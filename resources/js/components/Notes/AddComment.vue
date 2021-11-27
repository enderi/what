<template>
  <form @submit.prevent="addComment">
    <input
      type="text"
      class="form-control"
      autofocus
      :ref="'comment_' + noteId"
      v-model="comment"
      :id="'comment_'+ noteId"
      placeholder="new comment"
    />
  </form>
</template>

<script>
export default {
  props: {
    noteId: Number,
  },
  data() {
    return {
      comment: "",
    };
  },
  mounted() {
  },
  methods: {
    addComment() {
      var self = this;
      axios.post(
        "/notes/" + this.noteId + "/comment",
        { comment: this.comment })
        .then(resp => {
          self.comment = ''
          self.$emit('saved', resp.data)
        })
    },
  },
};
</script>