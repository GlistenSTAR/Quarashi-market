<script>
    //@ts-nocheck
    import { onMount } from "svelte";

    export let symbol = "";
    export let datafeed = {};
    let interval = "30";
    onMount(() => {
        const widget = new window.TradingView.widget({
            symbol,
            datafeed,
            interval,
            container_id: "chart",
            library_path: "/charting_library/",
            charts_storage_url: "https://saveload.tradingview.com",
            charts_storage_api_version: "1.1",
            client_id: "tradingview.com",
            user_id: "public_user_id",
            autosize: true,
            theme: "dark",
            enabled_features: [],
            disabled_features: [
                "header_symbol_search",
                "header_saveload",
                "header_compare",
                "header_indicators",
                "display_market_status",
                "go_to_date",
                "left_toolbar",
                "use_localstorage_for_settings",
            ],
            overrides: {
                "mainSeriesProperties.style": 3
            },
            time_frames: [
                { text: "5y", resolution: "W" },
                { text: "1y", resolution: "D"  },
                { text: "6m", resolution: "2h"  },
                { text: "3m", resolution: "1h" },
                { text: "1m", resolution: "30m" },
                { text: "1d", resolution: "1m" },
            ],
        });

        widget.onChartReady(() => {});
    });
</script>

<div id="chart" style="height: 550px!important; padding-left:20px; padding-right:20px" />
