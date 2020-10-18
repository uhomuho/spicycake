<template lang="pug">
	.icon
		img( :src='path' )
</template>

<script>
export default {
	name: 'icon',
	props: ['path']
}
</script>