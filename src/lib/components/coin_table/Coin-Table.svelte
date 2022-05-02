<script>
    // @ts-nocheck
    import Select from "svelte-select";
    import { total_items } from "../../selectData";
    export let data = [];
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
        <!-- <Datatable settings={settings} data={data} bind:dataRows={dataRows}>
            <thead>
                <th>Watchlist</th>
                <th>#</th>
                <th data-key="name">Name</th>
                <th data-key="price">Price</th>
                <th data-key="priceChange24h">24 Hours</th>
                <th data-key="priceChange7d">7 days</th>
                <th data-key="marketCap">Market Cap</th>
                <th data-key="totalVolume" align="right">Volume</th>
            </thead>
            <tbody>
                {#if dataRows}
                    {#each dataRows as row}
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                            <td>{row.priceChange24h}</td>
                            <td>{row.priceChange7d}</td>
                            <td>{row.marketCap}</td>
                            <td>{row.totalVolume}</td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </Datatable> -->
        <!-- <table class="table table-striped">
            <tr class="header">
                <td>Watchlist</td>
                <td>#</td>
                <td>Name</td>
                <td>Price</td>
                <td>24 Hours</td>
                <td>7 days</td>
                <td>Market Cap</td>
                <td align="right">Volume</td>
            </tr>
            <tr>
                <td><i class="far fa-star"></i></td>
                <td>1</td>
                <td>
                    <img
                        src={None}
                        alt="none"
                        width="24"
                        height="24"
                    />
                    XRP
                </td>
                <td>$ 0.613672</td>
                <td>- 1.06 %</td>
                <td>- 1.1 %</td>
                <td>$ 29,403,580,087</td>
                <td align="right">$ 2,267,032,452</td>
            </tr>
            <tr>
                <td><i class="far fa-star"></i></td>
                <td>2</td>
                <td>
                    <img
                        src={None}
                        alt="none"
                        width="24"
                        height="24"
                    />
                    XRP
                </td>
                <td>$ 0.613672</td>
                <td>- 1.06 %</td>
                <td>- 1.1 %</td>
                <td>$ 29,403,580,087</td>
                <td align="right">$ 2,267,032,452</td>
            </tr>
        </table> -->
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
    }

    /* #coin_kind{
        width: 283px;
        height: 48px;
        border-radius: 12px;
        background-color: #0B0B12;
        color: white;
        padding: 15px;
        font-size: 12px;
        border-color: #353535;
        border-width: 1px
    }

    .table{
        margin-top: 40px;
        color: white;
        font-size: 12px;
    }

    .table .header td{
        color: rgb(185, 185, 185)
    }

    td img{
        width: 40px;
        height: 40px;
    }

    td{
        padding-top: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #353535;
    } */
</style>
