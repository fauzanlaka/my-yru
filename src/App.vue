<template>
  <router-view/>
  <vue-progress-bar></vue-progress-bar>
</template>

<script>
  // let brand = " | Inventory VUE SPA"

  let brand = " | " + process.env.VUE_APP_TITLE


  export default {
    name: 'App',
    // computed: {
    //     logedIn(){
    //       return this.$store.getters['authMember/logedIn']
    //     }
    // },
    watch: {
      $route(to){
        document.title = to.meta.title + brand,
        document.description = to.meta.description
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>