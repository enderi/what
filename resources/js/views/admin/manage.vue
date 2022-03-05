<template>
  <div>
    <log-fields @saved="noteAdded"></log-fields>
    <div class="card mt-1">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        Notes
        <div class="" v-if="tagFilter">
          <span class="btn btn-link" @click="deselectCategory()">Show all</span>
        </div>
      </div>
      <ul
        class="list-group list-group-flush"
        style="max-height: 65vh; overflow-y: auto"
      >
        <li
          v-for="(aNote, $index) in filteredNotes"
          v-bind:key="$index"
          class="list-group-item pt-0 pb-0 pl-2 pr-2"
        >
          <div class="row">
            <div class="col-7">
              <span class="text-muted"
                >{{ aNote.created_at | moment("DD.MM.YYYY") }}
                <span v-if="aNote.category"
                  >|&nbsp;<span v-if="aNote.category.props.hideFromSelect">{{ aNote.category.name }}</span>
                  <span v-if="!aNote.category.props.hideFromSelect"
                    @click="selectCategory(aNote.category)"
                    class="btn btn-link">
                    {{ aNote.category.name }}
                  </span>
                </span>
              </span>
            </div>
            <div class="col-5 text-right">
              <a @click="commentNote(aNote)" class="btn btn-link">
                <div class="badge badge-pill badge-outline-info text-secondary">
                  <i class="fa fa-comment"></i> {{ aNote.comments.length }}
                </div>
              </a>
              <a @click="deleteNote(aNote)" class="btn btn-link text-danger"
                ><i class="fa fa-times"></i>
              </a>
              <router-link
                :to="{ name: 'editNote', params: { id: aNote.id } }"
                class="btn btn-link"
              >
                <i class="fa fa-edit"></i>
              </router-link>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p @click="commentNote(aNote)" class="text-primary">
                {{ aNote.text }}
              </p>
            </div>
          </div>
          <div v-if="commenting[aNote.id]">
            <add-comment
              :note-id="aNote.id"
              @saved="reloadComments($event, aNote)"
            ></add-comment>
            <list-comments
              @commentchanged="reloadAllComments(aNote)"
              :comments="aNote.comments"
            ></list-comments>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AddComment from "../../components/Notes/AddComment.vue";
import ListComments from "../../components/Notes/ListComments.vue";
import LogFields from "./log.vue";
import sortNotes from "../../services/NoteService";
import { mapGetters } from "vuex";

export default {
  name: "Manage",
  components: {
    AddComment,
    ListComments,
    LogFields,
  },
  mounted() {
    this.loadData();
  },
  data() {
    return {
      notes: [],
      categories: [],
      commenting: {},
      categoryFilter: false,
      tagFilter: null,
    };
  },
  computed: {
    ...mapGetters(["selectedCategory"]),
    filteredNotes() {
      this.tagFilter = this.selectedCategory;
      if (this.tagFilter) {
        return _.filter(this.notes, (item) => {
          return item.category && item.category.tag === this.tagFilter;
        });
      }
      return this.notes;
    },
  },
  methods: {
    loadData() {
      axios.get("info").then((resp) => this.parseStuff(resp.data));
    },
    parseStuff(data) {
      this.notes = data.notes;
      this.categories = data.categories;
      sortNotes(data);
    },
    open(note) {
      //axios.get("note/" + note.id);
    },
    keep(note) {
      axios.post("notes/" + note.id + "/keep", {}).then(this.loadData);
    },
    deleteNote(note) {
      if (confirm("Really delete?")) {
        this.forget(note);
      }
    },
    forget(note) {
      axios.delete("notes/" + note.id).then(this.loadData);
    },
    commentNote(note) {
      if (this.commenting[note.id]) {
        this.$set(this.commenting, note.id, false);
      } else {
        this.$set(this.commenting, note.id, true);
      }
    },
    noteAdded(resp) {
      this.commentNote(resp);
      this.loadData();
    },
    reloadComments(comment, note) {
      note.comments.push(comment);
    },
    reloadAllComments(note) {
      axios.get("notes/" + note.id + "/comments").then((resp) => {
        note.comments = resp.data;
      });
    },
    selectCategory(cat) {
      this.$store.dispatch("selectCategory", cat.tag);
    },
    deselectCategory() {
      this.$store.dispatch("selectCategory", '')
    }
  },
};
</script>
