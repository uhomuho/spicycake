<template lang="pug">
div.has-background-dark
	.top-item
		h3.has-text-white.is-size-4 SpicyCake Admin
	.menu
		.menu-item
			router-link( :to='{name: "Уроки"}' ) Уроки
			.nested-menu
				.nested-menu-item
					router-link( :to='{name: "Добавить урок"}' ) Добавить
</template>

<script>
export default {
	name: "Sidebar"
}
</script>

<style lang="sass" scoped>
	.top-item
		@include flex()
		height: 3rem
		width: 100%
		border-bottom: 1px solid rgba($grey-light, .5)
		h3
			user-select: none
	.menu
		@include flex(flex-start, flex-start, column)
		padding: 2rem 1rem 0
		.menu-item
			width: 100%
			margin: .5rem 0
			.nested-menu
				border-left: 1px solid rgba($grey-light, .5)
				margin:
					top: .5rem
					left: .5rem
				.nested-menu-item
					margin:
						left: .5rem
			a
				color: #fff
				display: inline-block
				width: 100%
				padding: .2rem .5rem
				border-radius: 4px
				&:hover,
				&.router-link-exact-active
					background: #f8f8f8
					color: $dark	
</style>