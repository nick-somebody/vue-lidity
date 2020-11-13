import { reactive, computed, nextTick } from "vue";

const inputTag = "INPUT";
const inputTags = [inputTag, "SELECT", "TEXTAREA"];
const buttonTypes = ["button", "submit", "reset"];

// pass in the reactive form model
// create a computed form derived with validity state for each item
// now stuck on values being updated before validity state is re reported
export default {
  copyValidity(validity) {
    const obj = {};
    for (const key in validity) {
      const element = validity[key];
      obj[key] = element;
    }
    return obj;
  },
  computedValidity(inputElement, modelObj) {
    return computed(() => {
      return {
        ...this.copyValidity(inputElement.validity),
        modelValue: modelObj[inputElement.name]
      };
    });
  },
  buildInput(inputElement, modelObj) {
    const input = {
      $el: inputElement,
      $validity: this.computedValidity(inputElement, modelObj)
    };
    return input;
  },
  isInput({ tagName, type }) {
    if (inputTags.includes(tagName)) {
      return !buttonTypes.includes(type);
    }
    return false;
  },
  modelValueMatch(modelObj, element) {
    return Object.prototype.hasOwnProperty.call(modelObj, element.name);
  },
  setupForm(form, modelObj) {
    const inputObj = {};
    const inputs = [];
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];

      let reactiveInpt;
      if (this.isInput(element)) {
        const hasModelValue = this.modelValueMatch(modelObj, element);
        if (!hasModelValue) {
          console.warn(
            `[v-constrain]: Unable to match a model value for field ${element.name}`
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
