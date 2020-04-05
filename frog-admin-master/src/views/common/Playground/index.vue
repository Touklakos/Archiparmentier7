<template>
	<section id="playground">
		<h1>Recherche de cartes</h1>
		<div style="border: 1px solid grey;padding: 10px;border-radius: 5px">
			<div>
				<div>Recherche Cartes</div>
					<el-input v-model="eli" v-on:keyup.13="alert('oscour')" placeHolder="Rechercher des cartes Magic"/>
				<br>
				<div id="example-1">
				  <button v-on:click="search($event, eli)">Search</button>
					<button disabled=true id="previous" v-on:click="previousPage($event)">Page précédante</button>
					<button disabled=true id="next" v-on:click="nextPage($event)">Page suivante</button>
					<button v-on:click="sauvegarderDeck()">Sauvegarder le Deck</button>
				</div>
			</div>
		</div>
		<div id="deck" style="height:200px;overflow:auto"></div>
		
		<div id="reponse" style="text-align:center;"></div>
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

				document.getElementById('next').disabled = false

				if(this.page <= 1) {

					document.getElementById('previous').disabled = true

				} else {

					document.getElementById('previous').disabled = false

				}

				query = this.transformeQuery(query)

				let module = Math.floor(window.innerWidth/200)


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
									img.style = "width:20%; max-width:250px; min-width:200px;display:block;margin:auto";
									img.ondblclick = function() {

										self.ajouteCarteDeck(cards.name)

									}
									container.appendChild(img);

									contient.push(cards.name)


								}
							}
				    })
				}

				request.send()

			},
			ajouteCarteDeck: function(name) {

				if(this.deck[name] == undefined) {
					this.deck[name] = 1
				} else {
					this.deck[name]++
				}

				this.majAffichage()



			},

			retireCarteDeck: function(name) {

				if(this.deck[name] > 0) {
					this.deck[name] -= 1
				}

				this.majAffichage()


			},

			majAffichage: function() {

				const container = document.getElementById('deck');
				container.innerHTML = '';

				let bouton = ''
				let text = ''
				const self = this

				for(let k in this.deck) {

					if(this.deck[k] > 0) {

						text = document.createElement('p');
						bouton = document.createElement('button');
						bouton.innerHTML = "retirer"

						bouton.addEventListener('click', function() {
							self.retireCarteDeck(k);
						});

						text.innerHTML = k + " : " + this.deck[k] + "\t"

						text.appendChild(bouton);

						container.appendChild(text);

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
				} else if(type == "gameFormat") {
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
</style>
