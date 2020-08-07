import Vue from 'vue'
import Crud from './components/Crud.vue'


import './public/css/bootstrap.min.css'

new Vue({
    render: h=>h(Crud)
}).$mount('#root')