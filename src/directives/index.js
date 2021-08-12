import Vue from 'vue'
import * as directives from './directives'

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
