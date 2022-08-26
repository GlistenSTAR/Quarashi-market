<script>
    //@ts-nocheck
    import Select from "svelte-select";
    import {
        top_items,
        volume_items,
        period_items,
        marketcap_items,
        liquidity_items,
        pricechange_items,
    } from "$lib/selectData.js";
    import CoinTable from "../coin_table/Coin-Table.svelte";

    import { markets, advancedData, filter } from "../../../store";
    import isEmpty from "./../../../utils/is-empty";
    import { filterByVolume, filterByPrice } from "./../../../api/filters";

    import coinStore from "$lib/coins-store";

    let coin_lists, tempCategoryCoins;

    if (
        !isEmpty(coinStore) &&
        !isEmpty(coinStore.coins) &&
        !isEmpty(coinStore.categoryCoins)
    ) {
        coin_lists = Object.keys(coinStore.coins).join(",");
        tempCategoryCoins = coinStore.categoryCoins;
    }

    let data = [];

    if (coin_lists) {
        // getMarketsByIds(coin_lists).then((items) => {
        //     data = Object.values(items);
        //     console.log(data.length);
        // });
        data = $markets
    }

    $: if ($markets) {
        advancedData.set($markets);
    }

    const changeFilter = (item) => {
        let filters = { ...$filter, ...item };
        filter.set(filters);
        let list = data.slice(0, filters.top);
        if (!isEmpty(filters.volumes)) {
            list = filterByVolume(filters.volumes, list, "totalVolume");
        }
        if (!isEmpty(filters.marketCap)) {
            list = filterByVolume(filters.marketCap, list, "marketCap");
        }
        if (!isEmpty(filters.priceChange) || !isEmpty(filter.pricePeriod)) {
            let priceFilter = {};
            priceFilter.priceChange = filters.priceChange;
            priceFilter.pricePeriod = filters.pricePeriod;
            list = filterByPrice(priceFilter, list);
        }
        advancedData.set(list);
    };

    let initValues = {
        top_item: "Top 250",
        marketcap_item: "Market Cap",
        volume_item: "Volume",
        liquidity_item: "Liquidity",
        period_item: "Price Period",
        pricechange_item: "Price Change",
    };

    const initValue = () => {
        initValues = {
            top_item: "Top 250",
            marketcap_item: "Market Cap",
            volume_item: "Volume",
            liquidity_item: "Liquidity",
            period_item: "Price Period",
            pricechange_item: "Price Change",
        };
        advancedData.set($markets);
    };
</script>

<div>
    <div class="filter_box">
        <div class="row">
            <div class="col-lg-3 col-sm-12 col-md-6">
                <div class="select_option">
                    <Select
                        items={top_items}
                        value={initValues.top_item}
                        showChevron={true}
                        on:select={(value) =>
                            changeFilter({ top: value.detail.value })}
                    />
                </div>
                <div style="margin-top: 20px" class="select_option">
                    <Select
                        items={marketcap_items}
                        value={initValues.marketcap_item}
                        showChevron={true}
                        on:select={(value) =>
                            changeFilter({ marketCap: value.detail.value })}
                    />
                </div>
            </div>
            <div class="col-lg-3 col-sm-12 col-md-6 middle">
                <div class="select_option">
                    <Select
                        items={volume_items}
                        value={initValues.volume_item}
                        showChevron={true}
                        on:select={(value) =>
                            changeFilter({ volumes: value.detail.value })}
                    />
                </div>

                <div style="margin-top: 20px" class="select_option">
                    <Select
                        items={liquidity_items}
                        value={initValues.liquidity_item}
                        showChevron={true}
                        isDisabled={true}
                        on:select={changeFilter}
                    />
                </div>
            </div>
            <div class="col-lg-3 col-sm-12 col-md-6 last">
                <div class="select_option">
                    <Select
                        items={period_items}
                        value={initValues.period_item}
                        showChevron={true}
                        on:select={(value) =>
                            changeFilter({ pricePeriod: value.detail.value })}
                    />
                </div>
                <div class="select_option" style="margin-top: 20px">
                    <Select
                        items={pricechange_items}
                        value={initValues.pricechange_item}
                        showChevron={true}
                        on:select={(value) =>
                            changeFilter({ priceChange: value.detail.value })}
                    />
                </div>
            </div>
            <div
                class="col-lg-3 col-sm-12 col-md-6 d-flex align-items-end justify-content-end result_content"
            >
                <button
                    class="btn bg-lawrence text-white rounded-4 px-4"
                    disabled
                    ><span class="pe-2">Results:</span><span
                        class="spinner-grow spinner-grow-sm d-none"
                        role="status"
                    /><span class="text-white">{$advancedData.length}</span
                    ></button
                >
                <button
                    class="btn bg-lawrence rounded-4 px-4"
                    on:click={initValue}>Clear</button
                >
            </div>
        </div>
    </div>
    <CoinTable method={"adv"} />
</div>

<style>
    .filter_box {
        margin-top: 40px;
        background-color: #141421;
        padding: 20px;
        border-radius: 12px;
    }

    .select_option {
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
        --disabledBorderColor: rgb(88, 88, 88);
    }

    .filter_box button {
        color: #999;
        width: 140px;
        margin-left: 20px;
        background-color: #0b0b12;
        border-radius: 20px;
        display: flex;
        justify-content: center;
    }

    @media (max-width: 991px) {
        .col-lg-3.col-sm-12.col-md-6.last {
            margin-top: 20px !important;
        }
    }
    @media (max-width: 767px) {
        .col-lg-3.col-sm-12.col-md-6.middle {
            margin-top: 20px !important;
        }
        .result_content{
            margin-top: 20px
        }
    }
</style>
