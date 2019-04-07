<template>
  <div class="zhihu">
    <el-form :label-position="labelPosition" size="small">
      <el-form-item label="名称">
        <el-input v-model="entityName" placeholder="Input the Name" clearable></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="entityID" placeholder="Input the ID, If You Don't Know, Keep Null" clearable></el-input>
      </el-form-item>
      <el-form-item label="种类">
        <el-select v-model="entityClassification" placeholder="请选择查询类型">
          <el-option v-for="(value, key, index) in entityClassificationList" :key="index" :label="value.cn" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Top数据类型">
        <el-select v-model="valueType" placeholder="请选择Top数据类型">
          <el-option v-for="(value, key, index) in valueList" :key="index" :label="value.cn" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Top数量">
        <el-select v-model="limit" placeholder="请选择Top数量">
          <el-option v-for="(value, key, index) in limitList" :key="index" :label="value" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别限制">
        <el-select v-model="gender" placeholder="请选择性别">
          <el-option v-for="(value, key, index) in genderList" :key="index" :label="value.cn" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="ajaxGetTogether()" type="primary" >查询</el-button>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>
    <div>
      <p v-for="(value, key, index) in entity" :key="index" v-if="value.data">
        {{ value.cn }}: {{ value.data}}
      </p>
    </div>
    <el-table
      :data="top"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="160">
        <template slot-scope="scope">
          <router-link :to="{name: 'Zhihu Person', params: {id: scope.row.id}}">{{ scope.row.id }}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="160">
        <template slot-scope="scope">
          <router-link :to="{name: 'Zhihu Person', params: {id: scope.row.id}}">{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="80">
      </el-table-column>
      <el-table-column
        prop="value"
        :label="valueList[valueType].cn"
        width="120">
      </el-table-column>
      <el-table-column
        prop="entityName"
        :label="entityClassificationList[entityClassification].cn">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

let Data = {
  labelPosition: 'left',
  apiEntity: 'http://127.0.0.1:8000/zhihu/entity',
  apiTop: 'http://127.0.0.1:8000/zhihu/top_person_of_entity',
  header: new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }),
  entity: {
    _id: {cn: 'ID', en: 'ID', data: ''},
    num: {cn: '人数', en: 'Number of Person', data: ''},
    name: {cn: '名称', en: 'Name', data: ''}
  },
  entityID: '',
  entityName: '',
  entityClassification: 'educations',
  entityClassificationList: {
    educations: {cn: '教育机构', en: 'Education Institute'},
    locations: {cn: '地理位置', en: 'Location'},
    employments: {cn: '工作单位', en: 'Employment'},
    business: {cn: '工作行业', en: 'Business'}
  },
  limit: 10,
  limitList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  gender: '2',
  genderList: {
    '0': {cn: '女', en: 'Female'},
    '1': {cn: '男', en: 'Male'},
    '2': {cn: '不限', en: 'Any'}
  },
  top: [],
  valueType: 'follower_count',
  valueList: {
    answer_count: {cn: '回答数', en: 'Answer Count'},
    articles_count: {cn: '文章数', en: 'Article Count'},
    columns_count: {cn: '专栏数', en: 'Column Count'},
    question_count: {cn: '问题数', en: 'Question Count'},
    following_count: {cn: '关注数', en: 'Followee Count'},
    follower_count: {cn: '粉丝数', en: 'Follower Count'},
    logs_count: {cn: '公共编辑数', en: 'Public Editing Count'},
    favorite_count: {cn: '收藏数', en: 'Favorite Count'},
    participated_live_count: {cn: '参加的Live数', en: 'Paticipated Live Count'},
    hosted_live_count: {cn: '举办的Live数', en: 'Hosted Live Count'},
    following_question_count: {cn: '关注的问题数', en: 'Following Question Count'},
    following_topic_count: {cn: '关注的话题数', en: 'Following Topic Count'},
    voteup_count: {cn: '被赞数', en: 'VoteUp Answer Count'},
    favorited_count: {cn: '被收藏数', en: 'Favorited Answer Count'},
    thanked_count: {cn: '被感谢数', en: 'Thanked Answer Count'},
    following_favlists_count: {cn: '关注的收藏夹数', en: 'Favlist count'}
  }
}

export default {
  name: 'ZhihuTopPersonOfEntity',
  mounted: function () {
    this.entityID = this.$route.params.id
    this.entityName = this.$route.params.name
    if (this.$route.params.classification) {
      this.entityClassification = this.$route.params.classification
    } else {
      this.entityClassification = 'educations'
    }
    if (this.$route.params.valueType) {
      this.valueType = this.$route.params.valueType
    } else {
      this.valueType = 'follower_count'
    }
    if (this.entityName || this.entityID) {
      this.ajaxGet(this.apiEntity, this.header, this.paramsEntity(), this.parseResponseEntity)
      this.ajaxGet(this.apiTop, this.header, this.paramsTop(), this.parseResponseTop)
    }
  },
  methods: {
    parseResponseTop (res) {
      for (let key in res.data.data) {
        let val = res.data.data[key]
        let value = {
          id: val._id,
          name: val.name
        }
        if (val.gender === 1) {
          value['gender'] = '男'
        } else if (val.gender === 0) {
          value['gender'] = '女'
        } else {
          value['gender'] = '未知'
        }
        value['value'] = val[Data.valueType]
        value['entityName'] = Data.entityName
        Vue.set(Data.top, key, value)
      }
    },
    parseResponseEntity (res) {
      this.entityID = res.data.data['_id']
      this.entityName = res.data.data['name']
      for (let key in res.data.data) {
        if (Data.entity.hasOwnProperty(key)) {
          Vue.set(Data.entity[key], 'data', res.data.data[key])
        }
      }
    },
    paramsEntity () {
      return {id: this.entityID, name: this.entityName, classification: this.entityClassification}
    },
    paramsTop () {
      return {
        id: Data.entityID,
        name: Data.entityName,
        classification: Data.entityClassification,
        value: Data.valueType,
        gender: Data.gender,
        limit: Data.limit
      }
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
      Data.entityID = ''
      Data.entityName = ''
      Data.entityClassification = 'educations'
      Data.top = []
      Data.limit = 10
      Data.valueType = 'follower_count'
      Data.gender = '2'
      for (let key in Data.entity) {
        if (Data.entity.hasOwnProperty(key)) {
          Vue.set(Data.entity[key], 'data', '')
        }
      }
    },
    ajaxGetTogether () {
      this.ajaxGet(this.apiEntity, this.header, this.paramsEntity(), this.parseResponseEntity)
      this.ajaxGet(this.apiTop, this.header, this.paramsTop(), this.parseResponseTop)
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
