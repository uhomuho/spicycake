<template lang="pug">
	header
		.nav-item(v-if='!user')
			h3.has-text-dark.is-size-4 SpicyCake Admin
		.nav-item(v-if='user')
			.user.tag.is-medium.is-dark
				b-icon.has-text-light(
					pack="fas"
					icon="user-shield"
					size="is-small")
				.content.has-text-light
					p.is-6
						|{{ user.username }}
		.nav-item(
			v-if='user'
			@click='logout')
			b-icon.logout.has-text-dark(
				pack="fas"
				icon="sign-out-alt"
				size="is-medium")
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	name: 'Header',
	props: ['user'],
	methods: {
		...mapMutations('user', [
			'setUser'
		]),
		logout() {
			this.setUser(null)
			localStorage.setItem('user', null)
			this.$router.push({ name: 'LoginAdmin' })
		}
	}
}
</script>

<style lang="sass" scoped>
header
	@include flex(flex-end)
	margin: 0 auto
	background: #fff
	box-shadow: 0 1px 20px rgba(0, 0, 0, .1)
	position: fixed
	top: 0
	right: 0
	left: 0
	z-index: 3
	.nav-item
		padding: .5rem 1rem
		border-left: 1px solid rgba($grey-light, .4)
	p, .content
		margin-bottom: 0
	.icon.logout
		cursor: pointer
		transition: color .3s ease-in-out
		&:hover
			color: $black!important
	.user
		.tag
			@include flex()
		.icon
			margin:
				right: .5rem!important
				left: 0!important
</style>