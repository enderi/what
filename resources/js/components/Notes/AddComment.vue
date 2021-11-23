<template>
  <form @submit.prevent="addComment">
    <input
      type="text"
      class="form-control"
      autofocus
      v-model="comment"
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