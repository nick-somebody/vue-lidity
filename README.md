# Vue-Lidity

*WORK IN PROGRESS*

A prototype of my attempt to bring the built in [constraint API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) into the Vue lifecycle as both a directive and a component.

Intended use as below.
## Examples

### As a component

```html
<!-- A modelValue representing the data bound to your form -->
<vue-lidity :model-value="form">
  <!--
    component will mount and build fieldMap
    matching element name to modelValue field
  -->
  <template v-slot="{ fieldMap }">
    <form>
      <!-- each field will have $validity and $el -->
      <label :class="{'invalid': !fieldMap.text?.$validity.valid }">
        text
        <input v-model="form.text" type="text" name="text" id="text">
      </label>
    </form>
  </template>
</vue-lidity>
```

### As a directive

For when you want the values in the internals of a component


```html
<!-- on your component, define a reactive object for the values to land in -->
<!-- pass the name of the object as a modifier -->
<!-- eg "validityForm" and the value "person" -->
<!-- being the data bound to your form -->
<form @reset.prevent="resetForm" v-lidity.validityForm="person">
  <label>
    Name
    <input name="name" v-model="person.name" :required="true" minlength="4" type="text">
  </label>
</form>
```
Doing this, the reactive object defined in your component `validityForm` should be accessbile and have all the `validity` properties updated for your inputs.