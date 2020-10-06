<template lang="pug">
	div
		Header( :user='user' )
		router-view.hero.is-fullheight.has-background-light( :user='user' )
</template>

<script>
import Header from '@/components/User/_header'
import { mapState } from 'vuex'

export default {
	name: "MainPage",
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

</style>