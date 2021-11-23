<template>
  <div>
    <div class="row mb-3 mini-navi">
      <div class="col-6">
      </div>
      <div class="col-6 text-right"></div>
    </div>
    <log-fields @saved="noteAdded"></log-fields>
    <div v-if="notes && notes.length > 0" class="mb-3">
      <div class="list-group border border-success">
        <div
          v-for="item in notes"
          href="#"
          class="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div class="row">
            <div class="col-8">
              <div class="text-success">New item</div>
              <span
                ><small class="text-muted"
                  >{{ item.created_at | moment("DD.MM.YYYY") }}
                  <span v-if="item.category"
                    >| {{ item.category.name }}</span
                  ></small
                >
              </span>
              <br />
              <p class="mb1">
                {{ item.text }}
              </p>
            </div>
            <div class="col-4 text-right">
              <!-- <a @click="open(item)" class="btn btn-sm btn-primary">Open</a> -->
              <a
                @click="keep(item)"
                class="btn btn-sm btn-outline-primary text-end"
                ><i class="fa fa-save"></i
              ></a>
              <a @click="forget(item)" class="btn btn-sm btn-outline-danger"
                ><i class="fa fa-times"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-1">
      <div class="card-header">Notes</div>
      <ul
        class="list-group list-group-flush"
        style="max-height: 65vh; overflow-y: auto"
      >
        <li v-for="aNote in activeNotes" class="list-group-item">
          <div class="row">
            <div class="col-8">
              <small class="text-muted"
                  >{{ aNote.created_at | moment("DD.MM.YYYY") }}
                  <span v-if="aNote.category"
                    >| {{ aNote.category.name }}</span
                  ></small
                >
            </div>
            <div class="col-4 text-right">
              <a
                @click="commentNote(aNote)"
                class="btn btn-sm btn-link"
                ><i class="fa fa-comment"></i>
              </a>
              <a
                @click="deleteNote(aNote)"
                class="btn btn-sm btn-link text-danger"
                ><i class="fa fa-times"></i>
              </a>
            </div>
            <div class="col-12">
              <router-link :to="{ name: 'editNote', params: { id: aNote.id } }">
                {{ aNote.text }}
              </router-link>
            </div>
          </div>
          <div v-if="commenting[aNote.id]">
            <list-comments :comments="aNote.comments"></list-comments>
            <add-comment
              :note-id="aNote.id"
              @saved="reloadComments($event, aNote)"
            ></add-comment>
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
    console.log("monttu");
    this.loadData();
  },
  data() {
    return {
      notes: [],
      activeNotes: [],
      categories: [],
      commenting: {},
    };
  },
  methods: {
    loadData() {
      axios.get("info").then((resp) => this.parseStuff(resp.data));
    },
    parseStuff(data) {
      this.notes = data.notes.filter((mn) => mn.type === "FLOW");
      this.activeNotes = data.notes.filter((mn) => mn.type !== "FLOW");
      var categories = data.categories;
      console.log(this.notes, this.activeNotes);
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
      console.log(resp)
      this.loadData()
    },
    reloadComments(comment, note) {
      note.comments.push(comment)
      
      return;
      axios.get("notes/" + note.id + "/comments").then((resp) => {
        console.log(resp);
        this.$set(note, "comments", resp.data);
      });
    },
  },
  computed: {},
};
</script>
