import Vue from "vue";

import Router from "vue-router";
import store from "./vuex";
import AdminLayout from "./views/admin/layout/index";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/admin/manage.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/login/:user_id?",
            name: "login",
            component: () => import("./views/login/index.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/register/index.vue")
        },
        {
            path: "/verify/user/:id",
            name: "verify",
            props: true,
            component: () => import("./views/verify/index.vue")
        },
        {
            path: "/forgot-password",
            name: "forgot",
            component: () => import("./views/forgot/index.vue")
        },
        {
            path: "/reset/:token",
            name: "reset",
            component: () => import("./views/reset/index.vue")
        },
        /**
         * Admin routes
         */
        {
            path: "/notes",
            name: "notes",
            component: () => import("./views/admin/manage.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/notes/by-category/:tag",
            name: "show-by-category",
            component: () => import("./views/admin/manage.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/categories",
            name: "categories",
            component: () => import("./views/admin/categories.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/notes/:id",
            name: "editNote",
            component: () => import("./views/admin/editNote.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
    ]
});


router.beforeEach((to, from, next) => {
    var authenticated = store.getters.user
    if(!to.matched || to.matched.length === 0) {
        next('/')
        return;
    }
    if (!authenticated) {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            next("/login");
        } else {
            next();
        }
    } else {
        if (to.matched.some(record => !record.meta.requiresAuth)) {
            next("/notes/log");
        } else {
            next();
        }
    }
});

export default router;
