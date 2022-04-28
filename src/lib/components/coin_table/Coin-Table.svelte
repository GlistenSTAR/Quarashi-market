<script>
    import None from "./../../../assets/img/coins/none.png";
    import Select from "svelte-select";
    import { total_items } from "./../../filter";

    import { Datatable } from "svelte-simple-datatables";
    let data = [
        {
            id: 1,
            first_name: "Tobie",
            last_name: "Vint",
            email: "tvint0@fotki.com",
        },
        {
            id: 2,
            first_name: "Zacharias",
            last_name: "Cerman",
            email: "zcerman1@sciencedirect.com",
        },
        {
            id: 3,
            first_name: "Gerianna",
            last_name: "Bunn",
            email: "gbunn2@foxnews.com",
        },
        {
            id: 4,
            first_name: "Bee",
            last_name: "Saurin",
            email: "bsaurin3@live.com",
        },
        {
            id: 5,
            first_name: "Meyer",
            last_name: "Garnul",
            email: "mgarnul4@yellowbook.com",
        },
    ];
    
    const settings = {
        // columnFilter: true,
        blocks: {
            searchInput: false,
        },
    };

    let rows;
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
        <!-- <Datatable
            {data}
            {settings}
            bind:dataRows={rows}
            id={'table'}
        >
            <tr class="header">
                <td data-key="first_name">First Name</td>
                <td data-key="last_name">Last Name</td>
                <td data-key="email">Email</td>
            </tr>
            <tr>
                {#if rows}
                    {#each $rows as row}
                        <tr>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>{row.email}</td>
                        </tr>
                    {/each}
                {/if}
            </tr>
        </Datatable> -->
        <table class="table table-striped">
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
        </table>
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
        --itemHoverBG: #007AFF
    }
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
        /* padding: 20px; */
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
