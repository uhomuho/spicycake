<template lang="pug">
div
	.hero-body
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
	props: ['user']
}
</script>

<style lang="sass" scoped>

</style>