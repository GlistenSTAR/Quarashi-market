<script>
    //@ts-nocheck
    import isEmpty from "../../../utils/is-empty";
    import TableCard from "./Table-card.svelte";

    import {
        selectTopGainers5,
        selectTopLosers5,
        selectDefiCoins5,
    } from "../../../api/filters";

	import { markets, defi } from "./../../../store";

    export let data = [] || $markets;
    export let defiData = [] || $defi;

    let topGainers, topLosers, tvlGainers;

    if (!isEmpty(data) || !isEmpty(defiData)) {
        topGainers = selectTopGainers5(data);
        topLosers = selectTopLosers5(data);
        tvlGainers = selectDefiCoins5(defiData.coins);
    }
</script>

<div class="spotlight">
    <h3>Spotlight</h3>
    <div class="table-cards">
        <TableCard
            name="Top Gainers"
            data={topGainers}
            method="up"
        />
        <TableCard
            name="Top Losers"
            data={topLosers}
            method="down"
        />
        <TableCard
            name="TVL Change"
            data={tvlGainers}
            method="lock"
        />
    </div>
</div>

<style>
    /* spotlight */
    .spotlight {
        margin-top: 40px;
        width: 100%;
    }

    .spotlight h3 {
        font-size: 24px;
    }

    .table-cards {
        display: flex;
        margin-top: 20px;
        font-size: 12px;
        justify-content: space-around;
    }

    @media (max-width: 1024px) {
        .table-cards {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-width: 410px;
            margin-top: 20px;
            margin-left: 0px;
            margin-right: 0px;
        }
    }
    @media (max-width: 446px) {
        .table-cards{
            min-width: 320px;
        }
    }
</style>
