<template lang="pug">
	.container
		slot( name="title-bar" )
		.section
			form.form( v-if='lesson' )
				b-field( label="Название" )
					b-input( type="text" v-model='lesson.name' )
				b-field( label="Описание" )
					b-input( type="textarea" v-model='lesson.description' )
				b-field( label="Цена" )
					b-input( type="number" v-model='lesson.price' )
				.change-files(v-if='changeFiles && false')
					.tile.is-ancestor
						.tile.is-parent
							.tile.is-child
								p.is-size-5.has-text-weight-bold Текущий урок:
								video-player.video-player-box(
									v-if='!video'
									ref="videoPlayer"
									:options="playerOptions")
								b-field.file
									b-upload( v-model="video" expanded)
										a.button.is-primary.is-fullwidth
											b-icon( icon="upload" )
											span {{ video ? video.name : "Загрузить другой урок"}}
							
							.tile.is-child.photos
								b-field
									b-upload(
										v-model="photos"
										multiple
										drag-drop)
										section.section
											.content.has-text-centered
												p
													b-icon(
														icon="upload"
														size="is-large")
													p Перетащите фото или кликните для загрузки
								.tags
									span( v-for="(file, index) in lesson.images"
										:key="index"
										class="tag is-primary" )
										|{{file}}
										button.delete.is-small(
											type="button")
									span( v-for="file in photos"
										class="tag is-primary" )
										|{{file.name}}
										button.delete.is-small(
											type="button")
								.images.is-flex
									.image(v-for='(image, index) in lesson.images')
										img(
											:src='`${$backendUrl}lessons/${lesson._id}/img/${image}`')
										b-icon(
											pack='fas'
											icon='minus-circle'
											type='is-danger')
									.image(v-for='preview in previews')
										img(
											:src='preview')
				b-field
					.button.is-primary(@click='save') 
						|Сохранить
	
</template>

<script>
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import { mapActions, mapState } from 'vuex'
import lessonsMethods from '@/api/lessonsMethods'

export default {
	name: 'EditLesson',
	data() {
		return {
			changeFiles: true,
			video: null,
			photos: null,
			formData: new FormData(),
			showFile: {},
			previews: []
		}
	},
	watch: {
		photos() {
			for (let photo of this.photos) {
				this.formData.append('files', photo)
			}
		}
	},
	props: {
		id: {
			default: null
		}
	},
	computed: {
		...mapState('lessons', {
			lesson: state => state.lesson
		}),
		playerOptions() {
			if (this.lesson) {
				return {
					language: 'ru',
					sources: [{
						type: "video/mp4",
						src: `${this.$backendUrl}/lessons/${this.lesson._id}/${this.lesson.video}`
					}],
					poster: `${this.$backendUrl}/lessons/${this.lesson._id}/img/${this.lesson.images[0]}`
				}
			}
			return null
		}
	},
	methods: {
		...mapActions('lessons', [
			'apiLesson'
		]),
		save() {
			lessonsMethods.updateLesson(this.lesson)
				.then(res => {
					Snackbar.open({
						actionText: null,
						message: res.data.message
					})
				})
		},
		preview(file){
			// let reader  = new FileReader(),
					// preview

			// reader.addEventListener("load", function () {
			// 	preview = reader.result
			// }.bind(this), false)

			// if ( /\.(jpe?g|png)$/i.test( file.name ) ) {
			// 	// reader.readAsDataURL( file )
			// 	console.log(reader.readAsDataURL( file ))
			// 	this.showFile[index] = true
			// 	return preview
			// } else {
			// 	this.showFile[index] = false
			// }
			let reader = new FileReader()
			reader.onload = (event) => {
					this.previews.push(event.target.result)
			}
			reader.readAsDataURL(file)
		}
	},
	beforeMount() {
		if (this.id) {
			this.apiLesson({
				id: this.id,
				isAdmin: true
			})
		} else {
			Snackbar.open({
				actionText: null,
				message: 'Сначала выберите урок!'
			})
			this.$router.push({ name: 'Уроки' })
		}
	}
}
</script>

<style lang="sass" scoped>
.video-player
	height: 12rem
	width: 21rem
	margin:
		bottom: 1rem
		top: .25rem
.change-files
	margin-bottom: .5rem
.file
	width: 21rem
.tile.is-child.photos
	padding-top: 2rem
.images
	flex-wrap: wrap
	.image
		width: 7rem
		margin: 0 .25rem
		position: relative
		.icon
			position: absolute
			top: .5rem
			right: .5rem
			cursor: pointer
</style>