<template lang="pug">
div
	.container
		.section
			b-message(
				v-if='user && !user.verify'
				type="is-warning"
				has-icon)
				b.is-size-5 Внимание!
				br
				|Покупка лекций станет доступна 
				b только после подтверждения аккаунта 
				b в 
				router-link( :to='{ name: "Account" }' ) личном кабинете
			slot( name="title-bar" )
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
		}),
		...mapState('user', {
			user: state => state.user
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
</style>