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

    import { markets } from "../../../store";
</script>

<div>
    <div class="filter_box">
        <div class="row">
            <div class="col-lg-3 col-sm-12 col-md-6">
                <div class="select_option">
                    <Select
                        items={top_items}
                        value={"Top 250"}
                        showChevron={true}
                    />
                </div>
                <div style="margin-top: 20px" class="select_option">
                    <Select
                        items={marketcap_items}
                        value={"Market Cap"}
                        showChevron={true}
                    />
                </div>
            </div>
            <div class="col-lg-3 col-sm-12 col-md-6 middle">
                <div class="select_option">
                    <Select
                        items={volume_items}
                        value={"Volume"}
                        showChevron={true}
                    />
                </div>

                <div style="margin-top: 20px" class="select_option">
                    <Select
                        items={liquidity_items}
                        value={"Liquidity"}
                        showChevron={true}
                        isDisabled={true}
                    />
                </div>
            </div>
            <div class="col-lg-3 col-sm-12 col-md-6 last">
                <div class="select_option">
                    <Select
                        items={period_items}
                        value={"Price Period"}
                        showChevron={true}
                    />
                </div>
                <div class="select_option" style="margin-top: 20px">
                    <Select
                        items={pricechange_items}
                        value={"Price Change"}
                        showChevron={true}
                    />
                </div>
            </div>
            <div
                class="col-lg-3 col-sm-12 col-md-6 d-flex align-items-end justify-content-end"
            >
                <button
                    class="btn bg-lawrence text-white rounded-4 px-4"
                    disabled
                    ><span class="pe-2">Results:</span><span
                        class="spinner-grow spinner-grow-sm d-none"
                        role="status"
                    /><span class="text-white">{$markets.length}</span></button
                >
            </div>
        </div>
    </div>
    <CoinTable watchlist={false}/>
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
        --disabledBorderColor: rgb(88, 88, 88)
    }

    @media (max-width: 991px){
        .col-lg-3.col-sm-12.col-md-6.last{
            margin-top: 20px!important;
        }
    }
    @media (max-width: 767px){
        .col-lg-3.col-sm-12.col-md-6.middle{
            margin-top: 20px!important;
        }
    }
</style>
