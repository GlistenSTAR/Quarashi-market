<script>
    //@ts-nocheck
    import CoinTable from "$lib/components/coin_table/Coin-Table.svelte";
    import isEmpty from "./../utils/is-empty";
    import { markets, viewAllData } from "./../store";
    import Loading from "$lib/components/loader/Loading.svelte";

    import { page } from "$app/stores";

    const method = $page.url.searchParams.get("table");

    let data = [], filterData;

    $: if (!isEmpty($markets)) {
        markets.subscribe((item) => {
            data = item;
        });
        if (method == "up") {
            filterData = data.sort((b, a) => {
                return a.priceChange24h - b.priceChange24h;
            });
        } else if(method == "down"){
            filterData = data.sort((a, b) => {
                return a.priceChange24h - b.priceChange24h;
            });
        }
        console.log('$viewAllData', filterData)
        viewAllData.set(filterData);
    }

</script>

<svelte:head>
    <title>
        Markets-{method == "up" ? "Top Gainers" : "Top Losers"}
    </title>
</svelte:head>

{#if isEmpty($markets)}
    <Loading />
{:else}
    <div>
        <h1>{method == "up" ? "Top Gainers" : "Top Losers"}</h1>
        <CoinTable method="view_all" />
    </div>
{/if}
