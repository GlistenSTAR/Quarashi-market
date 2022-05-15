<script>
    // @ts-nocheck
    import Table, { Row, Sort } from "./Table.svelte";
    import { page } from "$app/stores";
    import { sortNumber, sortString } from "./sorting.js";
    import isEmpty from "./../../../utils/is-empty";
    import {
        volume,
        percentageFormat,
        priceColor,
        currencyFullValue,
    } from "./../../../helpers";

    import { markets, watchlist, chartTableData, defiDominance, defi } from "./../../../store";
    import { StarIcon } from "svelte-feather-icons";

    export let method = "";

    let rows = [];
    let pageIndex = 0,
        pageSize = 50;
    let oldWatchlist;

    const onSortString = (event) => {
        event.detail.rows = sortString(
            event.detail.rows,
            event.detail.dir,
            event.detail.key
        );
    };

    const onSortNumber = (event) => {
        event.detail.rows = sortNumber(
            event.detail.rows,
            event.detail.dir,
            event.detail.key
        );
    };

    const chart_way = $page.url.searchParams.get("chart");

    $: if (!isEmpty(chart_way) && !isEmpty($chartTableData)) {
        if (chart_way == "volume") {
            rows = $chartTableData.sort((b, a) => {
                return a.totalVolume - b.totalVolume;
            });
        } else if (chart_way == "dominance") {
            rows = $chartTableData.sort((b, a) => {
                return a.marketCap - b.marketCap;
            });
        } else if (chart_way == "defimarket") {
            rows = $defiDominance;
        } else if (chart_way == "tvl") {
            rows = $defi.coins;
        }
    }

    $: if ($watchlist) {
        oldWatchlist = $watchlist;
    }

    const setFav = (id, event) => {
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
        let changedData = [];
        $markets.map((item) => {
            if (oldWatchlist[`${item.id}`]) {
                changedData.push(item);
            }
        });
        localStorage.setItem("watchlist", JSON.stringify(oldWatchlist));
        watchlist.set(oldWatchlist);
    };

    const goCoindetail = (id) => {
        window.location = "/coins?id=" + id;
    };

    $: console.log('rows', rows)
</script>

{#if chart_way == "defimarket"}
<Table {rows} {pageIndex} {pageSize} let:rows={rows2}>
    <thead slot="head">
        <tr>
            <th width="1%">Watchlist</th>
            <th width="5%"
                ><Sort key="market_cap_rank" on:sort={onSortNumber} title="#" /></th
            >
            <th width="25%">
                <Sort key="name" on:sort={onSortString} title="Name" />
            </th>
            <th>
                <Sort key="current_price" on:sort={onSortNumber} title="Price" />
            </th>
            <th class="text-center">
                <Sort
                    key="price_change_percentage_24h"
                    on:sort={onSortNumber}
                    title="24 Hours"
                />
            </th>
            <th class="text-center">
                <Sort
                    key="price_change_percentage_7d_in_currency"
                    on:sort={onSortNumber}
                    title="7 days"
                />
            </th>
            <th>
                <Sort
                    key="market_cap"
                    on:sort={onSortNumber}
                    title="Market Cap"
                />
            </th>
            <th class="text-right">
                <Sort key="total_volume" on:sort={onSortNumber} title="Volume" />
            </th>
        </tr>
    </thead>
    <tbody>
        {#each rows2 as row, index (row)}
            <Row index={method + index}>
                <td
                    align="center"
                    on:click|preventDefault={(event) => setFav(row.id, event)}
                >
                    {#if oldWatchlist && oldWatchlist[`${row.id}`]}
                        <StarIcon class="active" size="16" />
                    {:else}
                        <StarIcon size="16" />
                    {/if}
                </td>
                <td>{row.market_cap_rank}</td>
                <td on:click={goCoindetail(row.id)} style="cursor: pointer;"
                    ><img
                        src={row.image}
                        alt="coin"
                        width="24"
                        height="24"
                    /><span class="ml-5">{row.name}</span></td
                >
                <td>{currencyFullValue(row.current_price)}</td><td
                    class="{priceColor(row.price_change_percentage_24h)} text-center"
                    >{percentageFormat(row.price_change_percentage_24h)}</td
                >
                <td class="{priceColor(row.price_change_percentage_7d_in_currency)} text-center"
                    >{percentageFormat(row.price_change_percentage_7d_in_currency)}</td
                >
                <td>$ {volume(row.market_cap)}</td>
                <td align="right">$ {volume(row.total_volume)}</td>
            </Row>
        {/each}
    </tbody>
</Table>
{:else if chart_way == "tvl"}
<Table {rows} {pageIndex} {pageSize} let:rows={rows2}>
    <thead slot="head">
        <tr>
            <th width="1%">Watchlist</th>
            <th width="5%"
                ><Sort key="rank" on:sort={onSortNumber} title="#" /></th
            >
            <th width="25%">
                <Sort key="name" on:sort={onSortString} title="Name" />
            </th>
            <th>
                <Sort key="chain" on:sort={onSortString} title="Chain" />
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
            <th class="text-right">
                <Sort key="tvl" on:sort={onSortNumber} title="TVL" />
            </th>
        </tr>
    </thead>
    <tbody>
        {#each rows2 as row, index (row)}
            <Row index={method + index}>
                <td
                    align="center"
                    on:click|preventDefault={(event) => setFav(row.id, event)}
                >
                    {#if oldWatchlist && oldWatchlist[`${row.id}`]}
                        <StarIcon class="active" size="16" />
                    {:else}
                        <StarIcon size="16" />
                    {/if}
                </td>
                <td>{row.rank}</td>
                <td on:click={goCoindetail(row.id)} style="cursor: pointer;"
                    ><img
                        src={row.image}
                        alt="coin"
                        width="24"
                        height="24"
                    /><span class="ml-5">{row.name}</span></td
                >
                <td style="text-transform:capitalize;">{row.chain}</td><td
                    class="{priceColor(row.priceChange24h)} text-center"
                    >{percentageFormat(row.priceChange24h)}</td
                >
                <td class="{priceColor(row.priceChange7d)} text-center"
                    >{percentageFormat(row.priceChange7d)}</td
                >
                <td align="right">$ {volume(row.tvl)}</td>
            </Row>
        {/each}
    </tbody>
</Table>
{:else}
<Table {rows} {pageIndex} {pageSize} let:rows={rows2}>
    <thead slot="head">
        <tr>
            <th width="1%">Watchlist</th>
            <th width="5%"
                ><Sort key="rank" on:sort={onSortNumber} title="#" /></th
            >
            <th width="25%">
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
            <Row index={method + index}>
                <td
                    align="center"
                    on:click|preventDefault={(event) => setFav(row.id, event)}
                >
                    {#if oldWatchlist && oldWatchlist[`${row.id}`]}
                        <StarIcon class="active" size="16" />
                    {:else}
                        <StarIcon size="16" />
                    {/if}
                </td>
                <td>{row.rank}</td>
                <td on:click={goCoindetail(row.id)} style="cursor: pointer;"
                    ><img
                        src={row.image}
                        alt="coin"
                        width="24"
                        height="24"
                    /><span class="ml-5">{row.name}</span></td
                >
                <td>{currencyFullValue(row.price)}</td><td
                    class="{priceColor(row.priceChange24h)} text-center"
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
{/if}

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
</style>