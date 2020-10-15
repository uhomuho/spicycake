import axios from 'axios'
import { ToastProgrammatic as Toast } from 'buefy'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-From-Front'] = 'true'

export default () => {
	const dev = process.env.NODE_ENV == 'development' ? true : false,
				url = dev ? 'http://localhost:8081' : 'https://spicycake-backend.herokuapp.com/',
				axiosInstance = axios.create({
					baseURL: `${dev ? url : `https://uhomuhoproxy.herokuapp.com/${url}`}`
				}),
				isHandlerEnabled = (config = {}) => !config.handlerEnabled,
				errorHandler = error => {
					if (isHandlerEnabled(error.config) && dev) {
						Toast.open({
							message: `${error.response.statusText}, with status ${error.response.status}`,
							type: 'is-danger',
							position: 'is-top-right',
							queue: false
						})
					}
					return Promise.reject(error)
				},
				successHandler = response => {
					return response
				}

	axiosInstance.interceptors.response.use(
		response => successHandler(response),
		error => errorHandler(error)
	)

	return axiosInstance
}