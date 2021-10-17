<template>
  <div id="app">
      <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // headerNavebar: 'div'
    }
  },
  watch: {
    $route (to, from) {
      document.title = to.meta.title || 'PWA'
    },
    immediate: true
  }
  // mounted () {
  //   window.onpopstate = event => {
  //     if (window.localStorage.getItem('kajoroAdmin') !== null && this.$route.path === '/login') {
  //       this.$router.push('/dashboard')
  //     }
  //   }
  // }
}
</script>
