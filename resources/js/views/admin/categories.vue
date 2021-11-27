<template>
  <div>
    <div class="card mt-1">
      <div class="card-header">Categories</div>
      <ul
        class="list-group list-group-flush"
        style="max-height: 65vh; overflow-y: auto"
      >
        <li v-for="category in categories" class="list-group-item">
          <div class="row">
            <div class="col-7">
              <small class="text-muted">{{ category.created_at | moment("DD.MM.YYYY") }} | <router-link :to="{name: 'show-by-category', params: { tag: category.tag}}">{{ category.notes_count }} notes </router-link>
                  </small
                >
            </div>
            <div class="col-5 text-right">
              <!-- <a
                @click="deleteNote(aNote)"
                class="btn btn-link p-1 text-danger"
                ><i class="fa fa-times"></i>
              </a> -->
            </div>
            <div class="col-8"></div>

            <div class="col-4 text-right">
              <!--<a
                @click="commentNote(category)"
                class="btn btn-sm btn-link"
                ><i class="fa fa-comment"></i>
              </a>
              <router-link :to="{ name: 'editNote', params: { id: category.id } }">
                <i class="fa fa-edit"></i>
              </router-link>
              <a
                @click="deleteNote(category)"
                class="btn btn-sm btn-link text-danger"
                ><i class="fa fa-times"></i>
              </a>-->
            </div>
            <div class="col-12">
              <b-form @submit="save(category, $event)">
                <b-form-group>
                  <b-form-input
                    type="text"
                    class="form-control"
                    v-model="category.name"
                    required
                  ></b-form-input>
                </b-form-group>
                <!--<b-form-group id="input-group-4">
                  <b-form-checkbox v-model="category.props.todo">Todo</b-form-checkbox>
                </b-form-group>-->
                <div class="text-right">
                  <b-button type="submit" variant="primary">Save</b-button>
                </div>
              </b-form>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  components: {},

  mounted() {
    this.loadData();
  },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    loadData() {
      axios.get("categories").then((resp) => this.parseStuff(resp.data));
    },
    parseStuff(data) {
      this.categories = data;
    },
    save(category, event){
      event.preventDefault()
      axios.put('categories/' + category.id, category)
        .then(() => console.log(saved))
    }
  },
  computed: {},
};
</script>
