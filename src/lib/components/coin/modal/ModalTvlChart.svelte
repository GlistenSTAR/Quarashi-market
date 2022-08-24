<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    import { closeModal, openModal, modals } from "svelte-modals";
    import { fly } from "svelte/transition";

    import { getCoinTvlChart } from "../../../../api";
    import ChartLight from "$lib/components/chart/ChartLight.svelte";
    import { XIcon } from "svelte-feather-icons";

    import SmallLoading from "$lib/components/loader/SmallLoading.svelte";

    export let coinID = "";
    export let isOpen = false;

    let datas = {},
        method = "7d",
        points;

    const mapItems = (data, index) => {
        const items = [];

        for (let i = 0; i < data.length; i++) {
            if (index === 1) {
                items.push(data[i]);
            } else {
                items.push(parseInt(data[i].timestamp));
            }
        }

        return items;
    };

    const getData = () => {
        getCoinTvlChart(coinID, method).then((data) => {
            datas = {
                time: mapItems(data, 1),
                value: mapItems(data, 2),
            };
        });
    };

    $: points = getData();

    const active = (key) => {
        method = key;
    };

    const changeInterval = (key) => {
        method = key;
    };
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal"
        transition:fly={{ y: 50 }}
        on:introstart
        on:outroend
    >
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
                    Chart (24h)
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
                        <h2 class="text-center mb-4">
                            <SmallLoading />
                        </h2>
                    {/if}
                </div>
                <div class="modal-footer bg-lawrence justify-content-start">
                    <button
                        class={`btn text-oz me-2 ${
                            method == "24h" ? "btn-dark" : ""
                        }`}
                        on:click={() => changeInterval("24h")}
                    >
                        24h
                    </button>
                    <button
                        class={`btn text-oz me-2 ${
                            method == "7d" ? "btn-dark" : ""
                        }`}
                        on:click={() => changeInterval("7d")}
                    >
                        7d
                    </button>
                    <button
                        class={`btn text-oz me-2 ${
                            method == "14d" ? "btn-dark" : ""
                        }`}
                        on:click={() => changeInterval("14d")}
                    >
                        14d
                    </button>
                    <button
                        class={`btn text-oz me-2 ${
                            method == "1m" ? "btn-dark" : ""
                        }`}
                        on:click={() => changeInterval("1m")}
                    >
                        1m
                    </button>
                </div>
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
