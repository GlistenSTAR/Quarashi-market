<script>
    // @ts-nocheck
    import { page } from "$app/stores";
    import Select from "svelte-select";
    import { total_items } from "../../selectData";
    import Datatable from "./Datatable.svelte";
    import isEmpty from "../../../utils/is-empty";
    import Loading from "../loader/Loading.svelte";
    import { defiDominance, defi, chartTableData } from "../../../store";

    export let method = "";

    let filter = "",
        data = [],
        selected = "Highest Cap",
        filterData = [];

    const chart_way = $page.url.searchParams.get("chart");

    if (!isEmpty(chart_way) && !isEmpty($chartTableData)) {
        if (chart_way == "volume") {
            selected = "Highest Volume";
            data = $chartTableData.sort((b, a) => {
                return a.totalVolume - b.totalVolume;
            });
        } else if (chart_way == "dominance") {
            data = $chartTableData.sort((b, a) => {
                return a.marketCap - b.marketCap;
            });
        } else if (chart_way == "defimarket") {
            data = $defiDominance;
        } else if (chart_way == "tvl") {
            data = $defi.coins;
            selected = "";
        }
        chartTableData.set(data);
    }

    const handleSelect = (e) => {
        filter = e.detail.value;
        if (!isEmpty(data)) {
            if (filter === "lowestCap") {
                filterData = data.sort((a, b) => {
                    return a.marketCap - b.marketCap;
                });
            } else if (filter === "highestCap") {
                filterData = data.sort((b, a) => {
                    return a.marketCap - b.marketCap;
                });
            } else if (filter === "highestVol") {
                filterData = data.sort((b, a) => {
                    return a.totalVolume - b.totalVolume;
                });
            } else if (filter === "lowestVol") {
                filterData = data.sort((a, b) => {
                    return a.totalVolume - b.totalVolume;
                });
            }
            if (filter === "lowestPrice") {
                filterData = data.sort((a, b) => {
                    return a.price - b.price;
                });
            } else if (filter === "highestPrice") {
                filterData = data.sort((b, a) => {
                    return a.price - b.price;
                });
            } else if (filter === "topGainer") {
                filterData = data.sort((b, a) => {
                    return a.priceChange24h - b.priceChange24h;
                });
            } else if (filter === "topLoser") {
                filterData = data.sort((a, b) => {
                    return a.priceChange24h - b.priceChange24h;
                });
            }
            chartTableData.set(filterData);
        }
    };
</script>

{#if isEmpty($defiDominance) && isEmpty(data) && isEmpty(chartTableData)}
    <Loading />
{:else}
    <div class="coin-table">
        <div>
            <div class="coin_kind col-md-4">
                <Select
                    items={total_items}
                    value={selected}
                    showChevron={true}
                    on:select={handleSelect}
                />
            </div>
        </div>
        <div class="table-res">
            <Datatable {method} />
        </div>
    </div>
{/if}

<style>
    .coin_kind {
        --background: #0b0b12;
        --borderRadius: 12px;
        --border: 1px solid rgb(88, 88, 88);
        --listBackground: #0b0b12;
        --clearSelectColor: #c921cd;
        --clearSelectFocusColor: #c921cd;
        --inputFontSize: 12px;
        --disabledBackground: #0b0b12;
        --disabledColor: grey;
        --indicatorColor: #c921cd;
        --itemHoverBG: #007aff;
    }
    .coin-table {
        margin-top: 40px;
        width: 100%;
        min-height: 770px;
        background-color: #141421;
        border-radius: 12px;
        padding: 20px;
        padding-bottom: 60px;
        /* min-width: 830px; */
    }
    @media (max-width: 830px) {
        .table-res {
            overflow-x: auto;
        }
        .coin-table {
            margin-top: 20px;
        }
    }
</style>
