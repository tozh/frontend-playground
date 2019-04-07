<template>
<ul id="project-list" class="projects">
  <li v-for="(item, index) in projects" :key="index">
    <router-link v-bind:to="item.url">
      <h2> {{ item.head }}</h2>
    </router-link>
    <div>{{ item.content }}</div>
    <router-link v-bind:to="item.url">
    <div><img :src="item.img"></div>
    </router-link>
  </li>
</ul>
</template>

<script>
export default {
  name: 'ProjectList',

  data () {
    return {
      projects: [
        {
          id: '1',
          name: 'Zhihu',
          head: 'Zhihu Spider',
          content: 'This is a Spider of Zhihu',
          url: '/projects/zhihu',
          img: '/src/assets/logo.png'
        },
        {
          id: '2',
          name: 'Stock',
          head: 'Stock Search',
          content: 'This is a Stock Search Website',
          url: '/projects/stock',
          img: './assets/logo.png'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>-->
  <!--h1, h2 {-->
    <!--font-weight: normal;-->
  <!--}-->
  <!--ul {-->
    <!--list-style-type: none;-->
    <!--padding: 0;-->
  <!--}-->
  <!--li {-->
    <!--display: inline-block;-->
    <!--margin: 0 10px;-->
  <!--}-->
  <!--a {-->
    <!--color: #42b983;-->
  <!--}-->
<!--</style>-->
