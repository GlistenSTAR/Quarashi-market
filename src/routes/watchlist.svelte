<script>
    import CoinTable from '$lib/components/coin_table/Coin-Table.svelte';
    import { markets } from '../store';
    let watchlist = true
</script>

<svelte:head>
	<title>Markets-Watchlist</title>
</svelte:head>

<div>
    <h1>
        Watchlist
    </h1>
    <CoinTable data={$markets} {watchlist}/>
</div>

