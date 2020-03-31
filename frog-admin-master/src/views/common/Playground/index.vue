<template>
	<section id="playground">
		<h1>Recherche de cartes</h1>
		<div style="border: 1px solid grey;padding: 10px;border-radius: 5px">
			<div>
				<div>Recherche Cartes</div>
					<el-input v-model="eli" placeHolder="Bonjour"/>
				<br>
				<div id="example-1">
				  <button v-on:click="search($event, eli)">Search</button>
				</div>
			</div>
		</div>
		<div id = "reponse"></div>
	</section>
</template>

<script>

	import fxDebounceInput from "@/components/frogx-ui/debounceInput/index";

	export default {
		name: "playground",
		data() {
			return {
				eli: '',
				counter: 0,
			}
		},
		methods: {
			search: function (event, query) {
				const api = 'https://api.magicthegathering.io/v1/cards'
				var request = new XMLHttpRequest()
				query = api+'?name='+query
				const container = document.getElementById('reponse');
				container.innerHTML = '';

				request.open('GET', query, true)
				request.onload = function() {
				  var data = JSON.parse(this.response)
				    data.cards.forEach(cards => {
							if(cards.imageUrl != null) {
								var img = document.createElement('img');
								img.src = cards.imageUrl;
								img.style = "width:200px";
								container.appendChild(img);
							}
				    })
				}

				request.send()

			},
		},
		mounted() {

		},

	}
</script>

<style lang="scss" scoped>
	canvas {
		border: 1px solid black;
	}
	reponse {
		width: 100px;
	}
</style>
