import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import lessons from '@/store/lessonsModule'
import user from '@/store/userModule'

const Store = new Vuex.Store({})

Store.registerModule('lessons', lessons)
Store.registerModule('user', user)

export default Store