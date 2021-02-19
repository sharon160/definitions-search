import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import SearchBar from './components/SearchBar';
import About from './components/About';
import Home from './components/Home';
import Compare from './components/Compare';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    path: '/about',
    component: About,
  },
  {
    path: '/search',
    component: SearchBar,
  },
  {
    path: '/',
    component: Home,
  },
  {
    path: '/compare',
    component: Compare,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
