<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    import { closeModal, openModal, modals } from "svelte-modals";
    import { fly } from "svelte/transition";

    import { getCoinVolumeChart } from "../../../../api";
    import ChartLight from "$lib/components/chart/ChartLight.svelte";
    import { XIcon } from "svelte-feather-icons";

    import isEmpty from "../../../../utils/is-empty";

    export let coinID = "";
    export let isOpen = false;

    let datas = {},
        method = "price",
        points;

    onMount(() => {
        getChart();
    });

    const mapItems = (data) => {
        const items = [];

        for (let i = 0; i < data.length; i++) {
            const [time, value] = data[i];
            items.push({ time: time / 1000, value });
        }

        return items;
    };

    const getChart = () => {
        if (typeof localStorage !== "undefined") {
            let TVLchartData = JSON.parse(localStorage.getItem("TVLChartData"));
            if (
                TVLchartData !== null &&
                !isEmpty(TVLchartData[coinID]) &&
                new Date().getTime() - TVLchartData[coinID].time <
                    4 * 60 * 60 * 1000
            ) {
                console.log(1);
                datas = TVLchartData[coinID].data;
            } else {
                getCoinVolumeChart(coinID).then((data) => {
                    if (TVLchartData !== null) {
                        console.log(2);

                        let saved_data = TVLchartData;
                        saved_data[`${coinID}`] = {
                            data: {
                                volume: mapItems(data.total_volumes),
                                price: mapItems(data.prices),
                                cap: mapItems(data.market_caps),
                            },
                            time: new Date().getTime(),
                        };
                        localStorage.setItem(
                            "TVLChartData",
                            JSON.stringify(saved_data)
                        );
                        datas = {
                            volume: mapItems(data.total_volumes),
                            price: mapItems(data.prices),
                            cap: mapItems(data.market_caps),
                        };
                    } else {
                        console.log(3);

                        let saved_data = {};
                        saved_data[`${coinID}`] = {
                            data: {
                                volume: mapItems(data.total_volumes),
                                price: mapItems(data.prices),
                                cap: mapItems(data.market_caps),
                            },
                            time: new Date().getTime(),
                        };
                        localStorage.setItem(
                            "TVLChartData",
                            JSON.stringify(saved_data)
                        );
                        datas = {
                            volume: mapItems(data.total_volumes),
                            price: mapItems(data.prices),
                            cap: mapItems(data.market_caps),
                        };
                    }
                });
            }
        }
    };

    $: if (method == "price") {
        points = datas.price;
    } else if (method == "volume") {
        points = datas.volume;
    } else if (method == "cap") {
        points = datas.cap;
    }

    const active = (key) => {
        method = key;
    };

    const changeInterval = (key) => {
        method = key;
    };

    $: console.log(points);
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal"
        transition:fly={{ y: 50 }}
        on:introstart
        on:outroend
    >
        <div class="contents">
            <div class="modal_header">
                <svg id="close" on:click={closeModal} viewBox="0 0 12 12">
                    <XIcon size="0.8x" />
                </svg>
                TVL Chart
            </div>
            <div class="modal_content">
                {#if points}
                    {#if method == "price"}
                        <ChartLight
                            {points}
                            change={0}
                            size={"medium"}
                            id={"mediumChart"}
                        />
                    {:else if method == "cap"}
                        <ChartLight
                            {points}
                            change={0}
                            size={"medium"}
                            id={"mediumChart"}
                        />
                    {:else}
                        <ChartLight
                            {points}
                            change={0}
                            size={"medium"}
                            id={"mediumChart"}
                        />
                    {/if}
                {:else}
                    <h2 class="text-center mb-4">Loadling</h2>
                {/if}
            </div>
            <div class="modal-footer bg-lawrence justify-content-start">
                <button
                    class={`btn text-oz me-2 ${
                        method == "price" ? "btn-dark" : ""
                    }`}
                    on:click={() => changeInterval("price")}
                >
                    Price
                </button>
                <button
                    class={`btn text-oz me-2 ${
                        method == "cap" ? "btn-dark" : ""
                    }`}
                    on:click={() => changeInterval("cap")}
                >
                    Market Cap
                </button>
                <button
                    class={`btn text-oz me-2 ${
                        method == "volume" ? "btn-dark" : ""
                    }`}
                    on:click={() => changeInterval("volume")}
                >
                    Volume
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .contents {
        min-width: 240px;
        border-radius: 6px;
        padding: 16px;
        background: #252933;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
        position: relative;
        width: 60%;
    }

    .modal_header {
        padding-bottom: 10px;
        border-bottom: 1px solid grey;
        position: relative;
    }
    .modal_content {
        position: relative;
        margin-top: 40px;
        margin-left: 40px;
    }
    .modal_footer {
        border-top: 1px solid grey;
    }
    .modal-footer button {
        color: white;
    }
    #close {
        position: absolute;
        top: 0px;
        right: 14px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        fill: #f44;
        transition: transform 0.3s;
    }
</style>
