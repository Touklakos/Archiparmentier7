<template>
	<div id="home">
		<img alt="Vue logo" src="../../../assets/logo.png" width="200" height="200">
		<HelloWorld msg="Bienvenue Dans Anakroan Decks !"/>
		<div>
			<el-button type="info" @click="goInsta">Instragram</el-button>
			<el-button type="success" @click="goTwitter">Twitter</el-button>
			<el-button type="primary" @click="goFacebook">Facebook</el-button>
	
		</div>
		
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		name: 'home',
		components: {
			HelloWorld
		},
		methods: {
			goInsta() {
				window.open('https://www.instagram.com/');
			},
			goTwitter(){
				window.open('https://twitter.com/explore');
			},
			goFacebook(){
				window.open('https://www.facebook.com/');
			},
		}
	}
</script>

<style lang="scss" scoped>
	#home {
		text-align: center;

		& > div {
			margin: 50px 0;
		}
	}

	#github-link {
	}
</style>
