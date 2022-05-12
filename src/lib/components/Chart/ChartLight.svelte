<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    import { createChart } from "lightweight-charts/dist/lightweight-charts.esm.development";

    export let points = [];
    export let change;
    export let id = "";
    // export let size = "";

    onMount(() => {
        let topColor, bottomColor, lineColor;
        const chart = createChart(document.getElementById(`${id}`), {
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
        });

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

        lineSeries.setData(points);
    });
</script>

<div {id} class="chart_area" />

<style>
    .chart_area {
        height: 50px !important;
        width: 140px !important;
        position: absolute;
        bottom: 25px;
        right: 30px;
        z-index: -1;
    }
</style>
