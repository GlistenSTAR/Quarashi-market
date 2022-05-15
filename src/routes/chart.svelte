<script>
    //@ts-nocheck
    import { page } from "$app/stores";
    import Loading from "$lib/components/loader/Loading.svelte";
    import ChartLight from "$lib/components/chart/ChartLight.svelte";
    import isEmpty from "./../utils/is-empty";
    import {
        marketsGlobal,
        defiDominance,
        defi,
        chartTableData,
        markets,
    } from "./../store";
    import { currencyFormat, percentageFormat, priceColor } from "./../helpers";
    import ChartTable from "$lib/components/chart_table/ChartTable.svelte";

    const method = $page.url.searchParams.get("chart");

    let pointsData,
        change,
        title,
        data = {},
        tvlData = {};

    $: if (!isEmpty($markets)) {
        let data = [];
        $markets.map((item) => {
            data.push(item);
        });
        chartTableData.set(data);
    }

    $: if (!isEmpty($marketsGlobal)) {
        if (method == "volume") {
            pointsData = $marketsGlobal.points.volume;
            change = $marketsGlobal.volume24hDiff;
            title = "Volume";
        } else if (method == "dominance") {
            pointsData = $marketsGlobal.points.dominance;
            change = $marketsGlobal.dominanceBTCDiff24h;
            title = "BTC dominance";
        } else if (method == "defimarket") {
            pointsData = $marketsGlobal.points.defiMarket;
            change = $marketsGlobal.marketCapDefiDiff24h;
            title = "DeFi Market Capitalization";
        } else if (method == "tvl") {
            pointsData = $marketsGlobal.points.tvl;
            change = $marketsGlobal.totalValueLockedDiff24h;
            title = "Total Value Locked";
        }

        if (!isEmpty($defiDominance)) {
            data.name = $defiDominance[0].name;
            data.value =
                ($defiDominance[0].market_cap * 100) / $marketsGlobal.marketCap;
        }

        if (!isEmpty($defi)) {
            tvlData.name = $defi["coins"][0]["name"];
            tvlData.value =
                ($defi["coins"][0].tvl * 100) / $marketsGlobal.marketCap;
        }
    }

    const defiMarketDominance = () => {
        if ($marketsGlobal.marketCap && $marketsGlobal.totalValueLocked) {
            return (
                ($marketsGlobal.totalValueLocked * 100) /
                $marketsGlobal.marketCap
            );
        }
        return 0;
    };
</script>

<svelte:head>
    <title>Markets-{title}</title>
</svelte:head>

{#if isEmpty($marketsGlobal) || isEmpty($defiDominance) || isEmpty(data) || isEmpty(tvlData) || isEmpty(chartTableData)}
    <Loading />
{:else}
    <div class="mt-5">
        <div class="row">
            <div class="col-lg-8 col-md-8 col-12 mt-4">
                <div class="chart">
                    <h5>{title}</h5>
                    {#if $marketsGlobal.points}
                        <ChartLight
                            points={pointsData}
                            {change}
                            id={method + "lg"}
                            size={"large"}
                        />
                    {/if}
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-12">
                <div class="cardbox">
                    {#if method == "volume"}
                        <div class="card">
                            <h6>Volume 24H</h6>
                            <h1>{currencyFormat($marketsGlobal.volume24h)}</h1>
                        </div>
                        <div class="card">
                            <h6>Change 24H</h6>
                            <h1
                                class={priceColor($marketsGlobal.volume24hDiff)}
                            >
                                {percentageFormat(
                                    $marketsGlobal.volume24hDiff,
                                    null,
                                    "N/A"
                                )}
                            </h1>
                        </div>
                    {:else if method == "dominance"}
                        <div class="card">
                            <h6>Total Market Cap</h6>
                            <h1>{currencyFormat($marketsGlobal.marketCap)}</h1>
                        </div>
                        <div class="card">
                            <h6>BTC Dominance</h6>
                            <h1>
                                {percentageFormat($marketsGlobal.dominanceBTC, {
                                    forceSign: false,
                                })}
                            </h1>
                        </div>
                        <div class="card">
                            <h6>Change 24H</h6>
                            <h1
                                class={priceColor(
                                    $marketsGlobal.marketCapDiff24h
                                )}
                            >
                                {percentageFormat(
                                    $marketsGlobal.marketCapDiff24h,
                                    2,
                                    "N/A"
                                )}
                            </h1>
                        </div>
                    {:else if method == "defimarket"}
                        <div class="card">
                            <h6>DeFi Market Cap</h6>
                            <h1>
                                {currencyFormat($marketsGlobal.marketCapDefi)}
                            </h1>
                        </div>
                        <div class="card">
                            <h6>Defi Dominance (vs. Global)</h6>
                            <h1
                                class={priceColor(
                                    $marketsGlobal.totalValueLockedDiff24h
                                )}
                            >
                                {percentageFormat(defiMarketDominance(), {
                                    forceSign: false,
                                })}
                            </h1>
                        </div>
                        <div class="card">
                            <h6>{data.name} Dominance</h6>
                            <h1 class="text-blue">
                                {percentageFormat(data.value, null, "N/A")}
                            </h1>
                        </div>
                    {:else if method == "tvl"}
                        <div class="card">
                            <h6>Total Value Locked</h6>
                            <h1>
                                {currencyFormat(
                                    $marketsGlobal.totalValueLocked
                                )}
                            </h1>
                        </div>
                        <div class="card">
                            <h6>Change 24H</h6>
                            <h1
                                class={priceColor(
                                    $marketsGlobal.totalValueLockedDiff24h
                                )}
                            >
                                {percentageFormat(
                                    $marketsGlobal.totalValueLockedDiff24h
                                )}
                            </h1>
                        </div>
                        <div class="card">
                            <h6>{tvlData.name} Dominance</h6>
                            <h1 class="text-blue">
                                {percentageFormat(tvlData.value, null, "N/A")}
                            </h1>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
        <div class="row coin_table">
            <ChartTable method="chart" />
        </div>
    </div>
{/if}

<style>
    .chart h5 {
        position: absolute;
        text-transform: capitalize;
        color: grey;
        margin-left: 10px;
    }
    .cardbox {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;
    }
    .card {
        background-color: #141421;
        border-radius: 12px;
        padding: 10px;
        padding-left: 20px;
        min-height: 100px;
        margin-bottom: 20px;
    }
    h1 {
        text-transform: uppercase;
    }
    h6 {
        color: grey;
    }

    .text-blue {
        color: #3372ff !important;
    }
</style>
