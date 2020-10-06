<template lang="pug">
div
	.container
		.section
			.columns.is-flex.is-multiline( v-if='lessons' )
				.column.is-4-desktop.is-6-tablet.is-12-mobile( v-for='lesson in lessons' )
					.column-container
						Lesson(
							:lesson='lesson'
							:isAdmin='false')
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Lesson from '@/components/_lesson'

export default {
	name: 'UserLessons',
	components: {
		Lesson
	},
	computed: {
		...mapState('lessons', {
			lessons: state => state.lessons
		})
	},
	methods: {
		...mapActions('lessons', [
			'apiLessons'
		])
	},
	beforeMount() {
		this.apiLessons()
	}
}
</script>

<style lang="sass" scoped>
	.container
		width: 1344px
		.tile.is-ancestor
			.tile.is-parent
				flex-wrap: wrap
				.tile.is-child
					padding: .75rem
</style>