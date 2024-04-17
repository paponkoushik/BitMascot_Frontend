# BitMascot Frontend
## Use Node Version
```
12.14.1 or any 12
```

### In main js file add you backend api base url and appUrl
```
axios.defaults.baseURL = "http://localhost:8000/api";
Vue.prototype.$appURL = "http://127.0.0.1:8000"
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
