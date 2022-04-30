<script>
	import {onMount} from 'svelte'
	import Header from '$lib/components/header/Header.svelte';
	import '../app.css';

	import {
		getDefiCoins,
		getMarkets,
		getMarketsGlobal,
		getNews,
	} from "./../api";

	onMount(() => {
		getMarketsGlobal();
		getMarkets();
		getDefiCoins();
		getNews();
	});
	
</script>

<Header />

<main>
	<slot />
</main>


<style>
	main {
		margin-top: 40px;
		color: white
	}
</style>
