import DateRange from "./date/index";
import VueTest from "./test";
import { version } from "../package.json";

const components = [DateRange, VueTest];

const install = app => {
  if (install.installed) return;
  components.forEach(component => {
    app.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const iviewUI = {
  version,
  install,
  ...components,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(iviewUI);
}
export { DateRange, VueTest };

export default iviewUI;
