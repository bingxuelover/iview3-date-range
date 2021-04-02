import VueTest from "./VueTest.vue";

VueTest.install = function(app) {
  app.component("VueTest", VueTest);
};

export default VueTest;
