<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <form ref="myform">
      <input required v-model="form.text" type="text" name="text" id="text">
      <input v-model="form.email" type="email" name="email" id="email">
      <input v-model="form.number" type="number" name="number" id="number">
      <textarea v-model="form.textarea" name="textarea" id="textarea" cols="30" rows="10"></textarea>
      <select v-model="form.select" name="select" id="select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <fieldset>
        <legend>
          Radio
        </legend>
        <label>aa<input required type="radio" name="radio" v-model="form.radio" :value="'aa'"></label>
        <label>cc<input required type="radio" name="radio" v-model="form.radio" :value="'cc'"></label>
        <label>ee<input required type="radio" name="radio" v-model="form.radio" :value="'ee'"></label>
      </fieldset>
    </form>
    {{validity}}
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import { makeFieldMap } from "v-lidity/src/helpers";

export default {
  name: 'HelloWorld',
  // components: { VueLidity },
  props: {
    msg: String
  },
  setup() {
    const myform = ref(null)
    const data = {
      form: reactive({
        text: "",
        number: 0,
        email: "",
        textarea: "",
        select: "",
        radio: "",
      }),
      validity: reactive({
        text: {},
        number: {},
        email: {},
        textarea: {},
        select: {},
        radio: {},
      }),
      myform
    }
    onMounted(() => {
      const fieldMap = makeFieldMap(myform.value, {...toRefs(data.form)}, computed)
      // console.log(v)
      data.validity = fieldMap
    })
    return data
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input, select, textarea {
  border: 1px solid #333;
}
</style>
