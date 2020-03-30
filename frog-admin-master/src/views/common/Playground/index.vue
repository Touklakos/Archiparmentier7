<template>
	<section id="playground">
		<h1>Recherche de cartes</h1>
		<div style="border: 1px solid grey;padding: 10px;border-radius: 5px">
			<div>
				<div>Recherche Cartes</div>
				<el-input v-model="eli"/>
				<br>
				{{eli}}
				<div id="example-1">
				  <button v-on:click="search('Sorin, Vampire Lord')">Search</button>
				</div>
			</div>
		</div>
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
			search: function (query) {
				alert(query)
				const api = 'https://api.magicthegathering.io/v1';
				fetch(api+'cards?name='+query).then(res => res.json()).then(json => console.log(json));
				alert(api+'/cards?name='+query)

			},
		},
		mounted() {
			axios
		      .get('https://api.magicthegathering.io/v1')
		      .then(response => (this.eli = response));
		},

	}
</script>

<style lang="scss" scoped>
	canvas {
		border: 1px solid black;
	}
</style>
