<template>
  <div id="app">
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/component/footer'
export default {
  name: 'App',
  components: {Footer}
}
</script>

<style>

</style>
