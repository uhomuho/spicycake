<template lang="pug">
	#admin
		Header(
			:user='user')
		.wrapper
			Sidebar#sidebar(
				v-if='name !== "LoginAdmin"'
				:class='openSidebar ? "opened" : ""')
			#sidebar-toggle(
				v-if='user && user.permissions == 1'
				@click='toggleSidebar()'
				:class='openSidebar ? "opened" : ""')
				b-icon.has-text-white.has-background-dark(
					icon="backburger"
					size="is-medium")
			router-view#main(
				:class='openSidebar ? "opened" : ""'
				:user='user')
				div.hero.title-bar(
					v-if='name !== "LoginAdmin"' 
					slot="title-bar")
					h2.is-size-2 {{ name }}
</template>

<script>
import Header from '@/components/Admin/_header'
import Sidebar from '@/components/Admin/_sidebar'
import { mapState } from 'vuex'

export default {
	name: 'Admin',
	data() {
		return {
			name: this.$route.name,
			openSidebar: false
		}
	},
	components: {
		Header,
		Sidebar
	},
	computed: {
		...mapState('user', {
			user: state => state.user
		})
	},
	watch: {
		$route() {
			this.name = this.$route.name
			this.openSidebar = false
		}
	},
	methods: {
		toggleSidebar() {
			this.openSidebar = !this.openSidebar
		}
	}
}
</script>

<style lang="sass" scoped>
	.wrapper
		@include flex(space-between, flex-start)
		overflow: hidden
		#sidebar-toggle
			@include flex()
			display: none
			position: fixed
			top: 0
			left: 0
			z-index: 3
			.icon
				height: 3rem
				width: 3.5rem
				cursor: pointer
		#sidebar
			width: 15rem
			height: 100vh
			position: fixed
			top: 0
			left: 0
			z-index: 4
			overflow: scroll
			-ms-overflow-style: none
			scrollbar-width: none
			&::-webkit-scrollbar
				display: none
		#main
			width: 100%
			height: 100vh
			padding-top: 4.5rem
			background: #f8f8f8
			margin:
				left: 15rem
			overflow: scroll
			-ms-overflow-style: none
			scrollbar-width: none
			&.is-login
				margin-left: 0
			&::-webkit-scrollbar
				display: none
			.hero.title-bar
				background: #fff
				padding: 1.5rem 2rem
				border:
					top: 1px solid rgba(24,28,33,.06)
					bottom: 1px solid rgba(24,28,33,.06)
	@media screen and (max-width: 768px)
		.wrapper
			#sidebar-toggle
				display: flex
				transition: left .3s ease-in-out
				&.opened
					left: 15rem
					.icon
						transform: rotate(180deg)
			#sidebar
				left: -100%
				transition: left .3s ease-in-out
				z-index: 99
				&.opened
					left: 0
			#main
				margin-left: 0
</style>