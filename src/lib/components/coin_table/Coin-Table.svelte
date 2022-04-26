<script>
    import None from "./../../../assets/img/coins/none.png";
    import Select from 'svelte-select'
    import {total_items} from './../../filter'
</script>

<div class="coin-table">
    <div>
        <div class="coin_kind col-md-4">
            <Select
                items={total_items}
                value={'Highest Cap'}
                showChevron={true}
            />
        </div>
    </div>
    <div>
        
        <table class="table table table-hover">
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
                <td>*</td>
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
                <td>*</td>
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
        </table>
    </div>
</div>

<style>
    .coin-table {
        margin-top: 40px;
        width: 100%;
        height: 770px;
        background-color: #141421;
        border-radius: 12px;
        padding: 20px;
    }
    .coin_kind {
        --background: #0b0b12;
        --borderRadius: 12px;
        --listBackground: #0b0b12;
        --clearSelectColor: #c921cd;
        --clearSelectFocusColor: #c921cd;
        --inputFontSize: 12px;
        --disabledBackground: #0b0b12;
        --disabledColor: grey;
        --indicatorColor: #c921cd
    }
    .table {
        margin-top: 40px;
        padding: 20px;
        color: white;
        font-size: 12px;
    }

    .table .header td {
        color: rgb(185, 185, 185);
    }

    td img {
        width: 40px;
        height: 40px;
    }

    td {
        padding-top: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #353535;
    }
</style>