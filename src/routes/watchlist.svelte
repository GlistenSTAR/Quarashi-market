<script>
    import None from '../assets/img/coins/none.png'
</script>

<svelte:head>
	<title>Markets-Watchlist</title>
</svelte:head>

<div>
    <h1>
        Watchlist
    </h1>
    <div class="coin-table">
        <div>
            <select name="coin_kind" id="coin_kind">
                <option>Highest Cap</option>
                <option>Lowest Cap</option>
                <option>Highest Volume</option>
                <option>Lowest Volume</option>
                <option>Highest Price</option>
                <option>Lowest Price</option>
                <option>Top Gainers</option>
                <option>Top Losers</option>
            </select>
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
                    <td style="text-align: right">Volume</td>
                </tr>
                <tr>
                    <td>*</td>
                    <td>1</td>
                    <td>
                        <img src={None} alt="none" width="24" height="24"/>
                        XRP
                    </td>
                    <td>$ 0.613672</td>
                    <td>- 1.06 %</td>
                    <td>- 1.1 %</td>
                    <td>$ 29,403,580,087</td>
                    <td style="text-align: right">$ 2,267,032,452</td>
                </tr>
                <tr>
                    <td>*</td>
                    <td>2</td>
                    <td>
                        <img src={None} alt="none" width="24" height="24"/>
                        XRP
                    </td>
                    <td>$ 0.613672</td>
                    <td>- 1.06 %</td>
                    <td>- 1.1 %</td>
                    <td>$ 29,403,580,087</td>
                    <td style="text-align: right">$ 2,267,032,452</td>
                </tr>
            </table>
        </div>
    </div>
</div>

<style>
    .coin-table{
        margin-top: 40px;
        width: 100%;
        height: 770px;
        background-color: #141421;
        border-radius: 12px;
        padding: 20px
    }

    #coin_kind{
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
        padding: 20px;
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
    }
</style>
