<script context="module">
    //@ts-nocheck
    import Pagination, {
        setLabels as _setPaginationLabels,
    } from "./Pagination.svelte";
    import Row from "./Row.svelte";
    import Sort, { setLabels as _setSortLabels } from "./Sort.svelte";
    export { Pagination, Row, Sort };

    let globalLabels;

    export function setTableLabels(labels) {
        globalLabels = labels;
    }

    export const setPaginationLabels = _setPaginationLabels;
    export const setSortLabels = _setSortLabels;
</script>

<script>
    import { createEventDispatcher, setContext } from "svelte";
    const dispatch = createEventDispatcher();

    export let loading = false;
    export let page = 0;
    export let pageIndex = 0;
    export let pageSize = 10;
    export let responsive = false;
    export let rows;
    export let serverSide = false;
    export let labels = {
        empty: "",
        loading: "Loading data...",
        ...globalLabels,
    };

    let buttons = [-2, -1, 0, 1, 2];
    let pageCount = 0;

    $: filteredRows = rows;
    $: visibleRows = filteredRows.slice(pageIndex, pageIndex + pageSize);

    setContext("state", {
        getState: () => ({
            page,
            pageIndex,
            pageSize,
            rows,
            filteredRows,
        }),
        setPage: (_page, _pageIndex) => {
            page = _page;
            pageIndex = _pageIndex;
        },
        setRows: (_rows) => (filteredRows = _rows),
    });

    function onPageChange(event) {
        dispatch("pageChange", event.detail);
    }
</script>

<table class={"table " + $$props.class} class:responsive>
    <slot name="head" />
    {#if loading}
        <tbody>
            <tr>
                <td
                    class="center"
                    colspan="100%"
                    style="height: 100px;border: none; color: #C921CD"
                >
                    <span>
                        {@html labels.loading}
                    </span>
                </td>
            </tr>
        </tbody>
    {:else if visibleRows.length === 0}
        <tbody>
            <tr>
                <td
                    class="center"
                    colspan="100%"
                    style="height: 100px;border: none; color: #C921CD"
                >
                    <span>
                        {@html labels.empty}
                    </span>
                </td>
            </tr>
        </tbody>
    {:else}
        <slot rows={visibleRows} />
    {/if}
    <slot name="foot" />
</table>

{#if rows.length != 0 && rows.length > 50}
    <slot name="bottom">
        <div class="slot-bottom">
            <svelte:component
                this={Pagination}
                {page}
                {pageSize}
                {serverSide}
                count={filteredRows.length - 1}
                on:pageChange={onPageChange}
            />
        </div>
    </slot>
{/if}

<style>
    .table {
        width: 100%;
        border-collapse: collapse;
        color: white;
        margin-top: 40px;
    }

    .table :global(th) {
        position: relative;
    }

    .table :global(td) {
        padding-top: 16px;
        padding-bottom: 16px;
    }

    .center {
        text-align: center;
        font-style: italic;
    }

    .center > span {
        padding: 10px 10px;
        float: left;
        width: 100%;
    }

    .slot-top,
    .slot-bottom {
        float: left;
        width: 100%;
        margin-top: 1em;
    }

    @media screen and (max-width: 830px) {
        .table {
            min-width: 830px;
            overflow-x: auto;
        }
    }
</style>
