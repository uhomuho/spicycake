<template lang="pug">
	.card
		router-link.card-header( :to='{ name: "Lesson", params: { lessonId: lesson._id } }' )
			.card-header-title
				|{{ lesson.name }}
		.card-image( :to='{ name: "Lesson", params: { lessonId: lesson._id } }' )
			figure.image.is-16by9
				video-player.video-player-box(
					v-if='isAdmin && !photo'
					ref="videoPlayer"
					:options="playerOptions(lesson)")
				.slider-cotnainer(v-else-if='!isAdmin || photo')
					VueSlickCarousel(
						v-if='lesson && lesson.images'
						:dots='true'
						lazyLoad="progressive")
						img(
							v-for='(image, index) in lesson.images'
							:src='`https://spicycake.online?type=img&id=${lesson._id}&name=${image}`'
							:alt='lesson.name')
		.card-content
			.breadcrumb.is-centered( v-if='isAdmin' )
				ul(@click="photo = !photo")
					li(
						:class='!photo ? "has-text-primary" : ""') Видео
					li(
						:class='photo ? "has-text-primary" : ""') Фото
			.content
				p {{ lesson.description }}
			.content.bottom
				p.is-size-4
					|Цена: {{ lesson.price }} ₽
		.card-footer( v-if='user && user.permissions == 1' )
			p.card-footer-item.has-text-danger( @click='deleteLesson(lesson._id)' )
				|Удалить
			router-link.card-footer-item.has-text-warning( :to='{name: "Редактировать урок", params: { id: lesson._id}}' )
				|Редактировать
		.card-footer( v-else-if='user && user.verify' )
			p.card-footer-item.has-text-primary(@click='pushToCart(lesson)')
				|Добавить в корзину
</template>

<script>
import lessonsMethods from '@/api/lessonsMethods'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import { mapActions, mapMutations, mapState } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
	name: 'AdminLesson',
	data() {
		return {
			photo: true
		}
	},
	components: {
		VueSlickCarousel
	},
	props: ['lesson', 'isAdmin'],
	computed: {
		...mapState('user', {
			user: state => state.user
		})
	},
	methods: {
		...mapActions('lessons', [
			'apiLessons'
		]),
		...mapMutations('cart', [
			'pushToCart'
		]),
		deleteLesson(id) {
			lessonsMethods.deleteLesson(id)
				.then((res) => {
					Snackbar.open({
						message: res.data.message,
						actionText: null
					})
					this.apiLessons(true)
				})
				.catch(err => console.error(err))
		},
		playerOptions(lesson) {
			return {
				language: 'ru',
				sources: [{
					type: "video/mp4",
					src: `https://spicycake.online?id=${lesson._id}&name=${lesson.video}`
				}],
				poster: `https://spicycake.online?type=img&id=${lesson._id}&name=${lesson.images[0]}`
			}
		}
	}
}
</script>

<style lang="sass" scoped>
.card
	.card-image
		figure
			position: relative
			.slider-cotnainer
				height: 100%
				width: 100%
				position: absolute
				top: 0
				.slick-slider
					height: 100%
				img
					position: relative
					width: unset
					margin: 0 auto
			.video-player-box
				width: 100%
				height: 100%
				position: absolute
				top: 0
	.breadcrumb
		li
			cursor: pointer
			&::before
				padding: 0 .25rem
	.card-footer-item
		cursor: pointer
		user-select: none
</style>