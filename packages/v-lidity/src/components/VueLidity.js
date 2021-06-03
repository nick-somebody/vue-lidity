import { h, reactive, computed, onMounted, getCurrentInstance } from "vue";
import { buildForm } from "../helpers";

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
