import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use((VueRouter))
Vue.config.productionTip = false

import routeLogin from "./components/components_pages/component_login"
import routeDash from "./components/components_pages/component_dashboard"

const routes = [
    {path: '/login', component: routeLogin},
    {path: '/dashboard', component: routeDash}
]

const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
