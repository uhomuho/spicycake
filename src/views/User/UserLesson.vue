<template lang="pug">
div
	.container
		.section
			slot( name="title-bar" )
			.container( v-if='lesson' )
				.columns.is-flex.is-multiline
					.column.is-6-desktop.is-7-tablet.is-12-mobile
						.column-container
							.content
								h3.is-size-4 {{ lesson.name }}
					.column.is-6-desktop.is-5-tablet.is-12-mobile
						.column-container
							VueSlickCarousel(
								v-if='lesson && lesson.images'
								:dots='true'
								lazyLoad="progressive")
								img(
									v-for='(image, index) in lesson.images'
									:src='`https://spicycake.online?type=img&id=${lesson._id}&name=${image}`'
									:alt='lesson.name')
			.container( v-else )
				b-loading( v-model='loading' )
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
	name: 'Lesson',
	data() {
		return {
			loading: true
		}
	},
	components: {
		VueSlickCarousel
	},
	props: ['lessonId'],
	computed: {
		...mapState('lessons', {
			lesson: state => state.lesson
		})
	},
	methods: {
		...mapActions('lessons', ['apiLesson'])
	},
	beforeMount() {
		this.apiLesson({
			id: this.lessonId
		})
	}
}
</script>

<style lang="sass" scoped>
	.columns
		margin-top: 2rem
	.container
		min-height: 10rem
</style>