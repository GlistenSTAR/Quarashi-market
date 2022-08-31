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

    import isEmpty from "../../../../utils/is-empty";

    let datas = [],
        method = "7d",
        points,
        flag = 0;

    const changeInterval = (key) => {
        method = key;
    };

    const getData = (id, time) => {
        if (typeof localStorage !== "undefined") {
            let VolumechartData = JSON.parse(
                localStorage.getItem("VolumeChartData")
            );
            if (
                VolumechartData !== null &&
                !isEmpty(VolumechartData[coinID]) &&
                !isEmpty(VolumechartData[coinID].data[time]) &&
                new Date().getTime() - VolumechartData[coinID].saved_time <
                    4 * 60 * 60 * 1000
            ) {
                // console.log(1);
                datas = VolumechartData[coinID].data[time];
            } else {
                getCoinTvlChart(id, time).then((data) => {
                    if (VolumechartData !== null) {
                        // console.log(2);
                        let saved_data = VolumechartData;

                        (datas = []), (points = []);
                        for (let i = 0; i < data.length; i++) {
                            datas.push({
                                time: data[i].timestamp / 1000,
                                value: data[i].tvl,
                            });
                            if (i === data.length - 1) {
                                if (!isEmpty(saved_data[`${id}`])) {
                                    // console.log(4);
                                    let temp = saved_data[`${id}`].data;
                                    temp[`${time}`] = datas;
                                    saved_data[`${id}`] = {
                                        saved_time: new Date().getTime(),
                                        data: temp,
                                    };
                                } else {
                                    // console.log(5);
                                    saved_data[`${id}`] = {
                                        saved_time: new Date().getTime(),
                                        data: {},
                                    };
                                    saved_data[`${id}`].data[`${time}`] = datas;
                                }
                                localStorage.setItem(
                                    "VolumeChartData",
                                    JSON.stringify(saved_data)
                                );
                            }
                        }
                    } else {
                        // console.log(3);

                        let saved_data = {};
                        (datas = []), (points = []);
                        for (let i = 0; i < data.length; i++) {
                            datas.push({
                                time: data[i].timestamp / 1000,
                                value: data[i].tvl,
                            });
                            if (i === data.length - 1) {
                                let temp = {};
                                temp[`${time}`] = datas;

                                saved_data[`${id}`] = {
                                    saved_time: new Date().getTime(),
                                    data: temp,
                                };
                                localStorage.setItem(
                                    "VolumeChartData",
                                    JSON.stringify(saved_data)
                                );
                            }
                        }
                    }
                });
            }
            points = datas;
            flag = 1;
        }
    };

    $: if (method == "24h") {
        flag = 0;
        getData(coinID, method);
    } else if (method == "7d") {
        flag = 0;
        getData(coinID, method);
    } else if (method == "14d") {
        flag = 0;
        getData(coinID, method);
    } else if (method == "1m") {
        flag = 0;
        getData(coinID, method);
    }
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
                Chart (24h)
            </div>
            <div class="modal_content">
                {#if points && flag}
                    {#if method === "24h"}
                        <ChartLight
                            {points}
                            change={0}
                            size={"medium"}
                            id={"mediumChart"}
                        />
                    {:else if method === "7d"}
                        <ChartLight
                            {points}
                            change={0}
                            size={"medium"}
                            id={"mediumChart"}
                        />
                    {:else if method === "14d"}
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
