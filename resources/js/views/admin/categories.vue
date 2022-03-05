<template>
  <div>
    <div class="card mt-1">
      <div class="card-header">Categories</div>
      <ul
        class="list-group list-group-flush"
        style="max-height: 65vh; overflow-y: auto"
      >
        <li v-for="(category, $index) in categoryList" v-bind:key="$index" class="list-group-item">
          <div class="row">
            <div class="col-7">
              <small class="text-muted">{{ category.item.created_at | moment("DD.MM.YYYY") }} | <router-link :to="{name: 'show-by-category', params: { tag: category.item.tag}}">{{ category.item.notes_count }} notes </router-link>
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
              <b-form @submit="save(category.item, $event)">
                <b-form-group>
                  <b-form-input
                    type="text"
                    class="form-control"
                    v-model="category.item.name"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-4">
                  <b-form-checkbox v-model="category.item.props.addToLatest">Add new items as comments under latest note</b-form-checkbox>
                </b-form-group>
                <b-form-group id="input-group-4">
                  <b-form-checkbox v-model="category.item.props.hideFromSelect">Hide from select list</b-form-checkbox>
                </b-form-group>
                <div class="text-right">
                  <b-button type="submit" :class="{'disabled': !changed(category)}" variant="primary">Save</b-button>
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
      categoryList: []
    };
  },
  methods: {
    changed(category) {
      console.log(category, JSON.stringify(category.item), category.orig)
      return JSON.stringify(category.item) !== category.orig
    },
    loadData() {
      axios.get("categories").then((resp) => this.parseStuff(resp.data));
    },
    parseStuff(data) {
      this.categoryList = _.map(data, cat => {
        return {
          orig: JSON.stringify(cat),
          item: cat
        }
      });
      this.categories = data;
    },
    save(category, event){
      console.log(category)
      event.preventDefault()
      axios.put('categories/' + category.id, category)
        .then((saved) => {
          category.item = saved
          category.orig = JSON.stringify(saved)
          })
    }
  },
  computed: {},
};
</script>
