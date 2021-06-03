import { reactive, nextTick } from "vue";
import { computedValidity, isInput, modelValueMatch } from "../helpers";

// pass in the reactive form model
// create a computed form derived with validity state for each item
// now stuck on values being updated before validity state is re reported
export default {
  buildInput(inputElement, modelObj) {
    const input = {
      $el: inputElement,
      $validity: computedValidity(inputElement, modelObj)
    };
    return input;
  },
  setupForm(form, modelObj) {
    const inputObj = {};
    const inputs = [];
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];

      let reactiveInpt;
      if (isInput(element)) {
        const hasModelValue = modelValueMatch(modelObj, element);
        if (!hasModelValue) {
          console.warn(
            `[v-lidity]: Unable to match a model value for field ${element.name}`
          );
          continue;
        }
        reactiveInpt = this.buildInput(element, modelObj);
        inputs.push(reactiveInpt);
        inputObj[element.name] = reactiveInpt;
      }
    }
    const self = this;
    return reactive({
      form,
      inputs,
      inputObj,
      async update() {
        await nextTick();
        const { inputs, inputObj } = self.setupForm(form, modelObj);
        this.inputs = inputs;
        this.inputObj = inputObj;
      }
    });
  }
};
