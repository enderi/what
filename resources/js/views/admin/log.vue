<template>
  <form @submit.prevent="submit">
    selectedCategory: {{selectedCategory}}
    <div class="row">
      <div class="col-xs-12 col-sm-8">
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="...add a note with #category"
          rows="2"
          max-rows="3"
          class="mb-2"
          autocomplete="off"
        ></b-form-textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-8 col-sm-4">
        <select
          v-if="categories"
          v-model="category"
          class="custom-select mb-2"
          aria-label="Select category"
          @change="categorySelected"
        >
          <option value="">- No Category -</option>
          <option
            v-if="newCategoryPlaceholder"
            :value="newCategoryPlaceholder.tag"
          >
            New: {{newCategoryPlaceholder.tag}}
          </option>
          <option v-for="category in categories" :value="category.tag">
            {{ category.name }} ({{category.notes_count}})
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
  data() {
    return {
      text: "",
      notes: [],
      categories: [],
      newCategoryPlaceholder: null,
      category: ''
    };
  },
  mounted() { 
    this.$store.dispatch("fetchInfo");
    axios.get("info").then((resp) => {
      this.notes = resp.data.notes;
      this.categories = _.chain(resp.data.categories)
      .sortBy('notes_count')
      .filter((f) => !f.props.hideFromSelect)
      .reverse()
      .valueOf();
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
            autoHideDelay: 5000,
            solid: true,
            variant: "success",
            toaster: "b-toaster-bottom-center",
          });
          this.$emit("saved", resp.data);
        });
    },
    categorySelected() {
      this.$store.dispatch("selectCategory", this.category);
    }
  },
  watch: {
    text(newText) {
      var re = /(^|\s)(#[a-zöäå\d-]+)/gi;
      var s = newText;
      var m;
      do {
        m = re.exec(s);
        if (m) {
          this.category = m[2].split("#")[1];
          break;
        }
      } while (m);
      if (this.category) {
        var exists = _.find(this.categories, { tag: this.category });
        if (exists) {
          this.newCategoryPlaceholder = null;
          return;
        } else {
          this.newCategoryPlaceholder = {
            tag: this.category,
          };
        }
      } else {
        this.newCategoryPlaceholder = null;
      }
    },
    selectedCategory(newT, oldT) {
      if(oldT !== newT) {
        this.category = newT
      }
    }
  },
  computed: {
    ...mapGetters(["selectedCategory"]),
  },
};
</script>
