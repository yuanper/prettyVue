<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/component/footer'
import Header from './components/component/header'
export default {
  name: 'App',
  components: {Footer,Header}
}
</script>

<style>
  #app{
    margin-bottom: 50px;
  }
</style>
