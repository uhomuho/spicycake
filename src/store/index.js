import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import lessons from '@/store/lessonsModule'
import user from '@/store/userModule'
import cart from '@/store/cartModule'

const Store = new Vuex.Store({})

Store.registerModule('lessons', lessons)
Store.registerModule('user', user)
Store.registerModule('cart', cart)

export default Store