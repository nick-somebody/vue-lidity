const inputTag = "INPUT";
const inputTags = [inputTag, "SELECT", "TEXTAREA"];
const buttonTypes = ["button", "submit", "reset"];

export const isInput = ({ tagName, type }) => {
  if (inputTags.includes(tagName)) {
    return !buttonTypes.includes(type);
  }
  return false;
}

export const modelValueMatch = (modelObj, element) => {
  return Object.prototype.hasOwnProperty.call(modelObj, element.name);
}

export const copyValidity = (validity) => {
  const obj = {};
  for (const key in validity) {
    const element = validity[key];
    obj[key] = element;
  }
  return obj;
}
export const computedValidity = (inputElement, modelObj) => {
  return computed(() => {
    return {
      ...copyValidity(inputElement.validity),
      modelValue: modelObj[inputElement.name]
    };
  });
}
const buildInput = (inputElement, modelObj, computed) => {
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

export const makeFieldMap = (form, modelObj, computed) => {
  return computed(() => {
    const fieldMap = {};
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
        console.log(modelObj[element.name])
        const input = {
          $el: element,
          $validity: {
            ...copyValidity(element.validity)
          },
          $modelValue: modelObj[element.name]
        }
        fieldMap[element.name] = input;
      }
    }
    return fieldMap
  })
}

export const buildForm = (form, modelObj, computed) => {
  const fields = [];
  const fieldMap = {};
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
      const input = buildInput(element, modelObj, computed);
      fields.push(element);
      console.log(input)
      fieldMap[element.name] = input;
    }
  }
  return { fieldMap, fields };
};