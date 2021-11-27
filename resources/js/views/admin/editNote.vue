<template>
  <div>
    <b-card>
      <b-overlay :show="loading" rounded="sm">
        <div class="row">
          <div class="col-xs-12 col-sm-6 mt-3" style="min-height: 3em">

            <form>
              <div class="row mt-3">
                <div class="col-12">
                  <input
                    type="text"
                    id="what"
                    class="form-control form-control-lg"
                    autocomplete="off"
                    v-model="note.text"
                    placeholder="What..?"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-xs-12 col-sm-6 mb-2">
                  <select
                    v-model="note.category_id"
                    class="custom-select"
                    aria-label="Select category"
                  >
                    <option value="">- No Category -</option>
                    <option v-for="category in categories" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="col-xs-12 col-sm-6 text-right">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="saveEdit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-xs-12 col-sm-6">
            <p>Have a chat with yourself:</p>
            <add-comment :note-id="note.id" @saved="commentAdded"></add-comment>
            <ul class="mt-2">
              <li v-for="comment in orderedComments">
                {{ comment.text }}
              </li>
            </ul>
          </div>
        </div>
      </b-overlay>
    </b-card>
  </div>
</template>

<script>
import AddComment from "../../components/Notes/AddComment.vue";
import Borders from "./borders.vue";

export default {
  name: "editNote",
  components: {
    AddComment,
    Borders,
  },
  mounted() {
    this.loadData();
  },
  data() {
    return {
      loading: true,
      editing: true,
      categories: null,
      note: {},
      note: null,
    };
  },
  computed: {
    orderedComments() {
      return _.chain(this.note.comments)
        .sortBy("created_at")
        .reverse()
        .valueOf();
    },
  },
  methods: {
    loadData() {
      this.loading = true;
      axios
        .get("notes/" + this.$route.params.id)
        .then((resp) => {
          this.note = resp.data.note;
          this.categories = resp.data.categories;
        })
        .finally(() => (this.loading = false));
    },
    commentAdded(comment) {
      this.note.comments.push(comment);
    },
    enterEdit() {
      this.editing = true;
      this.note = {
        text: this.note.text,
        category_id: this.note.category_id,
      };
    },
    exitEdit() {
      this.editing = false;
    },
    saveEdit(e) {
      e.preventDefault()
      this.loading = true;
      axios
        .put("notes/" + this.note.id, this.note)
        .then((resp) => {
          this.note = resp.data;
          this.exitEdit();
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
