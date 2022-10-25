<script>
    //@ts-nocheck
    export let coin = "";
    export let coinId = "";

    import Tradingview from "./Tradingview.svelte";
    import HistoryProvider from "./api/HistoryProvider";

    const historyProvider = new HistoryProvider(coinId);

    let resolveSymbol = (symbolName, onSymbolResolvedCallback) => {
        setTimeout(
            () =>
                onSymbolResolvedCallback({
                    name: symbolName,
                    type: "crypto",
                    session: "24x7",
                    timezone: "UTC",
                    ticker: symbolName,
                    minmov: 1,
                    pricescale: 100,
                    has_intraday: true,
                    intraday_multipliers: ["1", "60"],
                    chartTypes: ["Area", "Line"],
                    volume_precision: 8,
                    data_status: "streaming",
                }),
            0
        );
    };

    // let date = new Date();
    // let year = date.getFullYear();
    // let month = date.getMonth() + 1;
    // let day = date.getDate();

    // let from_date = new Date(year - 5, month, day, 0, 0).getTime() / 1000;
    // let to_date = new Date(year, month, day + 1, 0, 0).getTime() / 1000;

    let getBars = (
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback,
        onErrorCallback,
        firstDataRequest
    ) => {
        return historyProvider.getBars(
            symbolInfo,
            resolution,
            from,
            to,
            onHistoryCallback,
            onErrorCallback,
            firstDataRequest
        );
    };

    let onReady = (callback) => {
        setTimeout(
            () =>
                callback({
                    supported_resolutions: [
                        "1",
                        "5",
                        "15",
                        "30",
                        "60",
                        "240",
                        "D",
                    ],
                }),
            0
        );
    };

    let calculateHistoryDepth = (resolution, resolutionBack, intervalBack) => {
        return resolution < 60
            ? { resolutionBack: "D", intervalBack: "1" }
            : undefined;
    };
    const datafeed = {
        onReady: onReady,
        resolveSymbol: resolveSymbol,
        getBars: getBars,
        calculateHistoryDepth: calculateHistoryDepth,
        subscribeBars: () => {},
        unsubscribeBars: () => {},
    };
</script>

<div>
    <Tradingview symbol={`${coin}/usd`} {datafeed} />
</div>
