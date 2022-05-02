<script>
    // @ts-nocheck
    import Select from "svelte-select";
    import { total_items } from "../../selectData";
    import Datatable from "./Datatable.svelte";
    export let data = [];
    export let watchlist;
</script>

<div class="coin-table">
    <div>
        <div class="coin_kind col-md-4">
            <Select
                items={total_items}
                value={"Highest Cap"}
                showChevron={true}
            />
        </div>
    </div>
    <div>
        <Datatable {data} {watchlist}/>
    </div>
</div>

<style>
    .coin_kind {
        --background: #0b0b12;
        --borderRadius: 12px;
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
    }
</style>
