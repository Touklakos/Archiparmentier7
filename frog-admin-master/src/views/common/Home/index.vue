<template>

	<div id="home">
		<img alt="Vue logo" src="../../../assets/logo.png" width="200" height="200">
		<HelloWorld msg="Bienvenue Dans Anakroan Decks !"/>
		<p>
			Pour Tout joueur de Magic, <br>
			Bienvenue sur le le Anakroan Decks !!! <br>
			Grâce à ce site vous pouvez rechercher vos carte <br>
			Construire vos Decks <br>
			Mais aussi retrouver vos magasins les plus proches afin de partager votre passion !<br>
		</p>
		<br>
		<img alt="play" src="../../../assets/play1.jpg" >
		<p> Pour faire ses recherches de cartes</p>
		<img alt="constructeur" src="../../../assets/constructeur1.jpg" >
		<p> Pour acceder aux constructeur</p>
		<img alt="maps" src="../../../assets/maps1.jpg" >
		<p> Pour acceder à la carte maps pour trouver vos magasins</p>

		<div>
			<el-button type="info" @click="goInsta">Instragram</el-button>
			<el-button type="success" @click="goTwitter">Twitter</el-button>
			<el-button type="primary" @click="goFacebook">Facebook</el-button>
		</div>
		
	</div>
</template>

<script>
	// @ is an alias to /src
	import fxDebounceInput from "@/components/frogx-ui/debounceInput/index";
	import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		data() {
			return {
				message: '',
			};
		},
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
		},
	};
</script>

<style lang="scss" scoped>
	#home {
		text-align: center;

		& > div {
			margin: 30px 0;
		}
	}

	.example-slide {
		align-items: center;
		background-color: #666;
		color: #999;
		display: flex;
		font-size: 1.5rem;
		justify-content: center;
		min-height: 10rem;
	}
</style>
