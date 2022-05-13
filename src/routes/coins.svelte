<script>
    //@ts-nocheck
    import { page } from "$app/stores";
    import isEmpty from "./../utils/is-empty";

    import { coins, markets, defi, coinInfo } from "./../store";
    import Loading from "$lib/components/loader/Loading.svelte";
    import {
        currencyFullValue,
        priceColor,
        percentageFormat,
    } from "./../helpers";
    import { getCoinInfo } from "./../api/index";
    import { ArrowUpIcon, ArrowDownIcon } from "svelte-feather-icons";
    import coinStore from "$lib/coins-store";
    import Chart from "$lib/components/chart/Chart.svelte";
    import CoinPerformance from "$lib/components/coin/CoinPerformance.svelte";
    import CoinVolume from "$lib/components/coin/CoinVolume.svelte";
    import CoinMarkets from "$lib/components/coin/CoinMarkets.svelte";
    import CoinInfo from "$lib/components/coin/CoinInfo.svelte";
    import CoinSidebar from "$lib/components/coin/CoinSidebar.svelte";

    const coinID = $page.url.searchParams.get("id");

    let data, filterData1, filterData2, filterData3, filterData4, filterData;

    $: getCoinInfo(coinID);

    $: if (
        !isEmpty(coinID) &&
        !isEmpty($defi) &&
        !isEmpty($markets) &&
        !isEmpty($coinInfo) &&
        !isEmpty(coinStore)
    ) {
        $defi.coins.map((item) => {
            if (item.id === coinID) {
                filterData1 = item;
                // console.log("filterData1", filterData1);
            }
        });
        $markets.map((item) => {
            if (item.id === coinID) {
                filterData2 = item;
                // console.log("filterData2", filterData2);
            }
        });
        filterData3 = coinStore.coins[`${coinID}`];
        filterData = {
            ...filterData2,
            ...filterData1,
            ...filterData3,
            ...$coinInfo,
        };
        console.log(filterData);
    }
</script>

{#if isEmpty(coinID) || isEmpty($coins) || isEmpty($markets) || isEmpty($coinInfo) || isEmpty($defi)}
    <Loading />
{:else}
    <div class="coin_view">
        <div class="row">
            <div class="col-lg-9 col-md-9 col-sm-10 col-xs-12 chart_view">
                <div class="title">
                    <!-- coin kind -->
                    <div class="d-flex flex-column flex-md-row">
                        <img
                            class="object-contain rounded-circle d-none d-md-block"
                            src={filterData.image.large}
                            height="86"
                            alt=""
                        />

                        <div class="ps-md-3 mt-3 mt-md-0 pb-4">
                            <div class="fs-4 text-grey-light">
                                {filterData.name}
                            </div>
                            <div class="d-flex align-items-center">
                                <span
                                    class="fs-2 text-grey fw-bold text-uppercase"
                                    >{filterData.symbol}</span
                                >
                                <span
                                    class="ms-3 text-bran bg-lawrence rounded-2 px-3 py-1"
                                    >Rank:
                                    {#if filterData.rank != null}
                                        {filterData.rank}
                                    {/if}
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- category -->
                    {#if !isEmpty(filterData.categories)}
                        <div class="category mb-3">
                            <span class="text-grey">Category: </span>
                            {#each filterData.categories as item, i}
                                <a
                                    key={i}
                                    class="text-jacob text-capitalize text-decoration-none px-2"
                                    href="/"
                                >
                                    {item}
                                </a>

                                {#if i !== filterData.categories.length - 1}
                                    <span key={`${i}-sep`}> | </span>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                </div>
                <!-- price -->
                <div class="d-flex flex-column flex-md-row mt-3">
                    <span class="fs-1 text-oz fw-bold">
                        {currencyFullValue(filterData.price)} &nbsp;
                    </span>
                    <span
                        class={`fs-4 d-flex align-items-center ${priceColor(
                            filterData.priceChange24
                        )}`}
                    >
                        {#if filterData.priceChange24 > 0}
                            <ArrowUpIcon size="16" class="i up" />
                        {:else}
                            <ArrowDownIcon size="16" class="i down" />
                        {/if}&nbsp;
                        {percentageFormat(Math.abs(filterData.priceChange24), {
                            forceSign: false,
                        })}
                    </span>
                </div>
                <!-- chart -->
                <div class="mb-3 mt-3">
                    {#if filterData.symbol}
                        <Chart coin={filterData.symbol} coinId={coinID} />
                    {/if}
                </div>
                <!-- price change -->
                <div class="mb-3 mt-3">
                    <CoinPerformance
                        performance={filterData.performance}
                        priceRanges={filterData.priceRanges}
                    />
                </div>
                <!-- coin volume -->
                <div class="mb-3 mt-3">
                    <CoinVolume
                        volumes={filterData.volumes}
                        symbol={filterData.symbol}
                        coinId={coinID}
                        launchDate={filterData.launchDate}
                    />
                </div>
                <!-- markets -->
                <div class="mt-mb-3">
                    <CoinMarkets
                        class="my-3"
                        markets={filterData.markets}
                    />
                </div>

                <!-- description -->
                <div class="mt-5">
                    <CoinInfo
                        description={filterData.description}
                        guide={filterData.guide}
                        whitepaper={filterData.whitepaper}
                    />
                </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                <CoinSidebar
                    coin={filterData.id}
                    links={filterData.links}
                    platforms={filterData.platforms}
                />
            </div>
        </div>
    </div>
{/if}

<style>
    .chart_view {
        background-color: #141421;
        border-radius: 1rem;
        padding: 3rem;
    }
    .chart_view .title {
        border-bottom: 1px solid rgb(68, 68, 68);
    }
    .bg-lawrence {
        background-color: #252933;
        border-radius: 40px !important;
    }
    .text-jacob {
        color: #c921cd;
    }
</style>
