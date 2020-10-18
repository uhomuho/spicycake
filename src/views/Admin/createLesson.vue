<template lang="pug">
.container
	slot( name="title-bar" )
	.section
		form.form
			b-field( label="Название" )
				b-input( type="text" v-model='formData.name' )
			b-field( label="Описание" )
				b-input( type="textarea" v-model='formData.description' )
			b-field( label="Цена" )
				b-input( type="number" v-model='formData.price' )
			b-field( label="Инвентарь" )
				.dropdown
					.list
						.item(
							:class='choosenTools.includes(tool) ? "selected" : ""'
							v-for='tool in tools'
							@click='addTool(tool)')
							.media
								.media-content
									p {{ tool.name }}
				p.empty( 
					v-if='choosenTools.length !== 0'
					@click='empty' ) Очистить
				b-taglist( v-if='choosenTools.length !== 0' )
					b-tag.is-marginless(
						style="margin: 0 1rem 0 0!important"
						v-for='(tool, index) in choosenTools'
						type="is-primary"
						close-type="is-dark"
						attached
						closable
						aria-close-label="Close tag"
						@close="rmTool(index)")
						|{{ tool.name }}
			b-field
				b-upload.video( v-model="video" expanded)
					a.button.is-primary.is-fullwidth
						b-icon( icon="upload" )
						span {{ video.name || "Загрузить урок"}}
			b-field
				b-upload(
					v-model="photos"
					multiple
					drag-drop
					expanded)
					section.section
						.content.has-text-centered
							p
								b-icon(
									icon="upload"
									size="is-large")
								p Перетащите фото или кликните для загрузки
			.tags
				span.tag.is-primary( v-for="(file, index) in photos"
					:key="index")
					|{{file.name}}
					button.delete.is-small(
						type="button"
						@click="deletePhoto(index)")
			b-field
				.button.is-primary( @click='send' ) 
					|Добавить
	b-loading( v-model='loading' )
</template>

<script>
import lessonsMethods from '@/api/lessonsMethods'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import icon from '@/components/_icon'

export default {
	name: 'CreateLesson',
	components: {
		icon
	},
	data() {
		return {
			formData: {
				name: 'Название',
				description: 'Описание',
				price: '123'
			},
			photos: [],
			video: {
				name: null
			},
			loading: false,
			tools: [
				{
					name: 'Миксер',
					icon: 'mixer'
				},
				{
					name: 'Блендер',
					icon: 'blender'
				},
				{
					name: 'Металлические рамки',
					icon: 'frame'
				},
				{
					name: 'Силиконовые лопатки',
					icon: 'showel'
				},
				{
					name: 'Весы',
					icon: 'balance'
				},
				{
					name: 'Термометр',
					icon: 'thermometer'
				},
				{
					name: 'Спатула',
					icon: 'spatula'
				},
				{
					name: 'Сотейник',
					icon: 'stewpan'
				},
				{
					name: 'Чаши для смешивания',
					icon: 'bowl'
				},
				{
					name: 'Фольга',
					icon: 'foil'
				},
				{
					name: 'Плёнка стрейч',
					icon: 'film'
				},
				{
					name: 'Контейнер',
					icon: 'tupperware'
				},
				{
					name: 'Нож 40см',
					icon: 'knife'
				},
				{
					name: 'Линейка',
					icon: 'ruler'
				},
				{
					name: 'Подложки для пирожных',
					icon: 'substrate'
				}
			],
			choosenTools: []
		}
	},
	watch: {
		video(video) {
			if (video.type !== "video/mp4") {
				Snackbar.open({
					actionText: null,
					message: "Разрешены только видео формата mp4",
					duration: 4000
				})
				this.video = {
					name: null,
					type: "video/mp4"	
				}
			}
		},
		photos(photos) {
			if (photos.length < 6) {
				for (let index in photos) {
					if (photos[index].type !== "image/jpeg" && photos[index].type !== "image/png" && photos[index].type !== "image/jpg") {
						Snackbar.open({
							actionText: null,
							message: "Разрешены только изображения форматов jpeg, jpg и png",
							duration: 4000
						})
						photos.splice(index, 1)
						this.photos = photos
					}
				}
			} else {
				while (photos.length !== 5) {
					photos.splice(photos.length - 1 , 1)
				}
				Snackbar.open({
					actionText: null,
					message: "Максимально допустимое количество: 5 файлов",
					duration: 4000
				})
			}
		}
	},
	methods: {
		deletePhoto(index) {
			this.photos.splice(index, 1)
		},
		addTool(tool) {
			if (!this.choosenTools.includes(tool)) {
				this.choosenTools.push(tool)
			} else {
				let index = this.choosenTools.indexOf(tool)
				if (index > -1) {
					this.choosenTools.splice(index, 1)
				}
			}
		},
		rmTool(index) {
			this.choosenTools.splice(index, 1)
		},
		empty() {
			this.choosenTools = []
		},
		send() {
			if (!this.formData.name) {
				Snackbar.open({
					actionText: null,
					message: "Введите имя!"
				})
				return
			}
			if (!this.formData.description) {
				Snackbar.open({
					actionText: null,
					message: "Добавьте описание урока!"
				})
				return
			}
			if (!this.formData.price) {
				Snackbar.open({
					actionText: null,
					message: "Укажите цену!"
				})
				return
			}
			if (this.choosenTools.length == 0) {
				Snackbar.open({
					actionText: null,
					message: "Необходимо указать используемый инвентарь!"
				})
				return
			}
			if (this.video.name == null) {
				Snackbar.open({
					actionText: null,
					message: "Вы забыли добавить видео с уроком)"
				})
				return
			}
			let formData = new FormData()
			formData.append('name', this.formData.name)
			formData.append('description', this.formData.description)
			formData.append('price', this.formData.price)
			formData.append('tools', this.choosenTools)

			for (let i in this.photos) {
				formData.append(`files`,this.photos[i])
			}
			formData.append('files', this.video)

			this.loading = true
			lessonsMethods.createLesson(formData)
				.then(r => {
					this.loading = false
					Snackbar.open({
						message: r.data.message ? r.data.message : r.data.err,
						actionText: null
					})
				})
				.catch(() => {
					this.loading = false
				})
		}
	}
}
</script>

<style lang="sass" scoped>
.tags
	.tag
		.delete
.dropdown
	display: block
	background: #fff
	max-height: 15rem
	width: fit-content
	padding: 1rem 1rem
	margin-bottom: 1rem
	border-radius: 5px
	box-shadow: 1px 1px 15px rgba(0, 0, 0, .2)
	overflow: scroll
	-ms-overflow-style: none
	scrollbar-width: none
	&::-webkit-scrollbar
		display: none
	.list
		.item
			padding: .2rem .5rem
			border-radius: 4px
			cursor: pointer
			&:hover
				background-color: rgba($primary, .2)
			&.selected
				background: $primary
				color: #fff
			&:not(:first-of-type)
				margin-top: .25rem
			.media
				@include flex(flex-start, center)
	&+.empty
		text-decoration: underline
		color: rgba($primary, .3)
		display: inline-block
		padding:
			top: .5rem
			bottom: 1rem
			right: 4rem
		cursor: pointer
		&:hover
			color: $primary
			
@media screen and (max-width: 768px)
	.dropdown
		width: 100%
</style>