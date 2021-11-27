<template>
  <div>
    <log-fields @saved="noteAdded"></log-fields>
    <div class="card mt-1">
      <div class="card-header d-flex justify-content-between align-items-center">Notes
        <div class="" v-if="tagFilter">
          <router-link :to="{name: 'notes'}">Show all</router-link>
        </div>
        <!-- <b-dropdown id="dropdown-form" text="Filter" ref="dropdown" class="m-2">
           <b-dropdown-form>
              <b-form-checkbox variant="primary" v-model="categoryFilter">By Category</b-form-checkbox>
           </b-dropdown-form>
        </b-dropdown> -->
      </div>
      <ul
        class="list-group list-group-flush"
        style="max-height: 65vh; overflow-y: auto"
      >
        <li v-for="aNote in filteredNotes" class="list-group-item pt-0 pb-0 pl-2 pr-2">
          <div class="row">
            <div class="col-7">
              <small class="text-muted"
                  >{{ aNote.created_at | moment("DD.MM.YYYY") }}
                  <span v-if="aNote.category"
                    >| <router-link :to="{name:'show-by-category', params: {tag: aNote.category.tag}}"> {{ aNote.category.name }}</router-link></span
                  ></small
                >
            </div>
            <div class="col-5 text-right">
              <a
                @click="deleteNote(aNote)"
                class="btn btn-link p-1 text-danger"
                ><i class="fa fa-times"></i>
              </a>
              <a
                @click="commentNote(aNote)"
                class="btn btn-link p-1"
                ><i class="fa fa-comment"></i>
              </a>
              <router-link :to="{ name: 'editNote', params: { id: aNote.id } }" class="btn btn-link p-1">
                <i class="fa fa-edit"></i>
              </router-link>
            </div>
            <div class="col-12">
                <p>{{ aNote.text }}</p>
            </div>
          </div>
          <div v-if="commenting[aNote.id]">
            <add-comment
              :note-id="aNote.id"
              @saved="reloadComments($event, aNote)"
            ></add-comment>
            <list-comments :comments="aNote.comments"></list-comments>
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
export default {
  name: "Manage",
  components: {
    AddComment,
    ListComments,
    LogFields,
  },
  mounted() {
    console.log("monttu", this.$route.params);
    this.loadData();
  },
  data() {
    return {
      notes: [],
      categories: [],
      commenting: {},
      categoryFilter: false,
      tagFilter: null      
    };
  },
  computed: {
    filteredNotes() {
      this.tagFilter = this.$route.params.tag
      if(this.$route.params && this.$route.params.tag){
        return _.filter(this.notes, item => {
          return item.category && item.category.tag === this.tagFilter
        })
      }
      return this.notes
    }
  },
  methods: {
    loadData() {
      axios.get("info").then((resp) => this.parseStuff(resp.data));
    },
    parseStuff(data) {
      this.notes = data.notes
      this.categories = data.categories;
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
      if(this.commenting[note.id]) {
        this.$set(this.commenting, note.id, false);
      } else {
        this.$set(this.commenting, note.id, true);
      }
    },
    noteAdded(resp) {
      this.commentNote(resp)
      this.loadData()
    },
    reloadComments(comment, note) {
      note.comments.push(comment)
    },
  },
};
</script>
