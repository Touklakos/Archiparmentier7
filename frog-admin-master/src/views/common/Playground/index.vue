<template>
	<section id="playground">
		<h1>Recherche de cartes</h1>
		<div style="border: 1px solid grey;padding: 10px;border-radius: 5px">
			<div>
				<div>Recherche Cartes</div>
					<el-input v-model="eli" placeHolder="Rechercher des cartes Magic"/>
				<br>
				<div id="example-1">
				  <button v-on:click="search($event, eli)">Chercher</button>
					<button disabled=true class="previous" v-on:click="previousPage($event)">Page précédente</button>
					<button disabled=true class="next" v-on:click="nextPage($event)">Page suivante</button>
				</div>
			</div>
		</div>
		<div id="deck" style="height:350px;width:60%;overflow:auto;border: 1px solid grey;padding: 10px;border-radius: 5px;position:absolute;right:33px">
			Deck
			<button v-on:click="sauvegarderDeck()">Sauvegarder le Deck</button>
		</div>

		<div id="reponse"></div>
		<div id="example-1">
			<button disabled=true class="previous" v-on:click="previousPage($event)">Page précédente</button>
			<button disabled=true class="next" v-on:click="nextPage($event)">Page suivante</button>
		</div>
	</section>
</template>

<script>

	import fxDebounceInput from "@/components/frogx-ui/debounceInput/index";
	let FileSaver = require('file-saver');

	export default {
		name: "playground",
		data() {
			return {
				eli: '',
				page: 1,
				lastQuery: '',
				deck: new Object,
			}
		},
		methods: {
			search: function (event, query, page = 1) {

				this.lastQuery = query
				this.page = page
				let nexts = document.getElementsByClassName('next')
				for(var i = 0; i < nexts.length; i++) {
					nexts.item(i).disabled = true;
				}
				let previouss = document.getElementsByClassName('previous')
				for(var i = 0; i < previouss.length; i++) {
					previouss.item(i).disabled = true;
				}

				query = this.transformeQuery(query)


				const api = 'https://api.magicthegathering.io/v1/cards'
				let request = new XMLHttpRequest()
				query = api+query
				const container = document.getElementById('reponse');
				container.innerHTML = '';


				let contient = []
				let self = this

				request.open('GET', query, true)
				request.onload = function() {
				  let data = JSON.parse(this.response)
				    data.cards.forEach(cards => {
							if(cards.imageUrl != null) {
							 	if(!contient.includes(cards.name)) {
									let img = document.createElement('img');
									img.src = cards.imageUrl;
									img.style = "width:20%; max-width:300px; min-width:200px;display:block";
									img.ondblclick = function() {

										self.ajouteCarteDeck(cards.name)

									}

									container.appendChild(img);


									contient.push(cards.name)

								}
							}
				    })

						if(contient.length == 0) {
							let mess = document.createElement('p')
							mess.innerHTML = 'Aucune carte ne correspont à votre recherche'
							container.appendChild(mess);
							let nexts = document.getElementsByClassName('next')
							for(var i = 0; i < nexts.length; i++) {
								nexts.item(i).disabled = true;
							}
						} else {

							let nexts = document.getElementsByClassName('next')
							for(var i = 0; i < nexts.length; i++) {
								nexts.item(i).disabled = false;
							}

						}

						if(self.page <= 1) {

							let previouss = document.getElementsByClassName('previous')
							for(var i = 0; i < previouss.length; i++) {
								previouss.item(i).disabled = true;
							}

						} else {

							let previouss = document.getElementsByClassName('previous')
							for(var i = 0; i < previouss.length; i++) {
								previouss.item(i).disabled = false;
							}

						}
				}

				request.send()

			},
			ajouteCarteDeck: function(name, nombre = 1) {

				this.deck[name] = nombre

				this.majAffichage()



			},

			retireCarteDeck: function(name) {

				this.ajouteCarteDeck(name, 0)

			},

			majAffichage: function() {


				const self = this

				const container = document.getElementById('deck');
				container.innerHTML = 'Deck '
				let save = document.createElement('button');
				save.innerHTML = 'Sauvegarder le Deck'
				save.addEventListener('click', function() {
					self.sauvegarderDeck();
				});
				container.appendChild(save)



				for(let k in this.deck) {

					if(this.deck[k] > 0) {

						let text = document.createElement('p');
						let nombre = document.createElement('input');
						let bouton = document.createElement('button');
						bouton.innerHTML = "retirer"
						bouton.addEventListener('click', function() {
							self.retireCarteDeck(k);
						});
						bouton.style = "margin-left:auto"

						nombre.type = "number"
						nombre.min = "1"
						nombre.value = this.deck[k]
						nombre.addEventListener('change', function() {
							self.ajouteCarteDeck(k, nombre.value);
						});
						nombre.style = "margin-left:auto"

						text.innerHTML = k + " : "

						text.appendChild(nombre);
						text.appendChild(bouton);

						container.appendChild(text);
						container.appendChild(document.createElement('hr'));

					}

				}



			},

			transformeQuery: function(query) {

				let contient = new Object
				let q = query.split(" ")

				for(let i = 0; i < q.length; i++) {

					if(q[i].includes(":")) {

						let a = q[i].split(":")
						a[0] = this.adapteTypeQuery(a[0])
						if(contient[a[0]] == undefined) {
							contient[a[0]] = a[1]
						} else {
							contient[a[0]] += "," + a[1]
						}
					} else {
						if(contient["name="] == undefined) {
							contient["name="] = q[i]
						} else {
							contient["name="] += "," + q[i]
						}
					}

				}

				let ret = '?'

				for(let k in contient) {

					ret += k + contient[k] + "&"

				}

				return ret + "page=" + this.page + "&orderBy=name"

			},
			adapteTypeQuery: function(type) {

				let ret = "name="

				if(type == "name" || type == "n") {
					ret = "name="
				} else if(type == "layout") {
					ret = "layout="
				} else if(type == "cmc") {
					ret = "cmc="
				} else if(type == "colors" || type == "c") {
					ret = "colors="
				} else if(type == "colorIdentity") {
					ret = "colorIdentity="
				} else if(type == "type" || type == "t") {
					ret = "type="
				} else if(type == "supertypes") {
					ret = "supertypes="
				} else if(type == "types") {
					ret = "types="
				} else if(type == "subtypes") {
					ret = "subtypes="
				} else if(type == "rarity") {
					ret = "rarity="
				} else if(type == "set") {
					ret = "set="
				} else if(type == "setName") {
					ret = "setName="
				} else if(type == "text" || type == "oracle" || type == "o") {
					ret = "text="
				} else if(type == "flavor") {
					ret = "flavor="
				} else if(type == "artist") {
					ret = "artist="
				} else if(type == "number") {
					ret = "number="
				} else if(type == "power") {
					ret = "power="
				} else if(type == "toughness") {
					ret = "toughness="
				} else if(type == "loyalty") {
					ret = "loyalty="
				} else if(type == "language") {
					ret = "language="
				} else if(type == "gameFormat" || type == "format") {
					ret = "gameFormat="
				} else if(type == "legality") {
					ret = "legality="
				}
				return ret
			},

			nextPage: function(event) {

				this.search(event, this.lastQuery, this.page + 1)

			},
			previousPage: function(event) {

				this.search(event, this.lastQuery, this.page - 1)

			},
			sauvegarderDeck: function(){
				let blob = new Blob(["//votre deck :\n"], {type: "text/plain;charset=utf-8"});
				for(let k in this.deck) {

					if(this.deck[k] > 0) {

						blob = new Blob([blob,this.deck[k]+" "+k+"\n"], {type: "text/plain;charset=utf-8"});

					}

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
</style>
