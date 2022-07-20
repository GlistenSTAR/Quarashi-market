<script>
    // @ts-nocheck
    import { page } from "$app/stores";
    import Select from "svelte-select";
    import { total_items } from "../../selectData";
    import { Datatable, rows } from "$lib/components/SimpleDatatables";
    import isEmpty from "./../../../utils/is-empty";
    import { StarIcon } from "svelte-feather-icons";
    import {
        categoriesData,
        advancedData,
        watchlistData,
        viewAllData,
    } from "./../../../store";

    export let method = "";

    let filter = "",
        data = [],
        selected = "Highest Cap",
        filterData = [];

    // show toplosers and topgainers
    const show_way = $page.url.searchParams.get("table");

    if (!isEmpty(show_way) && show_way == "up") {
        selected = "Top Gainers";
    } else if (!isEmpty(show_way) && show_way == "down") {
        selected = "Top Losers";
    }

    $: if (method == "cat") {
        data = $categoriesData;
    } else if (method == "adv") {
        data = $advancedData;
    } else if (method == "watch") {
        data = $watchlistData;
    } else if (method == "view_all") {
        data = $viewAllData;
    }

    const handleSelect = (e) => {
        filter = e.detail.value;
        if (!isEmpty(data)) {
            if (filter === "lowestCap") {
                filterData = data.sort((a, b) => {
                    return a.marketCap - b.marketCap;
                });
            } else if (filter === "highestCap") {
                filterData = data.sort((b, a) => {
                    return a.marketCap - b.marketCap;
                });
            } else if (filter === "highestVol") {
                filterData = data.sort((b, a) => {
                    return a.totalVolume - b.totalVolume;
                });
            } else if (filter === "lowestVol") {
                filterData = data.sort((a, b) => {
                    return a.totalVolume - b.totalVolume;
                });
            }
            if (filter === "lowestPrice") {
                filterData = data.sort((a, b) => {
                    return a.price - b.price;
                });
            } else if (filter === "highestPrice") {
                filterData = data.sort((b, a) => {
                    return a.price - b.price;
                });
            } else if (filter === "topGainer") {
                filterData = data.sort((b, a) => {
                    return a.priceChange24h - b.priceChange24h;
                });
            } else if (filter === "topLoser") {
                filterData = data.sort((a, b) => {
                    return a.priceChange24h - b.priceChange24h;
                });
            }

            if (method == "cat") {
                categoriesData.set(filterData);
            } else if (method == "adv") {
                advancedData.set(filterData);
            } else if (method == "watch") {
                watchlistData.set(filterData);
            }
        }
    };

    const settings = {
        pagination: true,
        rowsPerPage: 50,
        columnFilter: false,
        searchInput: false,
        sortable: true,
        screenX: false,
        labels: {
            noRows: "No entries to found",
            previous: "<",
            next: ">",
        },
        blocks: {
            searchInput: false,
            paginationRowCount: false,
        },
    };

    import {
        volume,
        percentageFormat,
        priceColor,
        currencyFullValue,
    } from "./../../../helpers";

    let oldWatchlist = JSON.parse(localStorage.getItem("watchlist"));

    const data1 = $categoriesData.slice(0, 70);
    const goCoindetail = (id) => {
        window.location = "/coins?id=" + id;
    };

    const setFav = (id, event) => {
        // if (!isEmpty(oldWatchlist)) {
        //     if (oldWatchlist[`${id}`] === true) {
        //         event.target.classList.remove("active");
        //         delete oldWatchlist[`${id}`];
        //     } else {
        //         event.target.classList.add("active");
        //         oldWatchlist[`${id}`] = true;
        //     }
        // } else {
        //     oldWatchlist = {};
        //     oldWatchlist[`${id}`] = true;
        // }
        // let changedData = [];
        // $markets.map((item) => {
        //     if (oldWatchlist[`${item.id}`]) {
        //         changedData.push(item);
        //     }
        // });
        // localStorage.setItem("watchlist", JSON.stringify(oldWatchlist));
        // watchlistData.set(changedData);
        // watchlist.set(oldWatchlist);
    };
</script>

<div class="coin-table">
    {#if data.length == 0}
        <div class="empty_table">
            {#if method === "watch"}
                <div>
                    <StarIcon size="32" />
                </div>
                <div class="text-center mt-2">
                    You don’t have any favorite assets.<br /> You can add the favourites
                    by click to star icon in the asset page
                </div>
            {:else}
                <div><h3>No result</h3></div>
            {/if}
        </div>
    {:else}
        <div>
            <div class="coin_kind col-md-4 mb-4">
                <Select
                    items={total_items}
                    value={selected}
                    showChevron={true}
                    on:select={handleSelect}
                />
            </div>
        </div>
        <div class="table-res">
            <Datatable {settings} data={data1}>
                <thead>
                    <th>Watchlist</th>
                    <th data-key="rank" width="7%">#</th>
                    <th data-key="name" class="text-left">Name</th>
                    <th data-key="price" class="text-left">Price</th>
                    <th data-key="priceChange24h" class="text-center"
                        >24 Hours</th
                    >
                    <th data-key="priceChange7d" class="text-center"
                        >7 days</th
                    >
                    <th data-key="marketCap" class="text-left">Market Cap</th>
                    <th data-key="totalVolume" class="text-right">Volume</th>
                </thead>
                <tbody>
                    {#each $rows as row}
                        <tr>
                            <td
                                class="text-center"
                                on:click|preventDefault={(event) =>
                                    setFav(row.id, event)}
                            >
                                {#if oldWatchlist && oldWatchlist[`${row.id}`]}
                                    <StarIcon class="active" size="16" />
                                {:else}
                                    <StarIcon size="16" />
                                {/if}
                            </td>
                            <td class="text-center"
                                >{row.rank ? row.rank : ""}</td
                            >
                            <td
                                on:click={goCoindetail(row.id)}
                                style="cursor: pointer;"
                                ><img
                                    src={row.image}
                                    alt="coin"
                                    width="24"
                                    height="24"
                                /><span class="name_padding">{row.name}</span
                                ></td
                            >
                            <td>{currencyFullValue(row.price)}</td>
                            <td
                                class="{priceColor(
                                    row.priceChange24h
                                )} text-center"
                                >{row.priceChange24h
                                    ? percentageFormat(row.priceChange24h)
                                    : 0}</td
                            >
                            <td
                                class="{priceColor(
                                    row.priceChange7d
                                )} text-center"
                                >{row.priceChange7d
                                    ? percentageFormat(row.priceChange7d)
                                    : 0}</td
                            >
                            <td>$ {volume(row.marketCap)}</td>
                            <td class="text-right">$ {volume(row.totalVolume)}</td>
                        </tr>
                    {/each}
                </tbody>
            </Datatable>
            <!-- <Datatable {method} /> -->
        </div>
    {/if}
</div>

<style>
    .coin_kind {
        --background: #0b0b12;
        --borderRadius: 12px;
        --border: 1px solid rgb(88, 88, 88);
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
        padding-bottom: 40px;
    }
    .empty_table {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: grey;
    }
    @media (max-width: 830px) {
        .table-res {
            overflow-x: auto;
        }
    }

    thead {
        border-radius: 1px solid grey;
        background-color: #141421;
    }
    th {
        text-align: left;
        font-size: 12px;
        color: grey;
        cursor: pointer;
    }
    td {
        text-align: left;
        padding: 4px 0;
    }
    .name_padding {
        margin-left: 10px;
    }

    th.text-left {
        text-align: left !important;
    }
    th.text-right, td.text-right {
        text-align: right !important;
    }
</style>
