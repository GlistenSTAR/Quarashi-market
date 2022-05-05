<script>
    //@ts-nocheck
    import CoinTable from "$lib/components/coin_table/Coin-Table.svelte";
    import isEmpty from "./../utils/is-empty";
    import { markets, watchlist, watchlistData } from "./../store";
    import Loading from "$lib/components/loader/Loading.svelte";

    let data = [],
        oldWatchlist;

    if (!isEmpty($markets) || !isEmpty($watchlist)) {
        watchlist.subscribe((item) => {
            oldWatchlist = item;
        });

        $markets.map((item) => {
            if (oldWatchlist[`${item.id}`]) {
                data.push(item);
            }
        });
        watchlistData.set(data);
    } else {
        watchlistData.set([]);
    }
</script>

<svelte:head>
    <title>Markets-Watchlist</title>
</svelte:head>

{#if isEmpty($markets)}
    <Loading />
{:else}
    <div>
        <h1>Watchlist</h1>
        <CoinTable method="watch" />
    </div>
{/if}
