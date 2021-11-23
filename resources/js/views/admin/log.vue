<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <input
          type="text"
          id="what"
          class="form-control mb-2"
          autofocus
          autocomplete="off"
          v-model="text"
          placeholder="What..?"
        />
      </div>
      <div class="col-xs-8 col-sm-4">
        <select
          v-if="categories"
          v-model="category"
          class="custom-select mb-2"
          aria-label="Select category"
        >
          <option value="">- No Category -</option>
          <option v-for="category in categories" :value="category.tag">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="col-xs-4 col-sm-2">
        <button type="submit" class="btn btn-primary btn-block mb-2">
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import ListNotes from "../../components/Notes/ListNotes";
import SelectCategory from "../../components/Notes/SelectCategory.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ListNotes,
    SelectCategory,
  },
  name: "Dashboard",
  mounted() {
    this.$store.dispatch("fetchInfo");
  },
  data() {
    return {
      text: "",
      category: "",
      notes: [],
      categories: [],
    };
  },
  mounted() {
    axios.get("info").then((resp) => {
      this.notes = resp.data.notes;
      this.categories = resp.data.categories;
    });
  },
  methods: {
    submit() {
      var self = this;
      axios
        .post("/notes", { text: this.text, category: this.category })
        .then((resp) => {
          self.text = "";
          self.$store.dispatch("fetchInfo");
          this.$bvToast.toast(`Note saved`, {
            //title: 'BootstrapVue Toast',
            autoHideDelay: 5000,
            solid: true,
            variant: 'success',
            toaster: 'b-toaster-bottom-center'
          });
          this.$emit('saved', resp.data)
        });
    },
  },
  watch: {
    text(newText, oldText) {
      var re = /(^|\s)(#[a-zöäå\d-]+)/gi;
      var s = newText;
      var m;
      var category = null;
      do {
        m = re.exec(s);
        if (m) {
          this.category = m[2].split("#")[1];
          break;
        }
      } while (m);
    },
  },
};
</script>
