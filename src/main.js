import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import AddLocation from './components/AddLocation.vue';
import AddUser from './components/AddUser.vue';
import AddContact from './components/AddContact.vue';
import Admin from './components/Admin.vue';
import HomePage from './components/HomePage.vue';
import Vuex from 'vuex';
import VueSession from 'vue-session'
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueRouter)
Vue.use(VueSession,{
    persist: true
})
let store = new Vuex.Store({});
const routes = [
  {
		name: 'AddLocation',
		path: '/add/location/',
		component: AddLocation
	},
  {
  	name: 'HomePage',
  	path: '/',
  	component: HomePage
  },
  {
    name: 'Admin',
    path: '/admin/',
    component: Admin
  },
  {
    name: 'AddUser',
    path: '/add/user/',
    component: AddUser
  },
  {
    name: 'AddContact',
    path: '/add/contact/',
    component: AddContact
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '',
  hashbang: false,
  routes: routes
})

new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
});



