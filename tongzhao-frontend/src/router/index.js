import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Projects from '@/components/Projects'
import ProjectList from '@/components/ProjectList'
import Zhihu from '@/components/Zhihu'
import ZhihuHomePage from '@/components/ZhihuHomePage'
import ZhihuPerson from '@/components/ZhihuPerson'
import ZhihuEntity from '@/components/ZhihuEntity'
import ZhihuStatistic from '@/components/ZhihuStatistic'
import ZhihuTopEntity from '@/components/ZhihuTopEntity'
import ZhihuTopPersonByValue from '@/components/ZhihuTopPersonByValue'
import ZhihuTopPersonOfEntity from '@/components/ZhihuTopPersonOfEntity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      children: [
        {
          path: '',
          name: 'Project List',
          component: ProjectList
        },
        {
          path: 'zhihu',
          name: 'Zhihu Spider',
          component: Zhihu,
          children: [
            {
              path: '',
              name: 'Zhihu HomePage',
              component: ZhihuHomePage
            },
            {
              path: 'person',
              name: 'Zhihu Person',
              component: ZhihuPerson
            },
            {
              path: 'statistic',
              name: 'Zhihu Statistic',
              component: ZhihuStatistic
            },
            {
              path: 'entity',
              name: 'Zhihu Entity',
              component: ZhihuEntity
            },
            {
              path: 'top-person-by-value',
              name: 'Zhihu Top Person By Value',
              component: ZhihuTopPersonByValue
            },
            {
              path: 'top-entity',
              name: 'Zhihu Top Entity',
              component: ZhihuTopEntity
            },
            {
              path: 'top-person-of-entity',
              name: 'Zhihu Top Person Of Entity',
              component: ZhihuTopPersonOfEntity
            }
          ]
        }
      ]
    }
  ]
})
