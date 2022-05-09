<script>
    //@ts-nocheck
    export let name = "";
    export let method = "";
    export let icon = "";
    export let data = [];
    import { currencyFormat, percentageFormat } from "./../../../helpers";
    import { ArrowUpIcon, ArrowDownIcon,  LockIcon} from 'svelte-feather-icons'
</script>

<div class="table-card">
    <div class="card-hearder">
        <div style="display: flex; align-items: center;">
            {#if method == "up"}
                <ArrowUpIcon size="16" class="i up"/>
            {:else if method == "down"}
                <ArrowDownIcon size="16" class="i down"/>
            {:else}
                <LockIcon size="16" class="i lock"/>
            {/if}
            <span style="margin-left: 12px;">{name}</span>
        </div>
        <div class="see_all">See All</div>
    </div>
    <table class="table table-striped {method}">
        <tr>
            <th width="5%">#</th>
            <th width="50%" style="padding-left: 10px">Name</th>
            <th width="22%" class="price"> Price </th>
            <th width="22%" class="percent">24Hours</th>
        </tr>
        {#if name != "TVL Change"}
            {#each data as item, key}
                <tr>
                    <td>{key + 1}</td>
                    <td class="text-uppercase">
                        <img
                            src={item.image}
                            alt="coin"
                            width="40"
                            height="40"
                        />
                        <span>{item.symbol}</span>
                    </td>
                    <td class="price">{currencyFormat(item.price)}</td>
                    <td class="percent"
                        >{percentageFormat(item.priceChange24h)}</td
                    >
                </tr>
            {/each}
        {:else if (name = "TVL Change")}
            {#each data as item, key}
                <tr>
                    <td>{key + 1}</td>
                    <td class="text-uppercase">
                        <img
                            src={item.image}
                            alt="coin"
                            width="40"
                            height="40"
                        />
                        {item.symbol}
                    </td>
                    <td class="price">{currencyFormat(item.tvl)}</td>
                    <td class="percent"
                        >{percentageFormat(item.priceChange24h)}</td
                    >
                </tr>
            {/each}
        {/if}
    </table>
</div>

<style>
    .table-card {
        display: flex;
        width: 100%;
        height: 390px;
        background: #141421;
        margin-left: 9px;
        margin-right: 9px;
        border-radius: 12px;
        padding: 20px;
        padding-bottom: 5px;
        flex-direction: column;
    }

    .table-card .card-hearder {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .see_all {
        color: #c921cd;
    }

    table {
        width: 100%;
        text-align: left;
        height: 100%;
        color: white;
        margin-top: 20px;
        margin-bottom: 0px;
    }

    table .price {
        text-align: center;
    }
    table .percent {
        text-align: right;
    }
    table.up td.percent {
        color: #00a478;
    }
    table.down td.percent {
        color: #d50012;
    }
    table.lock td.percent {
        color: #00a478;
    }

    table tr {
        padding: 16px !important;
        max-height: 57px;
    }
    table th {
        color: rgb(185, 185, 185);
    }

    @media (max-width: 1024px) {
        .table-card {
            width: 100%;
            margin-top: 20px;
            margin-left: 0px;
            margin-right: 0px;
            min-width: 410px;
        }
    }
</style>
