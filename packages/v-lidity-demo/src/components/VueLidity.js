import { h, reactive, computed, onMounted, getCurrentInstance } from "vue";

const inputTag = "INPUT";
const inputTags = [inputTag, "SELECT", "TEXTAREA"];
const buttonTypes = ["button", "submit", "reset"];

const isInput = ({ tagName, type }) => {
  if (inputTags.includes(tagName)) {
    return !buttonTypes.includes(type);
  }
  return false;
};

const modelValueMatch = (modelObj, element) => {
  return Object.prototype.hasOwnProperty.call(modelObj, element.name);
};

const buildInput = (inputElement, modelObj) => {
  return computed(() => {
    const input = {
      $el: inputElement,
      $validity: {
        ...copyValidity(inputElement.validity)
      },
      $modelValue: modelObj[inputElement.name]
    };
    return input;
  });
};
const copyValidity = validity => {
  const obj = {};
  for (const key in validity) {
    const element = validity[key];
    obj[key] = element;
  }
  return obj;
};

const buildForm = (form, modelValue) => {
  const fields = [];
  const fieldMap = {};
  const modelObj = modelValue;
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];

    if (isInput(element)) {
      const hasModelValue = modelValueMatch(modelObj, element);
      if (!hasModelValue) {
        console.warn(
          `[vue-lidity]: Unable to match a model value for field ${element.name}`
        );
        continue;
      }
      const input = buildInput(element, modelValue);
      fields.push(element);
      fieldMap[element.name] = input;
    }
  }
  return { fieldMap, fields };
};

export default {
  name: "vue-lidity",
  props: ["modelValue"],
  setup(props, { slots }) {
    const validity = reactive({
      form: {},
      fields: [],
      fieldMap: {}
    });
    onMounted(() => {
      console.log("mounted")
      const self = getCurrentInstance();
      const form = self.subTree.el.firstChild;
      const { fields, fieldMap } = buildForm(form, props.modelValue);
      validity.form = form;
      validity.fields = fields;
      validity.fieldMap = fieldMap;
    });

    return () => h("div", { class: "" }, slots.default(validity));
  }
};
