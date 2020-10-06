// Core
import Vue from 'vue'
import App from './App.vue'

// Style
import Buefy from 'buefy'
import 'buefy/dist/buefy.min.css'
Vue.use(Buefy, {
	defaultSnackbarDuration: 2000,
	defaultSnackbarPosition: 'is-top-right'
})

// Components
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)

Vue.prototype.$backendUrl = process.env.NODE_ENV == 'development' ? 'http://localhost:8081/' : 'https://spicycake-backend.herokuapp.com/'

// Router && Store
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
