<template>
	<div id="home">
		<div>
			<fr-icon icon="search"/><br>
			<fx-debounce-input :debounce-time="1000" v-model="input"/><br>
			v-model : {{input}}
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import fxDebounceInput from "@/components/frogx-ui/debounceInput/index";

	export default {
		name: 'Recherche cartes',
		components: {fxDebounceInput},
		data() {
			return {
				input: '',
				eli: 'ok',
			}
		},
		methods: {},
		mounted() {

		},
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
