<template>
  <div class="zhihu">
    <el-form :label-position="labelPosition" size="small">
      <el-form-item label="种类">
        <el-select v-model="entityClassification" placeholder="请选择查询类型">
          <el-option v-for="(value, key, index) in entityClassificationList" :key="index" :label="value.cn" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="entityName" placeholder="Input the Name" clearable></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="entityID" placeholder="Input the ID, If You Don't Know, Keep Null" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="ajaxGet(api, header, params(), parseResponse)" type="primary" >查询</el-button>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>
    <ul>
      <li v-for="(value, key, index) in entity" :key="index" v-if="value.data && JSON.stringify(value.data)!='{}'">
        <div> {{ value.cn }}: {{ value.data}} </div>
      </li>
    </ul>
  </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
let Data = {
  labelPosition: 'left',
  entityID: '',
  entityName: '',
  entityClassification: '',
  entityClassificationList: {
    educations: {cn: '教育机构', en: 'Education Institute'},
    locations: {cn: '地理位置', en: 'Location'},
    employments: {cn: '工作单位', en: 'Employment'},
    business: {cn: '工作行业', en: 'Business'}
  },
  api: 'http://127.0.0.1:8000/zhihu/entity',
  header: new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }),
  entity: {
    _id: {cn: 'ID', en: 'ID', data: ''},
    num: {cn: '人数', en: 'Number of Person', data: ''},
    name: {cn: '名称', en: 'Name', data: ''}
  }
}
export default {
  name: 'ZhihuEntity',
  mounted: function () {
    this.entityID = this.$route.params.id
    this.entityName = this.$route.params.name
    this.entityClassification = this.$route.params.classification
    this.ajaxGet(this.api, this.header, this.params(), this.parseResponse)
  },
  methods: {
    parseResponse (res) {
      for (let key in res.data.data) {
        if (Data.entity.hasOwnProperty(key)) {
          Vue.set(Data.entity[key], 'data', res.data.data[key])
        }
      }
    },
    params () {
      return {id: this.entityID, name: this.entityName, classification: this.entityClassification}
    },
    ajaxGet (api, header, params, func) {
      axios.get(api, {
        params: params,
        headers: header
      }).then(function (res) {
        func(res)
      }
      )
    },
    clear () {
      this.entityID = ''
      this.entityName = ''
      for (let key in Data.entity) {
        if (Data.entity.hasOwnProperty(key)) {
          Vue.set(Data.entity[key], 'data', '')
        }
      }
    }
  },
  data () {
    return Data
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
