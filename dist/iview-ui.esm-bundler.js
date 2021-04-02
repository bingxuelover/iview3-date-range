import { DatePicker, Row, Col } from 'iview';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

//
var script$1 = {
  name: "date-range",
  components: { DatePicker, Row, Col },
  data() {
    return {
      startTimeData: "",
      endTimeData: "",
      startOptions: {
        disabledDate() {
          return false;
        },
      },
      endOptions: {
        disabledDate() {
          return false;
        },
      },
    };
  },
  computed: {
    startTime: function () {
      return formatTime(this.startTimeData);
    },
    endTime: function () {
      return formatTime(this.endTimeData);
    },
  },
  watch: {
    startTime(newTime, oldTime) {
      if (newTime !== oldTime) {
        this.endOptions = {
          disabledDate(date) {
            return newTime !== ""
              ? disabledDateFn("start", newTime, date, 1)
              : false;
          },
        };
      }
    },
    endTime(newTime, oldTime) {
      if (newTime !== oldTime) {
        this.startOptions = {
          disabledDate(date) {
            return newTime !== ""
              ? disabledDateFn("end", newTime, date, 1)
              : false;
          },
        };
      }
    },
  },
};
const formatTime = (time) => {
  if (time) return new Date(time + " " + "00:00:00");
  return "";
};

/**
 * @param {String} type start,end
 * @param {timeStamp} newTime 改变的日期
 * @param {timeStamp} date 遍历的日期
 * @param {number} month 可选的间隔月份
 * @description 返回不可点击的日期
 */

const disabledDateFn = (type, newTime, date, month) => {
  const day = 24 * 60 * 60 * 1000;
  if (month == undefined) {
    month = 3;
  }
  let months = month * 30.5 * day;

  if (type == "start") {
    return (
      date.valueOf() < newTime.valueOf() ||
      date.valueOf() > newTime.valueOf() + months
    );
  } else if (type == "end") {
    return (
      date.valueOf() > newTime.valueOf() ||
      date.valueOf() < newTime.valueOf() - months
    );
  }
  return false;
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "Row",
    { attrs: { type: "flex", align: "middle", justify: "start" } },
    [
      _c(
        "Col",
        { attrs: { span: "3" } },
        [
          _c("date-picker", {
            attrs: {
              type: "date",
              placeholder: "开始日期",
              options: _vm.startOptions
            },
            on: {
              "on-change": function($event) {
                _vm.startTimeData = $event;
              }
            },
            model: {
              value: _vm.startTimeData,
              callback: function($$v) {
                _vm.startTimeData = $$v;
              },
              expression: "startTimeData"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("Col", [_vm._v("~")]),
      _vm._v(" "),
      _c(
        "Col",
        { attrs: { span: "3" } },
        [
          _c("date-picker", {
            attrs: {
              type: "date",
              placeholder: "结束日期",
              options: _vm.endOptions
            },
            on: {
              "on-change": function($event) {
                _vm.endTimeData = $event;
              }
            },
            model: {
              value: _vm.endTimeData,
              callback: function($$v) {
                _vm.endTimeData = $$v;
              },
              expression: "endTimeData"
            }
          })
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

__vue_component__$1.install = function (app) {
  app.component(__vue_component__$1.name, __vue_component__$1);
};

//
//
//
//

var script = {
  name: "vue-test",
  data() {
    return {
      vueTest: "vue rollup",
    };
  },
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._v("This is a rollup vue and " + _vm._s(_vm.vueTest))])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1bd1d092_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"VueTest.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__.install = function (app) {
  app.component("VueTest", __vue_component__);
};

var version = "0.1.0";

var components = [__vue_component__$1, __vue_component__];

var install = function install(app) {
  if (install.installed) return;
  components.forEach(function (component) {
    app.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

var iviewUI = _objectSpread2({
  version: version,
  install: install
}, components);

var GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(iviewUI);
}

export default iviewUI;
export { __vue_component__$1 as DateRange, __vue_component__ as VueTest };
