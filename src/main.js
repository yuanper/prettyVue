// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Search, Swipe, SwipeItem, Lazyload, Tabbar, 
              TabbarItem, Tab, Tabs, Switch, List,Cell,NavBar,Checkbox,CheckboxGroup,CellGroup,
              Stepper, Step, Steps, Icon, Field   } from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(VueAwesomeSwiper)
  .use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Switch).use(List).use(Cell).use(NavBar).use(Checkbox).use(CheckboxGroup).use(CellGroup)
  .use(Stepper).use(Step).use(Steps).use(Icon).use(Field)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
