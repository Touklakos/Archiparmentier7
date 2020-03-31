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

				  <button v-on:click="sauvegarderDeck()">Sauvegarder le Deck</button>
				</div>
			</div>
		</div>
		<div id = "reponse"></div>
	</section>
</template>

<script>
	var FileSaver = require('file-saver');
	var blob = new Blob(["//votre deck :\n"], {type: "text/plain;charset=utf-8"});
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
								var buttonAjoute = document.createElement('button');
								buttonAjoute.innerHTML = 'Ajouter';
								buttonAjoute.onclick = function(){
									var nbCard = prompt("Vous voulez ajouter "+ cards.name+" \n Indiquez le nombre d'exemplaire :", "1");
  									if (nbCard == "null" || nbCard == "" || nbCard == "0") {
    									alert("attention champ non-rempli !")
  									} else {
    									blob = new Blob([blob,nbCard+" "+cards.name+"\n"], {type: "text/plain;charset=utf-8"});
  									}
																		
  								};
								container.appendChild(img);
								container.appendChild(buttonAjoute);
							}
				    })
				}

				request.send()

			},
			sauvegarderDeck: function(){
				FileSaver.saveAs(blob, "Deck Magic.txt");
				blob = new Blob(["//votre deck :\n"], {type: "text/plain;charset=utf-8"});
			}
			
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
