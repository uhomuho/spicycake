<template lang="pug">
	div
		Header( :user='user' )
		router-view#user.hero.is-fullheight.has-background-light( :user='user' )
			div.hero.title-bar(
				v-if='name !== "LoginAdmin"' 
				slot="title-bar")
				h2.is-size-2 {{ name }}
				hr
</template>

<script>
import Header from '@/components/User/_header'
import { mapState } from 'vuex'

export default {
	name: "MainPage",
	data() {
		return {
			name: this.$route.meta.title
		}
	},
	watch: {
		$route() {
			this.name = this.$route.meta.title
		}
	},
	components: {
		Header
	},
	computed: {
		...mapState('user', {
			user: state => state.user
		})
	}
}
</script>

<style lang="sass" scoped>
.title-bar
	hr
		margin-top: .5rem
		background-color: $grey-light
		height: 1px
#user
	padding-top: 4.75rem
@media screen and (max-width: 768px)
	header
		position: fixed
		top: 0
		left: 0
		right: 0
		z-index: 9
	#user	
		padding-top: 4.75rem
</style>