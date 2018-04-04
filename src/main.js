import Vue from "vue";
import App from "./App";
import Vuex from 'vuex';

Vue.use(Vuex);

new Vue({
    el: '#app',
    render: h => h(App)
});