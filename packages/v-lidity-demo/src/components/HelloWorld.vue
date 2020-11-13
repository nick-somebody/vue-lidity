<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <vue-lidity :model-value="form">
      <template v-slot="{ fieldMap }">
        <form>
          <label :class="{'invalid': !fieldMap?.text.valid }">
            text
            <input v-model="form.text" type="text" name="text" id="text">
          </label>
          <label>
            email
            <input v-model="form.email" type="email" name="email" id="email">
          </label>
          <label>
            number
            <input v-model="form.number" type="number" name="number" id="number">
          </label>
        </form>
      </template>
    </vue-lidity>
    <!-- <form v-validity ref="form" tabindex="0">
      <input v-model="form.text" type="text" name="text" id="text">
      <input v-model="form.email" type="email" name="email" id="email">
      <input v-model="form.number" type="number" name="number" id="number">
    </form> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // components: { VueLidity },
  props: {
    msg: String
  },
  data() {
    return {
      form: {
        text: "",
        number: 0,
        email: "",
        textarea: "",
        select: "",
        radio: "",
      }
    }
  },
  computed: {
    dude() {
      console.log(this.form.email)
      return {
        email: this.form.email || "asdasdsadsad"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input, select, textarea {
  border: 1px solid #333;
}
</style>
