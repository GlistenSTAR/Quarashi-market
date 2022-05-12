<script>
    import {
        currencyFullValue,
        percentageFormat,
        priceColor,
    } from "./../../../helpers";

    export let performance = [];
    export let priceRanges = [];

    import btc from "./../../../assets/img/coins/coins/btc.svg";
    import eth from "./../../../assets/img/coins/coins/eth.svg";
    import bnb from "./../../../assets/img/coins/coins/bnb.svg";
    import usd from "./../../../assets/img/coins/coins/usd.svg";
</script>

<div class="row mt-md-4">
    <div class="col-6 box">
        <h5 class="title">Price Range</h5>
        <div class="content">
            {#each priceRanges as item}
                <div class="mt-md-4 mb-2">
                    <div class="progress bg-jeremy" style="height: 4px">
                        <div
                            style={`width: ${item.value}%`}
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-valuenow={item.value}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        />
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <small class="text-bran">
                            {currencyFullValue(item.min, {
                                thousandSeparated: true,
                                mantissa: 4,
                                optionalMantissa: true,
                            })}
                        </small>
                        <small class="text-muted">{item.type}</small>
                        <small class="text-bran">
                            {currencyFullValue(item.max, {
                                thousandSeparated: true,
                                mantissa: 4,
                                optionalMantissa: true,
                            })}
                        </small>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="col-6 box">
        <h5 class="title">Performance</h5>
        <table class="table table-borderless mb-0 table-zebra text-bran table-striped">
            <thead>
                <tr class="small text-grey">
                    <td class="pb-2 pt-2">VS</td>
                    <td class="text-end pb-2 pt-2">1W</td>
                    <td class="text-end pb-2 pt-2">1M</td>
                </tr>
            </thead>
            <tbody>
                {#each performance as data, index}
                    <tr key={index}>
                        <td
                            class="text-bran text-uppercase d-flex align-items-center"
                        >
                            {#if data.code == "usd"}
                                <img src={usd} alt="icon" class="me-3" />
                            {:else if data.code == "btc"}
                                <img src={btc} alt="icon" class="me-3" />
                            {:else if data.code == "eth"}
                                <img src={eth} alt="icon" class="me-3" />
                            {:else if data.code == "bnb"}
                                <img src={bnb} alt="icon" class="me-3" />
                            {/if}
                            {data.code}
                        </td>
                        <td class={`text-end ${priceColor(data["1w"])}`}>
                            {percentageFormat(data["1w"], null, 0) === "NaN%"
                                ? 0
                                : percentageFormat(data["1w"], null, 0)}
                        </td>
                        <td class={`text-end ${priceColor(data["1m"])}`}>
                            {percentageFormat(data["1w"], null, 0) === "NaN%"
                                ? 0
                                : percentageFormat(data["1m"], null, 0)}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .title {
        border-bottom: 1px solid rgb(65, 64, 64);
        padding-bottom: 10px;
    }
    .box {
        background-color: #252933;
        padding: 20px;
        border-radius: 20px;
        font-size: 12px;
    }
    .bg-warning {
        background-color: #c921cd !important;
    }
    .text-bran {
        color: rgb(184, 182, 182);
    }
    .row {
        justify-content: center;
    }
    .row .col-6 {
        margin-left: 7px;
        margin-right: 7px;
        width: 47%;
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .table-striped>tbody>tr:nth-of-type(odd){
        background-color: #343948;
    }
</style>
