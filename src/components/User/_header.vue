<template lang="pug">
	header
		nav.navbar( role="navigation" aria-label="main navigation" )
			.container
				.navbar-brand
					.navbar-item
						router-link( :to='{ name: "Homepage" }' )
							img( src="@/assets/logo.png" )
					.navbar-item.buttons.is-hidden-tablet
						b-button(
							v-if='user && user.permissions == 1'
							tag="router-link"
							:to='{ name: "LoginAdmin"}')
							|Админпанель
						.icon-container(
							v-if='user && user.permissions !== 1')
							p.price.has-text-dark(v-if='totalCart')
								|{{ totalCart }} ₽
							router-link(
								:to='{ name: "Cart" }')
								b-icon(
									type="is-dark"
									icon="cart")
						b-button(
								v-if='user && user.permissions !== 1'
								icon-right="account"
								tag="router-link"
								to='/')
								|{{ user.username }}
						b-button(
							v-if='user'
							icon-right="logout"
							@click='logout')
						.button.is-info.is-light( 
							@click="toggleModal"
							v-if='!user' ) Авторизация
					.navbar-burger.burger(
						@click="toggleMenu"
						:class='openMenu ? "is-active" : ""')
						span
						span
						span
				.navbar-menu(
					:class='openMenu ? "is-active" : ""')
					.navbar-start(
						@click='toggleMenu')
						.navbar-item
							router-link( :to='{ name: "Клиентские уроки" }' ) Уроки
					.navbar-end
						.navbar-item.buttons.is-hidden-mobile
							b-button(
								v-if='user && user.permissions == 1'
								tag="router-link"
								:to='{ name: "LoginAdmin"}')
								|Админпанель
							.icon-container(
								v-if='user && user.permissions !== 1')
								p.price.has-text-dark(v-if='totalCart')
									|{{ totalCart }} ₽
								router-link(
									:to='{ name: "Cart" }')
									b-icon(
										type="is-dark"
										icon="cart")
								.cart.card.is-hidden-mobile(v-if='totalCart')
									.card-content
										.list
											.list-item(v-for='(lesson, index) in cart')
												.level
													.level-left
														.level-item
															p {{ lesson.name }}
													.level-right
														.level-item
															p {{ lesson.price }} ₽
															.delete(@click='deleteFromCart(index)')
									.card-footer
										router-link.card-footer-item( :to='{ name: "Cart" }' )
											|Перейти в корзину
							b-button(
								v-if='user && user.permissions !== 1'
								icon-right="account"
								tag="router-link"
								:to='{ name: "Account" }')
								|{{ user.name }}
							b-button(
								v-if='user'
								icon-right="logout"
								@click='logout')
							.button.is-info.is-light( 
								@click="toggleModal"
								v-if='!user' ) Авторизация
		Auth(
			v-if='!user'
			:class='showModal ? "is-active" : ""'
			@close='toggleModal')
</template>

<script>
import Auth from '@/components/User/_auth'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
	name: "Header",
	data() {
		return {
			showModal: false,
			openMenu: false
		}
	},
	components: {
		Auth
	},
	watch: {
		$route() {
			this.openMenu = false
			this.showModal = false
		},
		user() {
			this.showModal = false
		}
	},
	props: ['user'],
	computed: {
		...mapGetters('cart', [
			'totalCart'
		]),
		...mapState('cart', {
			cart: state => state.cart
		})
	},
	methods: {
		...mapMutations('user', [
			'setUser'
		]),
		...mapMutations('cart', [
			'deleteFromCart'
		]),
		toggleModal() {
			this.showModal = !this.showModal
		},
		logout() {
			this.setUser(null)
			localStorage.setItem('token', null)
			setTimeout(() => {
				this.$router.push({ name: 'Homepage' })
			}, 50)
		},
		toggleMenu() {
			this.openMenu = !this.openMenu
		}
	}
}
</script>

<style lang="sass" scoped>
nav
	width: 100%
	box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
	position: fixed
.container
	position: relative
.navbar-brand
	align-items: center
	.navbar-item
		img
			max-height: 4rem
.navbar-menu
	.navbar-start
		.navbar-item
			a
				color: $grey
				&:hover
					color: $dark
				&.router-link-exact-active
					color: $dark
	.navbar-end
		.buttons
			.icon-container
				@include flex()
				margin: 0 1rem .5rem
				cursor: pointer
				position: relative
				&:hover
					.card.cart
						top: 130%
						visibility: visible
						opacity: 1
				p.price
					margin-right: .5rem
				.cart.card
					min-width: 20rem
					position: absolute
					top: -20%
					right: 0
					z-index: 2
					visibility: hidden
					opacity: 0
					transition: all .2s ease-in-out
					.card-content
						padding: 1.5rem 1rem 1rem
						.list
							.list-item
								&:not(:last-of-type)
									border-bottom: 1px dashed $grey-light
									padding-bottom: .5rem 
									margin-bottom: .5rem
								.level
									.level-right
										.level-item
											padding-right: 1.25rem
											position: relative
											.delete
												max-width: .75rem
												min-width: .75rem
												max-height: .75rem
												min-height: .75rem
												margin: auto 0
												position: absolute
												top: 0
												bottom: 0
												right: .125rem

@media screen and (max-width: 1023px)
	.is-hidden-mobile
		display: none
	.navbar-brand
		.navbar-burger
			margin-left: unset
		.buttons
			display: flex!important
			margin-left: auto
			margin-bottom: 0
			.icon-container
				@include flex()
				margin-right: 1rem
				.icon
					margin-left: .5rem
			.button,
			.icon-container
				margin-bottom: 0
	.navbar-menu
		text-align: center
		width: 100%
		margin: 0 auto
		position: absolute
		top: 100%
		left: 0
		right: 0
		z-index: 9

@media screen and (max-width: 768px)
	.container
		padding: 0 .75rem
</style>