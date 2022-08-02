<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    import { createChart } from "lightweight-charts/dist/lightweight-charts.esm.development";

    export let points = [];
    export let change;
    export let id = "";
    export let size = "";

    let options = {};

    $: if (size == "large") {
        options = {
            handleScale: true,
            handleScroll: true,
            layout: {
                backgroundColor: "transparent",
                textColor: "#808085",
            },
            rightPriceScale: {
                visible: true,
            },
            timeScale: {
                barSpacing: 12,
                visible: true,
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
        };
    } else if (size == "small") {
        options = {
            handleScale: true,
            handleScroll: true,
            layout: {
                backgroundColor: "transparent",
                textColor: "#808085",
            },
            rightPriceScale: {
                visible: false,
            },
            timeScale: {
                visible: false,
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
        };
    } else if (size == "medium") {
        options = {
            handleScale: true,
            handleScroll: true,
            layout: {
                backgroundColor: "transparent",
                textColor: "#808085",
            },
            rightPriceScale: {
                visible: true,
            },
            timeScale: {
                barSpacing: 12,
                visible: true,
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
        };
    }

    onMount(() => {
        let topColor, bottomColor, lineColor;

        const chart = createChart(document.getElementById(`${id}`), options);

        if (change >= 0) {
            topColor = "rgba(33, 150, 243, 0.56)";
            bottomColor = "rgba(33, 150, 243, 0.04)";
            lineColor = "rgba(33, 150, 243, 1)";
        } else {
            topColor = "rgba(175,35,111,0.29)";
            bottomColor = "rgba(116,19,214,0)";
            lineColor = "#ED402E";
        }

        const lineSeries = chart.addAreaSeries({
            topColor,
            bottomColor,
            lineColor,
            lineWidth: 1,
        });

        console.log("points", points);
        lineSeries.setData(points);
    });
</script>

{#if size == "large"}
    <div {id} class="chart_area large" />
{:else if size == "small"}
    <div {id} class="chart_area" />
{:else if size == "medium"}
    <div {id} class="chart_area medium" />
{/if}

<style>
    .chart_area {
        height: 50px !important;
        width: 140px !important;
        position: absolute;
        bottom: 25px;
        right: 30px;
        z-index: 1;
    }

    .large.chart_area {
        height: 400px !important;
        width: 100% !important;
        position: relative;
        background-color: #141421;
        border-radius: 12px;
        z-index: 1;
        margin-left: 20px;
    }

    .medium.chart_area {
        height: 400px !important;
        width: 100% !important;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 991px) {
        .large.chart_area {
            margin-left: 30px;
        }
    }
    @media (max-width: 425px) {
        .large.chart_area {
            margin-left: 0px;
            width: 100% !important;
            right: inherit;
        }
    }
</style>
