<template>
  <div class="zhihu">
    <el-form :label-position="labelPosition" size="small">
      <el-form-item label="种类">
        <el-select v-model="entityClassification" placeholder="请选择查询类型">
          <el-option v-for="(value, key, index) in entityClassificationList" :key="index" :label="value.cn" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Top数量">
        <el-select v-model="limit" placeholder="请选择Top数量">
          <el-option v-for="(value, key, index) in limitList" :key="index" :label="value" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="ajaxGet(api, header, params(), parseResponse)" type="primary" >查询</el-button>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="topEntity"
      height="500"
      border>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="entityClassificationList[entityClassification].cn"
        width="180">
        <template slot-scope="scope">
          <router-link :to="{name: 'Zhihu Top Person Of Entity', params: {id: scope.row.id , name: scope.row.name, classification: entityClassification}}">{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        label="人数"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
let Data = {
  labelPosition: 'left',
  limit: 10,
  limitList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  entityClassification: 'educations',
  entityClassificationList: {
    educations: {cn: '教育机构', en: 'Education Institute'},
    locations: {cn: '地理位置', en: 'Location'},
    employments: {cn: '工作单位', en: 'Employment'},
    business: {cn: '工作行业', en: 'Business'}
  },
  api: 'http://127.0.0.1:8000/zhihu/top_entity_by_person_number',
  header: new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }),
  topEntity: []
}
export default {
  name: 'ZhihuTopEntity',
  mounted: function () {
    if (this.$route.params.limit) {
      this.limit = this.$route.params.limit
    } else {
      this.limit = 10
    }
    if (this.$route.params.classification) {
      this.entityClassification = this.$route.params.classification
    } else {
      this.entityClassification = 'educations'
    }
    if (this.$route.params.classification && this.$route.params.limit) {
      this.ajaxGet(this.api, this.header, this.params(), this.parseResponse)
    }
  },
  methods: {
    parseResponse (res) {
      for (let key in res.data.data) {
        let val = {
          id: res.data.data[key]._id,
          name: res.data.data[key].name,
          num: res.data.data[key].num
        }
        Vue.set(this.topEntity, key, val)
      }
    },
    params () {
      return {limit: this.limit, classification: this.entityClassification}
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
      Data.entityClassification = 'educations'
      Data.topEntity = []
      Data.limit = 10
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
