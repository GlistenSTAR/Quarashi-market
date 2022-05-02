<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Table, { Pagination, Row, Sort } from "./Table.svelte";
    import { sortNumber, sortString } from "./sorting.js";
    import {
        volume,
        percentageFormat,
        priceColor,
        currencyFullValue,
    } from "./../../../helpers";

    export let data = [];

    let rows = [];
    let page = 0,
        pageIndex = 0,
        pageSize = 50; //inital value

    let loading = true;
    let rowsCount = 0;
    let text;
    let sorting;

    onMount(() => {
        load(page);
    });

    async function load(_page) {
        loading = true;
        const data1 = await getData(_page, pageSize, text, sorting);
        rows = data1.rows;
        rowsCount = data1.rowsCount;
        loading = false;
    }

    function getData(page, pageSize, text, sorting) {
        let originalData = data;

        if (sorting) {
            if (sorting.key === "rank") {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            } else {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            }
            if (sorting.key === "price") {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            } else {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            }
            if (sorting.key === "priceChange24h") {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            } else {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            }
            if (sorting.key === "name") {
                originalData = sortString(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            } else {
                originalData = sortString(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            }
            if (sorting.key === "marketCap") {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            } else {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            }
            if (sorting.key === "priceChange7d") {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            } else {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            }
            if (sorting.key === "totalVolume") {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            } else {
                originalData = sortNumber(
                    originalData,
                    sorting.dir,
                    sorting.key
                );
            }
        }

        return new Promise((resolve, reject) => {
            setTimeout(function () {
                let rowsCount = originalData.length;
                const originalRows = data;
                let rows = [];

                if (text && text.length > 0) {
                    for (let i in originalRows) {
                        for (let j in originalRows[i]) {
                            if (
                                originalRows[i][j]
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(text) > -1
                            ) {
                                rows.push(originalRows[i]);
                                break;
                            }
                        }
                    }

                    rowsCount = rows.length;
                } else {
                    rows = originalRows;
                }

                resolve({
                    rows: rows.slice(0, pageSize),
                    rowsCount: rowsCount - 1,
                });
            }, 500);
        });
    }

    function onPageChange(event) {
        load(event.detail.page);
        page = event.detail.page;
    }

    async function onSort(event) {
        sorting = { dir: event.detail.dir, key: event.detail.key };
        await load(page);
    }
</script>

<Table {loading} {rows} {pageIndex} {pageSize} let:rows={rows2}>
    <thead slot="head">
        <tr>
            <th width="1%">Watchlist</th>
            <th width="5%"><Sort key="rank" on:sort={onSort} title="#" /></th>
            <th width="20%">
                <Sort key="name" on:sort={onSort} title="Name" />
            </th>
            <th>
                <Sort key="price" on:sort={onSort} title="Price" />
            </th>
            <th class="text-center">
                <Sort key="priceChange24h" on:sort={onSort} title="24 Hours" />
            </th>
            <th class="text-center">
                <Sort key="priceChange7d" on:sort={onSort} title="7 days" />
            </th>
            <th>
                <Sort key="marketCap" on:sort={onSort} title="Market Cap" />
            </th>
            <th class="text-right">
                <Sort key="totalVolume" on:sort={onSort} title="Volume" />
            </th>
        </tr>
    </thead>
    <tbody>
        {#each rows2 as row, index (row)}
            <Row {index}>
                <td align="center"><i class="far fa-star" /></td>
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
    <div slot="bottom" class="bottom">
        <Pagination
            {page}
            {pageSize}
            count={rowsCount}
            serverSide={true}
            on:pageChange={onPageChange}
        />
    </div>
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
