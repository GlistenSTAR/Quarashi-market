<script>
    // @ts-nocheck
    import Table, { Row, Sort } from "./Table.svelte";
    import { sortNumber, sortString } from "./sorting.js";
    import isEmpty from "./../../../utils/is-empty";
    import {
        volume,
        percentageFormat,
        priceColor,
        currencyFullValue,
    } from "./../../../helpers";

    import {
        markets,
        watchlist,
        watchlistData,
        categoriesData,
        advancedData,
        flag,
        viewAllData,
    } from "./../../../store";
    import coinStore from "$lib/coins-store";
    import { StarIcon } from "svelte-feather-icons";
    import { getMarketsByIds } from "../../../api";

    export let method = "";

    let rows = [];
    let pageIndex = 0,
        pageSize = 50,
        coin_lists,
        tempCategoryCoins = [],
        cat_tab_data = [];
    let oldWatchlist = JSON.parse(localStorage.getItem("watchlist"));

    $: if (
        !isEmpty(coinStore) &&
        !isEmpty(coinStore.coins) &&
        !isEmpty(coinStore.categoryCoins)
    ) {
        coin_lists = Object.keys(coinStore.coins).join(",");
        tempCategoryCoins = coinStore.categoryCoins;
    }

    $: if (!isEmpty($flag) && !isEmpty(coin_lists)) {
        getMarketsByIds(coin_lists).then((items) => {
            if (tempCategoryCoins[$flag] && items) {
                cat_tab_data = tempCategoryCoins[$flag]
                    .map((coin) => items[coin.coingeckoId])
                    .filter((item) => item != null)
                    .sort((a, b) => {
                        return a.rank - b.rank;
                    });
            }
        });
    }

    $: if (method == "cat") {
        if (!isEmpty($flag) && !isEmpty(coin_lists)) {
            if (cat_tab_data) {
                categoriesData.set(cat_tab_data);
                rows = $categoriesData;
            }

            let reset = [];

            if (!isEmpty($markets)) {
                $markets.map((item) => {
                    reset.push(item);
                });
                categoriesData.set(reset);
            }
        } else {
            rows = $categoriesData;
        }
    }
    $: if (method == "adv") {
        rows = $advancedData;
    } else if (method == "watch") {
        rows = $watchlistData;
    } else if (method == "view_all") {
        rows = $viewAllData;
    }

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
        watchlistData.set(changedData);
        watchlist.set(oldWatchlist);
    };

    const goCoindetail = (id) => {
        window.location = "/coins?id=" + id;
    };
</script>

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
                <td>{row.rank ? row.rank : ""}</td>
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
                    >{row.priceChange24h
                        ? percentageFormat(row.priceChange24h)
                        : 0}</td
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
</style>
