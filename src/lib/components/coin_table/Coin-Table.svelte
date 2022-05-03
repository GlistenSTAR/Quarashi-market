<script>
    // @ts-nocheck
    import Select from "svelte-select";
    import { total_items } from "../../selectData";
    import Datatable from "./Datatable.svelte";
    
    export let watchlist;
    import { markets } from "./../../../store";

    let filter = "";
    let newData = [];
    let selected = "Highest Cap";
    
    const handleSelect = (e) => {
        filter = e.detail.value;
        if (filter === "lowestCap") {
            newData = $markets.sort((a, b) => {
                return a.marketCap - b.marketCap;
            });
        } else if (filter === "highestCap") {
            newData = $markets.sort((b, a) => {
                return a.marketCap - b.marketCap;
            });
        }
        markets.set(newData);
    };

</script>

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
    <div>
        <Datatable {watchlist} />
    </div>
</div>

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
    @media (max-width: 830px){
        .coin-table {
            overflow-x: auto;
        }
    }
</style>
