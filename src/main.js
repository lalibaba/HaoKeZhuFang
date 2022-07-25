import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/flexible.js'
import './assets/reset.css'
Vue.config.productionTip = false

import {
  Tabbar,
  TabbarItem,
  NavBar,
  Col,
  Row,
  Image as VanImage,
  Cell,
  CellGroup,
  Icon,
  Search,
  List,
  PullRefresh,
} from 'vant'
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(Search)
Vue.use(List)
Vue.use(PullRefresh)

import Songitem from '@/components/Songitem'
Vue.component('Songitem', Songitem)
// import { recommendSongApi } from '@/api'
// recommendSongApi({
//   limit: 6,
// }).then((res) => console.log(res))

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
