<template>
  <div v-bind:id="id" class="zhihu">
    <h2> {{ headline }}</h2>
    <div>{{ content }}</div>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'Zhihu',
  data () {
    return {
      id: 'zhihu',
      headline: 'Zhihu Spider',
      content: 'This is a Spider of Zhihu'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
