<script>
    import CoinTable from "$lib/components/coin_table/Coin-Table.svelte";
    import isEmpty from "./../utils/is-empty";
    import { markets } from "./../store";
    import Loading from "$lib/components/loader/Loading.svelte";

    let watchlist = true;
</script>

<svelte:head>
    <title>Markets-Watchlist</title>
</svelte:head>

{#if isEmpty($markets)}
    <Loading />
{:else}
    <div>
        <h1>Watchlist</h1>
        <CoinTable {watchlist} />
    </div>
{/if}
