<script>
    //@ts-nocheck
    import { page } from "$app/stores";
    import Loading from '$lib/components/loader/Loading.svelte'
    import ChartLight from '$lib/components/chart/ChartLight.svelte'
    import isEmpty from './../utils/is-empty'

    const method = $page.url.searchParams.get("chart");

    import { marketsGlobal } from "./../store";

    let item = $marketsGlobal, pointsData, change;

    if(method == "volume"){
        pointsData = item.points.volume
        change = item.volume24hDiff
    } else if(method == "dominance"){
        pointsData = item.points.dominance
        change = item.dominanceBTCDiff24h
    } else if(method == "defimarket"){
        pointsData = item.points.defiMarket
        change = item.marketCapDefiDiff24h
    } else if(method == "tvl"){
        pointsData = item.points.tvl
        change = item.totalValueLockedDiff24h
    } 
</script>

{#if isEmpty($marketsGlobal)}
    <Loading />
{:else}
    <div>
        <div class="chart">
            {#if item.points}
                <ChartLight
                    points={pointsData}
                    change={change}
                    id={method}
                    size={"large"}
                />
            {/if}
        </div>
    </div>
{/if}

<style>
    /* .chart{
        width: ;
    } */
</style>