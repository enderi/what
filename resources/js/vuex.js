import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
    user: null,
    notes: null,
    categories: null,
    selectedCategory: null
};

const store = new Vuex.Store({
    state,
    getters: {
        user: (state) => {
            return state.user;
        },
        notes: (state) => {
            return state.notes
        },
        categories: (state) => {
            return state.categories
        },
        selectedCategory: (state) => {
            return state.selectedCategory
        }
    },
    actions: {
        user: (context, user) => {
            context.commit('user', user);
        },
        fetchInfo: (context) => {
            axios.get('info')
            .then(resp => {
                context.commit('notes', resp.data.notes)
                context.commit('categories', resp.data.categories)
            })
        },
        fetchCategories: (context) => {
            axios.get('api/categories')
            .then(resp => {
                //console.log('response', resp);
            })
        },
        selectCategory: (context, category) => {
            context.commit('selectCategory', category)
        }
    },
    mutations: {
        user: (state, user) => {
            state.user = user;
        },
        notes: (state, notes) => {
            state.categories = notes
        },
        categories: (state, categories) => {
            state.categories = categories
        },
        selectCategory: (state, category) => {
            state.selectedCategory = category
        }
    },
    plugins: [createPersistedState({
        paths: ['user']
    })]
});

export default store;
