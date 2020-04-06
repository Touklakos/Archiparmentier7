<template>

	<div id="home">
		<img alt="Vue logo" src="../../../assets/logo.png" width="200" height="200">
		<HelloWorld msg="Bienvenue dans Anakroan Decks !"/>
		<p>
			Bienvenue sur Anakroan Decks !!! <br>
			Grâce à ce site vous pouvez :<br>
			Rechercher des cartes <br>
			Construire vos decks <br>
			Mais aussi retrouver les magasins partenaires les plus proches afin de partager votre passion !<br>
		</p>
		<br>
		<p>Cliquer sur :</p>
		<fr-icon icon="search"/>
		<p> Pour faire des recherches de cartes et construire rapidement un deck</p>
		<fr-icon icon="earth"/>
		<p> Pour voir les magasins partenaires Magic the Gathering</p>

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
