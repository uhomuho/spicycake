import { SnackbarProgrammatic as Snackbar } from "buefy"

export default {
	namespaced: true,
	state: {
		cart: []
	},
	getters: {
		totalCart: (state) => {
			let cart = state.cart,
					price = 0
			if (cart.length !== 0) {
				for (let lesson of cart) {
					price += lesson.price
				}
				return price
			}
		}
	},
	mutations: {
		pushToCart: (state, payload) => {
			if (state.cart.length == 0) {
				state.cart.push(payload)
			} else {
				let exist = state.cart.filter(lesson => lesson._id == payload._id)
				if (!exist || exist.length == 0) {
					state.cart.push(payload)
				} else {
					Snackbar.open({
						position: 'is-bottom-right',
						actionText: null,
						duration: 3000,
						message: 'Нельзя добавить больше одной одинаковой лекции',
						queue: false
					})
				}
			}
		},
		deleteFromCart: (state, index) => state.cart.splice(index, 1),
		setCartEmpty: state => state.cart = []
	},
	actions: {
	}
}