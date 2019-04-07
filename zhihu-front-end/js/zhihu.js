// const Zhihu = {
//     template: '<div id="zhihu" class="zhihu"><p>This is the project Zhihu-Spider.</p>' +
//     '<router-view></router-view></div>'
// };
// const ZhihuHome = {
//     template: '<div id="zhihu-home" class="zhihu"><p>This is the home of Zhihu-Spider.</p>' +
//     '<p><router-link to="zhihu/person">Person</router-link></p>' +
//     '<p><router-link to="zhihu/entity">School or Company</router-link></p>'    +
//     '</div>'
// };
// const Statistic = {
//     template: '<div class="zhihu">Statistic {{ $route.params.id }}</div>'
// };
// const Person = {
//     template: '<div class="zhihu">Person {{ $route.params.id }}</div>'
// };
// const SimplePerson = new Vue({
//     template: '<div class="zhihu">' +
//     '<p>SimplePerson {{ $route.params.id }}</p>' +
//     '<form><input v-model="id" placeholder="Input the ID of person">' +
//     '<button v-on:click="ajax_get(this.id)"></button></form>' +
//     '</div>',
//     data: {
//         id: '',
//         response: ''
//     },
//     methods: {
//         ajax_get: function(_id) {
//             asxios.get('127.0.0.1:8000/zhihu/simple_person', {params:{id:_id}}).then(
//                 function(_response) {
//                     this.response = _response;
//                 }
//             )
//         }
//     }
// });
// const Entity = {
//     template: '<div class="zhihu">Entity {{ $route.params.id }}</div>'
// };
// const TopPersonByValue = {
//     template: '<div class="zhihu">TopPersonByValue {{ $route.params.id }}</div>'
// };
// const TopEntityByPersonNumber = {
//     template: '<div class="zhihu">TopEntityByPersonNumber {{ $route.params.id }}</div>'
// };
// const TopPersonOfEntity = {
//     template: '<div class="zhihu">TopPersonOfEntity {{ $route.params.id }}</div>'
// };