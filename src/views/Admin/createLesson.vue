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
			//- b-field.file
				b-upload( v-model="file" expanded)
					a.button.is-primary.is-fullwidth
						b-icon( icon="upload" )
						span {{ file.name || "Загрузить урок"}}
			b-field
				b-upload(
					v-model="formData.files"
					multiple
					drag-drop)
					section.section
						.content.has-text-centered
							p
								b-icon(
									icon="upload"
									size="is-large")
								p Перетащите файл или кликните для загрузки
			.tags
				span( v-for="(file, index) in formData.files"
					:key="index"
					class="tag is-primary" )
					|{{file.name}}
					button.delete.is-small(
						type="button"
						@click="deleteFile(index)")
			b-field
				.button.is-primary( @click='send' ) 
					|Добавить
	b-loader( v-model='loading' )
</template>

<script>
import lessonsMethods from '@/api/lessonsMethods'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
	name: 'CreateLesson',
	data() {
		return {
			formData: {
				name: 'Название',
				description: 'Описание',
				price: '123',
				files: null
			},
			file: {
				name: null
			},
			loading: false
		}
	},
	methods: {
		deleteFile(index) {
			this.formData.files.splice(index, 1)
		},
		send() {
			let formData = new FormData()
			formData.append('name', this.formData.name)
			formData.append('description', this.formData.description)
			formData.append('price', this.formData.price)

			for (let i in this.formData.files) {
				formData.append(`files`,this.formData.files[i])
			}
			this.loading = true
			lessonsMethods.createLesson(formData)
				.then(r => {
					this.loading = false
					Snackbar.open({
						message: r.data.message ? r.data.message : r.data.err,
						actionText: null
					})
				})
		}
	}
}
</script>

<style lang="sass" scoped>

</style>