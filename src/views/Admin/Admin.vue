<template lang="pug">
	#admin
		Header(
			:user='user')
		.wrapper
			Sidebar#sidebar(v-if='name !== "LoginAdmin"')
			router-view#main(
				:class='name !== "LoginAdmin" ? "" : "is-login"'
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
			name: this.$route.name
		}
	},
	computed: {
		...mapState('user', {
			user: state => state.user
		})
	},
	watch: {
		$route() {
			this.name = this.$route.name
		}
	},
	components: {
		Header,
		Sidebar
	}
}
</script>

<style lang="sass" scoped>
	.wrapper
		@include flex(space-between, flex-start)
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
</style>