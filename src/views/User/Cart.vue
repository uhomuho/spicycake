<template lang="pug">
div
	.container
		.section
			slot( name="title-bar" )
			table.table.is-fullwidth
				thead
					tr
						th.img Изображение
						th.name Название
						th.price Цена
						th.del
				tbody(v-if='cart')
					tr(v-for='(lesson, index) in cart')
						td.img
							img( :src='`${$backendUrl}lessons/${lesson._id}/img/${lesson.images[0]}`' )
						td.name {{ lesson.name }}
						td.price {{ lesson.price }} ₽
						td.del
							.delete( @click='deleteFromCart(index)' )
					tr.has-text-weight-bold
						td.img
						td.name
						td.price Итого: {{ totalCart }} ₽
						td.del
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
	name: 'Cart',
	computed: {
		...mapGetters('cart', [
			'totalCart'
		]),
		...mapState('cart', {
			cart: state => state.cart
		})
	},
	watch: {
		cart() {
			if (this.cart.length == 0) {
				this.$router.push({ name: 'Клиентские уроки' })
			}
		}
	},
	methods: {
		...mapMutations('cart', [
			'deleteFromCart'
		])
	},
	beforeMount() {
		if (this.cart.length == 0) {
			this.$router.push({ name: 'Клиентские уроки' })
		}
	}
}
</script>

<style lang="sass" scoped>
	.table
		background: transparent
		td
			border-bottom: 1px dashed $grey-light
		td, th
			&:not(:last-of-type)
				border-right: 1px dashed $dark
		.img
			width: 1%
			img
				max-width: 8rem
		.del
			width: 1%
</style>