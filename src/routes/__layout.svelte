<script>
	import {onMount} from 'svelte'
	import Header from '$lib/components/header/Header.svelte';
	import '../app.css';

	import {
		getDefiCoins,
		getMarkets,
		getMarketsGlobal,
		getNews,
		getWatchlist
	} from "./../api";

	onMount(() => {
		getMarketsGlobal();
		getMarkets();
		getDefiCoins();
		getNews();
		getWatchlist();
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
