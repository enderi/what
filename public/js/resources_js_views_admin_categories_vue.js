(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_categories_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/categories.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/categories.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Categories",
  components: {},
  mounted: function mounted() {
    this.loadData();
  },
  data: function data() {
    return {
      categories: [],
      categoryList: []
    };
  },
  methods: {
    changed: function changed(category) {
      console.log(category, JSON.stringify(category.item), category.orig);
      return JSON.stringify(category.item) !== category.orig;
    },
    loadData: function loadData() {
      var _this = this;

      axios.get("categories").then(function (resp) {
        return _this.parseStuff(resp.data);
      });
    },
    parseStuff: function parseStuff(data) {
      this.categoryList = _.map(data, function (cat) {
        return {
          orig: JSON.stringify(cat),
          item: cat
        };
      });
      this.categories = data;
    },
    save: function save(category, event) {
      console.log(category);
      event.preventDefault();
      axios.put('categories/' + category.id, category).then(function (saved) {
        category.item = saved;
        category.orig = JSON.stringify(saved);
      });
    }
  },
  computed: {}
});

/***/ }),

/***/ "./resources/js/views/admin/categories.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/admin/categories.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _categories_vue_vue_type_template_id_5a0ec7db___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categories.vue?vue&type=template&id=5a0ec7db& */ "./resources/js/views/admin/categories.vue?vue&type=template&id=5a0ec7db&");
/* harmony import */ var _categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categories.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/categories.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _categories_vue_vue_type_template_id_5a0ec7db___WEBPACK_IMPORTED_MODULE_0__.render,
  _categories_vue_vue_type_template_id_5a0ec7db___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/categories.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/categories.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/admin/categories.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./categories.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/categories.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/views/admin/categories.vue?vue&type=template&id=5a0ec7db&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/admin/categories.vue?vue&type=template&id=5a0ec7db& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_categories_vue_vue_type_template_id_5a0ec7db___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_categories_vue_vue_type_template_id_5a0ec7db___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_categories_vue_vue_type_template_id_5a0ec7db___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./categories.vue?vue&type=template&id=5a0ec7db& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/categories.vue?vue&type=template&id=5a0ec7db&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/categories.vue?vue&type=template&id=5a0ec7db&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/categories.vue?vue&type=template&id=5a0ec7db& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "card mt-1" }, [
      _c("div", { staticClass: "card-header" }, [_vm._v("Categories")]),
      _vm._v(" "),
      _c(
        "ul",
        {
          staticClass: "list-group list-group-flush",
          staticStyle: { "max-height": "65vh", "overflow-y": "auto" }
        },
        _vm._l(_vm.categoryList, function(category, $index) {
          return _c("li", { key: $index, staticClass: "list-group-item" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-7" }, [
                _c(
                  "small",
                  { staticClass: "text-muted" },
                  [
                    _vm._v(
                      _vm._s(
                        _vm._f("moment")(category.item.created_at, "DD.MM.YYYY")
                      ) + " | "
                    ),
                    _c(
                      "router-link",
                      {
                        attrs: {
                          to: {
                            name: "show-by-category",
                            params: { tag: category.item.tag }
                          }
                        }
                      },
                      [_vm._v(_vm._s(category.item.notes_count) + " notes ")]
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-5 text-right" }),
              _vm._v(" "),
              _c("div", { staticClass: "col-8" }),
              _vm._v(" "),
              _c("div", { staticClass: "col-4 text-right" }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-12" },
                [
                  _c(
                    "b-form",
                    {
                      on: {
                        submit: function($event) {
                          return _vm.save(category.item, $event)
                        }
                      }
                    },
                    [
                      _c(
                        "b-form-group",
                        [
                          _c("b-form-input", {
                            staticClass: "form-control",
                            attrs: { type: "text", required: "" },
                            model: {
                              value: category.item.name,
                              callback: function($$v) {
                                _vm.$set(category.item, "name", $$v)
                              },
                              expression: "category.item.name"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-form-group",
                        { attrs: { id: "input-group-4" } },
                        [
                          _c(
                            "b-form-checkbox",
                            {
                              model: {
                                value: category.item.props.addToLatest,
                                callback: function($$v) {
                                  _vm.$set(
                                    category.item.props,
                                    "addToLatest",
                                    $$v
                                  )
                                },
                                expression: "category.item.props.addToLatest"
                              }
                            },
                            [
                              _vm._v(
                                "Add new items as comments under latest note"
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-form-group",
                        { attrs: { id: "input-group-4" } },
                        [
                          _c(
                            "b-form-checkbox",
                            {
                              model: {
                                value: category.item.props.hideFromSelect,
                                callback: function($$v) {
                                  _vm.$set(
                                    category.item.props,
                                    "hideFromSelect",
                                    $$v
                                  )
                                },
                                expression: "category.item.props.hideFromSelect"
                              }
                            },
                            [_vm._v("Hide from select list")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "text-right" },
                        [
                          _c(
                            "b-button",
                            {
                              class: { disabled: !_vm.changed(category) },
                              attrs: { type: "submit", variant: "primary" }
                            },
                            [_vm._v("Save")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ])
          ])
        }),
        0
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);