<template>
  <div class="zhihu">
    <el-form>
      <el-form-item label="用户 Token ID：">
        <el-input v-model="personID" placeholder="Input the ID of person" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="ajaxGet(api, header, params(), parseResponse)" type="primary" >查询</el-button>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>
    <p>{{ person._id.data }}</p>
    <ul>
      <li v-for="(value, key, index) in person" :key="index" v-if="value.data && JSON.stringify(value.data)!='{}' && value.data.length!=0">
        <!--<p v-if="key=='educations' && value.data != []"> {{ value.cn }}: {{ value.data}} </p>-->
        <div v-if="key=='educations'">
          {{ value.cn }}:
          <ul>
            <li v-for="(eduVal, eduKey, eduIdx) in value.data" :key="eduIdx">
              <router-link :to="{name: 'Zhihu Top Person Of Entity', params: { id: eduVal.id , name: eduVal.name, classification: 'educations'}}">{{ eduVal.name }}</router-link>
            </li>
          </ul>
        </div>
        <div v-else-if="key=='locations'">
          {{ value.cn }}:
          <ul>
            <li v-for="(locVal, locKey, locIdx) in value.data" :key="locIdx">
              <router-link :to="{name: 'Zhihu Top Person Of Entity', params: { id: locVal.id , name: locVal.name, classification: 'locations'}}">{{ locVal.name }}</router-link>
            </li>
          </ul>
        </div>
        <div v-else-if="key=='employments'">
          {{ value.cn }}:
          <ul>
            <li v-for="(employVal, employKey, employIdx) in value.data" :key="employIdx">
              <router-link :to="{name: 'Zhihu Top Person Of Entity', params: { id: employVal.company.id , name: employVal.company.name, classification: 'employments'}}">{{ employVal.company.name }}</router-link>
            </li>
          </ul>
        </div>
        <div v-else-if="key=='business'">
          <p>
            {{ value.cn }}: <router-link :to="{name: 'Zhihu Top Person Of Entity', params: {id: value.data.id , name: value.data.name, classification: 'business'}}">{{ value.data.name }}</router-link>
          </p>
        </div>
        <div v-else> {{ value.cn }}: {{ value.data}} </div>
      </li>
    </ul>
  </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
let Data = {
  personID: '',
  api: 'http://127.0.0.1:8000/zhihu/person',
  header: new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }),
  person: {
    _id: {cn: 'ID', en: 'ID', data: ''},
    response: {cn: 'ID', en: '', data: ''},
    name: {cn: '用户名', en: 'Name', data: ''},
    gender: {cn: '性别', en: 'Gender', data: ''},
    answer_count: {cn: '回答数', en: 'Answer Count', data: ''},
    articles_count: {cn: '文章数', en: 'Article Count', data: ''},
    columns_count: {cn: '专栏数', en: 'Column Count', data: ''},
    question_count: {cn: '问题数', en: 'Question Count', data: ''},
    following_count: {cn: '关注数', en: 'Followee Count', data: ''},
    follower_count: {cn: '粉丝数', en: 'Follower Count', data: ''},
    logs_count: {cn: '公共编辑数', en: 'Public Editing Count', data: ''},
    favorite_count: {cn: '收藏数', en: 'Favorite Count', data: ''},
    participated_live_count: {cn: '参加的Live', en: 'Paticipated Live Count', data: ''},
    hosted_live_count: {cn: '举办的Live', en: 'Hosted Live Count', data: ''},
    following_question_count: {cn: '关注的问题', en: 'Following Question Count', data: ''},
    following_topic_count: {cn: '关注的话题', en: 'Following Topic Count', data: ''},
    voteup_count: {cn: '被赞', en: 'VoteUp Answer Count', data: ''},
    favorited_count: {cn: '被收藏', en: 'Favorited Answer Count', data: ''},
    thanked_count: {cn: '被感谢', en: 'Thanked Answer Count', data: ''},
    following_favlists_count: {cn: '关注的收藏夹', en: 'Favlist count', data: ''},
    is_advertiser: {cn: '是否为广告主', en: 'Is Advertiser', data: ''},
    is_org: {cn: '是否为组织账号', en: 'Is Org', data: ''},
    is_bind_sina: {cn: '是否绑定新浪微博', en: 'Is Bind Sina Weibo', data: ''},
    educations: {cn: '教育', en: 'Educations', data: ''},
    locations: {cn: '地点', en: 'Locations', data: ''},
    employments: {cn: '工作单位', en: 'Employments', data: ''},
    business: {cn: '行业', en: 'Business', data: ''}
  }
}
export default {
  name: 'ZhihuPerson',
  mounted: function () {
    if (this.$route.params.id) {
      this.personID = this.$route.params.id
      this.ajaxGet(this.api, this.header, this.params(), this.parseResponse)
    } else {
      this.personID = ''
    }
  },
  methods: {
    parseResponse (res) {
      this.personID = res.data.data['_id']
      for (let key in res.data.data) {
        if (Data.person.hasOwnProperty(key)) {
          Vue.set(Data.person[key], 'data', res.data.data[key])
        } else {
        }
      }
    },
    params () {
      return {id: this.personID}
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
      this.personID = ''
      for (let key in Data.person) {
        if (Data.person.hasOwnProperty(key)) {
          Vue.set(Data.person[key], 'data', '')
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
