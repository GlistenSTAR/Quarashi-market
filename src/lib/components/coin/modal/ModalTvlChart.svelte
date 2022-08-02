<script>
    // @ts-nocheck
    import { getCoinTvlChart } from "../../../../api";
    import cn from "classnames";
    import {
        closeModal,
        closeAllModals,
        openModal,
        modals,
    } from "svelte-modals";
    import { fly } from "svelte/transition";
    import ChartLight from "$lib/components/chart/ChartLight.svelte";

    export let coinID = "";
    export let isOpen = false;

    let interval = "7d",
        points = [];

    $: getChart(interval);

    const getChart = (interval) => {
        getCoinTvlChart(coinID, interval).then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const time = parseInt(item.timestamp);
                points.push({ time, value: item.tvl });
            }
        });
    };

    const changeInterval = (key) => {
        interval = key;
    };

    const active = (key) => interval === key;
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal"
        transition:fly={{ y: 50 }}
        on:introstart
        on:outroend
    >
        <div class="bg-lawrence">
            <!-- {#if points}
                <ChartLight
                    key={interval}
                    class="w-100"
                    change={0}
                    {points}
                    height={300}
                    barSpacing={12}
                    rightPrice={true}
                    timeVisible={true}
                    size={"small"}
                />
            {:else}
                <div class="text-center m-5">
                    <div class="spinner-border text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            {/if} -->
        </div>
        <div class="modal-footer bg-lawrence justify-content-start">
            <button
                class={cn("btn text-oz me-2", {
                    "btn-dark": active("24h"),
                })}
                onClick={() => changeInterval("24h")}
            >
                24H
            </button>
            <button
                class={cn("btn text-oz me-2", { "btn-dark": active("7d") })}
                onClick={() => changeInterval("7d")}
            >
                7D
            </button>
            <button
                class={cn("btn text-oz me-2", {
                    "btn-dark": active("14d"),
                })}
                onClick={() => changeInterval("14d")}
            >
                14D
            </button>
            <button
                class={cn("btn text-oz me-2", { "btn-dark": active("1m") })}
                onClick={() => changeInterval("1m")}
            >
                1M
            </button>
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
</style>
