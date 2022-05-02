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
    <div class="coin-table">
        <CoinTable data={$markets} {watchlist}/>
    </div>
</div>

<style>
    .coin-table{
        margin-top: 40px;
        width: 100%;
        min-height: 770px;
        background-color: #141421;
        border-radius: 12px;
        padding: 20px
    }
</style>
