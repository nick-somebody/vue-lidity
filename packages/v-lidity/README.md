# v-lidity

A project about form validation.

Setup a directive on your form, pass it a model object and away you go.

eg.
```html
<form v-lidity="{ model:person }">
    <label>
        Name
        <input name="name" type="text" v-model="person.name">
    </label>
</form>
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
