<script>
    //@ts-nocheck
    export let markets = [];

    import { ChevronDownIcon, ChevronUpIcon } from "svelte-feather-icons";
    import { currencyFullValue } from "./../../../helpers";
    import { subMarkets } from "./../../../store";

    let isFull = false;
    const changeArrow = () => {
        isFull = !isFull;
    };

    $: isFull ? subMarkets.set(markets) : subMarkets.set(markets.slice(0, 5));
</script>

<div class="mt-4 markets">
    <div class="header">
        <h5>Markets</h5>
        <span style="color: #c921cd" on:click={changeArrow}>
            {#if isFull}
                <ChevronUpIcon size="16" />
            {:else}
                <ChevronDownIcon size="16" />
            {/if}
        </span>
    </div>
    <table class="table table-borderless mb-0 table-striped">
        <thead>
            <tr class="small text-grey">
                <td class="pb-2 pt-2 pe-0">#</td>
                <td class="pb-2 pt-2">Source</td>
                <td class="pb-2 pt-2">Pairs</td>
                <td class="text-end pb-2 pt-2">Price</td>
                <td class="text-end pb-2 pt-2">Volume</td>
            </tr>
        </thead>
        <tbody>
            {#each $subMarkets as data, index}
                <tr key={index}>
                    <td class="small pe-0">{index + 1}</td>
                    <td>
                        <div class="d-flex">
                            {data.name}
                        </div>
                    </td>
                    <td>{data.pair}</td>
                    <td class="text-end">{currencyFullValue(data.price)}</td>
                    <td class="text-end">{currencyFullValue(data.volume)}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .markets {
        background-color: #252933;
        padding: 20px;
        border-radius: 20px;
        font-size: 12px;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(68, 68, 68);
        padding-bottom: 10px;
    }
    table {
        color: rgb(199, 198, 198);
        font-size: 14px;
    }
    table td {
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .table-striped > tbody > tr:nth-of-type(odd) {
        background-color: #343948;
        color: rgb(199, 198, 198);
    }
</style>
