
import { VueLidity } from "./components";
import { VLidity } from "./directives";

export { VueLidity, VLidity }

export default {
  install(VueApp, options={}) {
    if (options.component) {
      console.log(VueLidity.name, VueLidity)
      VueApp.component(VueLidity.name, VueLidity);
    }
    if (options.directive) {
      VueApp.directive("lidity", VLidity);
    }
  }
};
