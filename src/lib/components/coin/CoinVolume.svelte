<script>
    //@ts-nocheck
    export let volumes = {};
    export let launchDate = "";
    export let coinID = "";

    import isEmpty from "./../../../utils/is-empty";
    import { currencyFullValue, percentageFormat } from "./../../../helpers";

    import { Modals, closeModal, openModal } from "svelte-modals";

    import ModalTvlChart from "./modal/ModalTvlChart.svelte";
    import ModalTradingVol from "./modal/ModalVolumeChart.svelte";

    import { BarChart2Icon } from "svelte-feather-icons";

    const mCapTvlRatio =
        volumes.marketCap && volumes.tvl ? volumes.marketCap / volumes.tvl : 0;

    const onClickVolume = () => {
        openModal(ModalTradingVol, {
            coinID: coinID,
        });
    };

    const onClickTvl = () => {
        openModal(ModalTvlChart, {
            coinID: coinID,
        });
    };
</script>

<div class="row mt-mb-4">
    <div class="col-lg-6 col-sm-12 box">
        <ul class="list-group list-group-flush bg-steel-10 rounded">
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
            >
                <div class="text-grey">Market Cap</div>
                <span class="text-oz">
                    {#if volumes.marketCap == 0}
                        <span class="text-grey">N/A</span>
                    {:else}
                        {currencyFullValue(volumes.marketCap)}
                    {/if}
                </span>
            </li>
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
            >
                <div class="text-grey">In Circulation</div>
                <div class="text-oz">
                    {#if volumes.circulatingSupply == 0}
                        <span class="text-grey">N/A</span>
                    {:else}
                        {currencyFullValue(volumes.circulatingSupply, {
                            thousandSeparated: true,
                            mantissa: 0,
                        })}
                    {/if}
                </div>
            </li>
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
            >
                <div class="text-grey">Total Supply</div>
                <div class="text-oz">
                    {#if volumes.totalSupply == 0 || volumes.totalSupply == null || typeof volumes.totalSupply == "undefined"}
                        <span class="text-grey">N/A</span>
                    {:else}
                        {currencyFullValue(volumes.totalSupply)}
                    {/if}
                </div>
            </li>
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
            >
                <div class="text-grey">Diluted MCap</div>
                <div class="text-oz">
                    {#if volumes.dilutedValuation == 0 || volumes.dilutedValuation == null || typeof volumes.dilutedValuation == "undefined"}
                        <span class="text-grey">N/A</span>
                    {:else}
                        {currencyFullValue(volumes.dilutedValuation)}
                    {/if}
                </div>
            </li>
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
            >
                <div class="text-grey">Launch Date</div>
                <div class="text-oz">
                    {#if !isEmpty(launchDate)}
                        {launchDate}
                    {:else}
                        <span class="text-grey">N/A</span>
                    {/if}
                </div>
            </li>
        </ul>
    </div>
    <div class="col-lg-6 col-sm-12 box">
        <ul class="list-group list-group-flush bg-steel-10 rounded">
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
                role="button"
            >
                <div class="text-grey">Trading Volume</div>
                <div
                    class="text-oz"
                    style="display:flex;align-items: flex-end;"
                    on:click={onClickVolume}
                >
                    {currencyFullValue(volumes.totalVolume)}
                    {#if volumes.totalVolume}
                        <BarChart2Icon />
                    {/if}
                </div>
            </li>
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
            >
                <div class="text-grey">Volume Rank</div>
                <span class="text-grey">N/A</span>
            </li>
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
                role="button"
            >
                <div class="text-grey">Total Value Locked</div>
                <div
                    class="text-oz"
                    style="display:flex;align-items: flex-end;"
                    on:click={onClickTvl}
                >
                    {#if volumes.tvl === 0 || volumes.tvl == null || typeof volumes.tvl == "undefined"}
                        <span class="text-grey">N/A</span>
                    {:else}
                        {currencyFullValue(volumes.tvl)}
                        {#if volumes.tvl}
                            <BarChart2Icon />
                        {/if}
                    {/if}
                </div>
            </li>
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
            >
                <div class="text-grey">TVL Rank</div>
                <div class="text-grey">N/A</div>
            </li>
            <li
                class="list-group-item bg-lawrence d-flex justify-content-between py-3"
            >
                <div class="text-grey">M.cap / TVL ratio</div>
                <div class="text-oz">
                    {#if percentageFormat( mCapTvlRatio, { forceSign: false } ) == "0%"}
                        <span class="text-grey">N/A</span>
                    {:else}
                        {percentageFormat(mCapTvlRatio, { forceSign: false })}
                    {/if}
                </div>
            </li>
        </ul>
    </div>
    <Modals>
        <div slot="backdrop" class="backdrop" on:click={closeModal} />
    </Modals>
</div>

<style>
    .box {
        background-color: #252933;
        padding: 20px;
        border-radius: 20px;
        font-size: 14px;
    }
    .row {
        justify-content: center;
    }
    .row .col-lg-6 {
        margin-left: 7px;
        margin-right: 7px;
        width: 47%;
    }
    ul li {
        background-color: transparent;
        color: white;
        border-bottom-color: #5b5c5e;
    }
    .text-grey {
        color: #858484;
    }

    @media (max-width: 768px) {
        .col-sm-12 {
            margin-top: 20px;
        }
        .col-lg-6.col-sm-12{
            width: 100%;
        }
        .row {
            margin-left: 5px;
            margin-right: 5px;
        }
    }
</style>
