<template lang="pug">
div
	.hero-body(@mousemove='paralax')
		//- img.bg( src="@/assets/main_bg.png" )
		.bg
		.blur
		.container
			.section
				.content
					h1 Привет, меня зовут Елена
					h3 Добро пожаловать на spicycake.ru
					p.is-size-5 
						|Здесь я научу 
						b вас 
						|готовить 
						b вкуснейшие десерты 
						| высокого качества  
						b для себя 
						|и своих 
						b близких
					p.is-size-6 
						|Чтобы начать учиться нужно 
						b войти 
						|или 
						b зарегистрироваться, 
						|для этого нажмите на кнопку 
						b 'Авторизация' 
						|в меню
</template>

<script>
export default {
	name: 'HomePage',
	data() {
		return {
			bg: [
				'/img/main_bg.png',
				'/img/main_bg_1.png',
				'/img/main_bg_2.png',
				'/img/main_bg_3.png',
				'/img/main_bg_4.png',
			]
		}
	},
	props: ['user'],
	methods: {
		paralax(e) {
			let bg = document.querySelector('.bg'),
					offsetX = - (e.clientX / window.innerWidth * 30) - 15,
					offsetY = - (e.clientY / window.innerHeight * 10) - 5
			
			bg.style.backgroundPosition = `${offsetX}px ${offsetY}px` 
		}
	},
	mounted() {
		let bg = document.querySelector('.bg'),
				index = Math.floor(Math.random() * (this.bg.length - 1))


		bg.style.backgroundImage = `url('${this.bg[index]}')`
	}
}
</script>

<style lang="sass" scoped>
.hero-body
	position: relative
	overflow: hidden
	.bg
		height: 110%
		width: 110%
		max-width: unset
		margin: 0 auto
		position: absolute
		top: 0
		right: -50%
		left: -50%
		z-index: 1
		background-image: url('/img/main_bg.png')
		background-size: cover
		background-repeat: no-repeat
		background-position: 0px 0px
	.blur
		width: 100%
		height: 100%
		position: absolute
		top: 0
		left: 0
		backdrop-filter: blur(5px) brightness(70%)
		z-index: 2
	.container
		position: relative
		z-index: 3
		.content
			*
				color: #fff
				text-shadow: 0px 0px 8px #000
@media screen and (max-width: 768px)
	.bg
		background-position: 50%!important
</style>