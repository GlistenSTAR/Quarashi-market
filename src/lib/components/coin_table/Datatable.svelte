<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Table, { Row, Sort } from "./Table.svelte";
    import { sortNumber, sortString } from "./sorting.js";
    import {
        volume,
        percentageFormat,
        priceColor,
        currencyFullValue,
    } from "./../../../helpers";
    import isEmpty from "./../../../utils/is-empty";
    import { markets } from "./../../../store";
    export let watchlist;

    let rows = [];
    let pageIndex = 0,
        data = $markets,
        pageSize = 50; //inital value

    let oldWatchlist = {};

    onMount(() => {
        data = $markets;
        oldWatchlist = JSON.parse(localStorage.getItem("watchlist"));
        if (watchlist) {
            let filterData = [];
            data.map((item) => {
                if (oldWatchlist[`${item.id}`]) {
                    filterData.push(item);
                }
            });
            rows = filterData;
        } else {
            rows = data;
        }
    });


    function onSortString(event) {
        event.detail.rows = sortString(
            event.detail.rows,
            event.detail.dir,
            event.detail.key
        );
    }

    function onSortNumber(event) {
        event.detail.rows = sortNumber(
            event.detail.rows,
            event.detail.dir,
            event.detail.key
        );
    }

    function setFav(id, event) {
        if (!isEmpty(oldWatchlist)) {
            if (oldWatchlist[`${id}`] === true) {
                event.target.classList.remove("active");
                delete oldWatchlist[`${id}`];
            } else {
                event.target.classList.add("active");
                oldWatchlist[`${id}`] = true;
            }
        } else {
            oldWatchlist = {};
            oldWatchlist[`${id}`] = true;
        }
        let storage = JSON.stringify(oldWatchlist);
        localStorage.setItem("watchlist", storage);
    }
</script>

<Table {rows} {pageIndex} {pageSize} let:rows={rows2}>
    <thead slot="head">
        <tr>
            <th width="1%">Watchlist</th>
            <th width="5%"
                ><Sort key="rank" on:sort={onSortNumber} title="#" /></th
            >
            <th width="20%">
                <Sort key="name" on:sort={onSortString} title="Name" />
            </th>
            <th>
                <Sort key="price" on:sort={onSortNumber} title="Price" />
            </th>
            <th class="text-center">
                <Sort
                    key="priceChange24h"
                    on:sort={onSortNumber}
                    title="24 Hours"
                />
            </th>
            <th class="text-center">
                <Sort
                    key="priceChange7d"
                    on:sort={onSortNumber}
                    title="7 days"
                />
            </th>
            <th>
                <Sort
                    key="marketCap"
                    on:sort={onSortNumber}
                    title="Market Cap"
                />
            </th>
            <th class="text-right">
                <Sort key="totalVolume" on:sort={onSortNumber} title="Volume" />
            </th>
        </tr>
    </thead>
    <tbody>
        {#each rows2 as row, index (row)}
            <Row {index}>
                <td
                    align="center"
                    on:click|preventDefault={(event) => setFav(row.id, event)}
                >
                    {#if oldWatchlist[`${row.id}`]}
                        <i class="far fa-star active" />
                    {:else}
                        <i class="far fa-star" />
                    {/if}
                </td>
                <td>{row.rank}</td>
                <td
                    ><img
                        src={row.image}
                        alt="coin"
                        width="24"
                        height="24"
                    /><span class="ml-5">{row.name}</span></td
                >
                <td>{currencyFullValue(row.price)}</td>
                <td class="{priceColor(row.priceChange24h)} text-center"
                    >{percentageFormat(row.priceChange24h)}</td
                >
                <td class="{priceColor(row.priceChange7d)} text-center"
                    >{percentageFormat(row.priceChange7d)}</td
                >
                <td>$ {volume(row.marketCap)}</td>
                <td align="right">$ {volume(row.totalVolume)}</td>
            </Row>
        {/each}
    </tbody>
</Table>

<style>
    thead {
        color: grey;
        font-size: 12px;
    }
    .bottom {
        margin-top: 40px;
        margin-bottom: 20px;
    }
    td span {
        padding-left: 8px;
    }
    .text-right {
        text-align: right;
        padding-right: 20px;
    }
    i.active {
        color: #c921cd;
    }
</style>
