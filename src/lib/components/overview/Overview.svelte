<script>
    //@ts-nocheck
    export let item = {};
    import {
        currencyFormat,
        percentageFormat,
        priceColor,
    } from "./../../../helpers";
    import ChartLight from "../chart/ChartLight.svelte";
</script>

<!-- chart remain -->
<div style="width: 100%">
    <h1>Overview</h1>
    <div class="cards">
        <div class="card">
            <div class="info">
                <p>Total Market Cap</p>
                <p class={priceColor(item.marketCapDiff24h)}>
                    {#if item.marketCapDiff24h}
                        {percentageFormat(item.marketCapDiff24h)}
                    {/if}
                </p>
            </div>
            <div class="amount">
                <h2>
                    {#if item.marketCap}
                        {currencyFormat(item.marketCap, {
                            average: true,
                            totalLength: 3,
                        })}
                    {/if}
                </h2>
            </div>
        </div>
        <div class="card">
            <div class="info">
                <p>Volume 24H</p>
                <p class={priceColor(item.volume24hDiff)}>
                    {#if item.volume24hDiff}
                        {percentageFormat(item.volume24hDiff)}
                    {/if}
                </p>
            </div>
            <div class="amount">
                <h2>
                    {#if item.volume24h}
                        {currencyFormat(item.volume24h, {
                            average: true,
                            totalLength: 3,
                        })}
                    {/if}
                </h2>
            </div>
            <div class="chart-box">
                <!-- {points.volume} -->
                {#if item.points}
                    <ChartLight
                        points={item.points.volume}
                        change={item.volume24hDiff}
                        id="volume"
                    />
                {/if}
            </div>
        </div>
        <div class="card">
            <div class="info">
                <p>BTC Dominance</p>
                <p class={priceColor(item.dominanceBTCDiff24h)}>
                    {#if item.dominanceBTCDiff24h}
                        {percentageFormat(item.dominanceBTCDiff24h)}
                    {/if}
                </p>
            </div>
            <div class="amount">
                <h2>
                    {#if item.dominanceBTC}
                        {percentageFormat(item.dominanceBTC, {
                            forceSign: false,
                        })}
                    {/if}
                </h2>
            </div>
            <div class="chart-box">
                <!-- points.dominance -->
                {#if item.points}
                    <ChartLight
                        points={item.points.dominance}
                        change={item.dominanceBTCDiff24h}
                        id="domaince"
                    />
                {/if}
            </div>
        </div>
        <div class="card">
            <div class="info">
                <p>DeFi Market Cap</p>
                <p class={priceColor(item.marketCapDefiDiff24h)}>
                    {#if item.marketCapDefiDiff24h}
                        {percentageFormat(item.marketCapDefiDiff24h)}
                    {/if}
                </p>
            </div>
            <div class="amount">
                <h2>
                    {#if item.marketCapDefi}
                        {currencyFormat(item.marketCapDefi)}
                    {/if}
                </h2>
            </div>
            <div class="chart-box">
                <!-- points.defiMarket -->
                {#if item.points}
                    <ChartLight
                        points={item.points.defiMarket}
                        change={item.marketCapDefiDiff24h}
                        id="defi"
                    />
                {/if}
            </div>
        </div>
        <div class="card">
            <div class="info">
                <p>TVL In DeFi</p>
                <p class={priceColor(item.totalValueLockedDiff24h)}>
                    {#if item.totalValueLockedDiff24h}
                        {percentageFormat(item.totalValueLockedDiff24h)}
                    {/if}
                </p>
            </div>
            <div class="amount">
                <h2>
                    {#if item.totalValueLocked}
                        {currencyFormat(item.totalValueLocked)}
                    {/if}
                </h2>
            </div>
            <div class="chart-box">
                <!-- points.tvl -->
                {#if item.points}
                    <ChartLight
                        points={item.points.tvl}
                        change={item.totalValueLockedDiff24h}
                        id="tvl"
                    />
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .cards {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    ::-webkit-scrollbar {
        height: 5px !important;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: black;
        border-radius: 10px;
    }

    .cards .card {
        margin-left: 9px;
        margin-right: 9px;
        min-width: 303px;
        height: 101px;
        border-radius: 12px;
        background: #141421;
        padding: 20px 20px;
        z-index: -1;
        width: 100%
    }

    .card .info {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .card .info p {
        position: relative;
        font-size: 12px;
        color: rgb(185, 185, 185);
    }

    .chart-box {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .chart-box img {
        position: absolute;
        bottom: 0;
        right: -20px;
        z-index: -1;
    }

    .amount h2 {
        font-size: 26px;
        font-weight: bold;
        text-align: left;
        z-index: 1;
        text-transform: uppercase;
    }
    .text-success {
        color: #00a478 !important;
    }
    .text-danger {
        color: #ff4a57 !important;
    }
</style>
