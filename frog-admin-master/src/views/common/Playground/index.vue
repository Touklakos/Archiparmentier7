<template>
	<section id="playground">
		<h1>Recherche de cartes</h1>
		<div style="border: 1px solid grey;padding: 10px;border-radius: 5px">
			<div>
				<div>Recherche Cartes</div>
					<el-input v-model="eli" v-on:keyup.enter="search($event, eli)" placeHolder="Rechercher des cartes Magic"/>
				<br>
				<div id="example-1">
				  <button v-on:click="search($event, eli)">Search</button>
					<button v-on:click="sauvegarderDeck()">Sauvegarder le Deck</button>
				</div>
			</div>
		</div>
		<div v-for="(value, name) in deck">
			{{name}}:{{value}}
		</div>

		<div id="reponse"></div>
	</section>
</template>

<script>

	import fxDebounceInput from "@/components/frogx-ui/debounceInput/index";
	var FileSaver = require('file-saver');

	export default {
		name: "playground",
		data() {
			return {
				eli: '',
				contient: [],
				deck: new Object,
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


				var contient = []
				var self = this

				request.open('GET', query, true)
				request.onload = function() {
				  var data = JSON.parse(this.response)
				    data.cards.forEach(cards => {
							if(cards.imageUrl != null) {
							 	if(!contient.includes(cards.name)) {
									var img = document.createElement('img');
									img.src = cards.imageUrl;
									img.style = "width:200px";
									img.ondblclick = function() {

										alert('izi')
										self.ajouteCarteDeck(cards.name)
										alert('ultra izi')

									}
									container.appendChild(img);

									contient.push(cards.name)

								}
							}
				    })
				}

				this.contient = contient
				request.send()

			},
			ajouteCarteDeck: function(name) {

				var nbCard = prompt("Vous voulez ajouter "+ name+" \n Indiquez le nombre d'exemplaire :", "1");
				if (nbCard == "null" || nbCard == "" || nbCard == "0") {
					alert("attention champ non-rempli !")
				} else {
					this.deck[name] = nbCard
				}
			},

			retireCarteDeck: function(name) {

				this.deck[name] -= 1

			},
			sauvegarderDeck: function(){
				var blob = new Blob(["//votre deck :\n"], {type: "text/plain;charset=utf-8"});
				for(var k in this.deck) {

					blob = new Blob([blob,this.deck[k]+" "+k+"\n"], {type: "text/plain;charset=utf-8"});

				}

				FileSaver.saveAs(blob, "Deck Magic.txt");
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
	#img {
		height: 200px;
	}
</style>
