<template lang="pug">
	.container
		slot( name="title-bar" )
		.section
			.tile.is-ancestor
				.tile.is-parent( v-if='lessons' )
					.tile.is-child.is-6( v-for='lesson in lessons' )
						Lesson( 
							:lesson='lesson'
							:isAdmin='true')
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Lesson from '@/components/_lesson' 

export default {
	name: "AdminLessons",
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
		max-width: unset!important
		.tile.is-ancestor
			.tile.is-parent
				flex-wrap: wrap
				.tile.is-child
					padding: .75rem
</style>