<script lang="ts">
    //@ts-nocheck
    import { page } from "$app/stores";
    import { getCardIcon } from "./getIcon";

    export let name = "";
    export let icon = "";
    export let content = "";

    import { categoriesData, flag, markets } from "./../../store";
    import isEmpty from "../../utils/is-empty";
    import coinStore from "$lib/coins-store";

    import { getMarketsByIds } from "../../api";

    let coin_lists,
        tempCategoryCoins = [],
        cat_tab_data = [],
        data = {};

    if (
        !isEmpty(coinStore) &&
        !isEmpty(coinStore.coins) &&
        !isEmpty(coinStore.categoryCoins)
    ) {
        coin_lists = Object.keys(coinStore.coins).join(",");
        tempCategoryCoins = coinStore.categoryCoins;
    }

    let catId = $page.url.searchParams.get("cat");

    if (!isEmpty(catId) && !isEmpty(coin_lists)) {
        if (typeof localStorage !== "undefined") {
            let markets_id_coins = JSON.parse(
                localStorage.getItem("markets_id_coins")
            );

            if (
                markets_id_coins !== null &&
                !isEmpty(markets_id_coins[catId]) &&
                new Date().getTime() - markets_id_coins[catId].time <
                    4 * 60 * 60 * 1000
            ) {
                // console.log(1);
                categoriesData.set(markets_id_coins[catId].data);
            } else {
                getMarketsByIds(coin_lists).then((items) => {
                    if (tempCategoryCoins[catId] && items) {
                        cat_tab_data = tempCategoryCoins[catId]
                            .map((coin) => items[coin.coingeckoId])
                            .filter((item) => item != null)
                            .sort((a, b) => {
                                return b.marketCap - a.marketCap;
                            });

                        if (markets_id_coins !== null) {
                            // console.log(2);

                            data = markets_id_coins;
                            data[`${catId}`] = {
                                data: cat_tab_data,
                                time: new Date().getTime(),
                            };
                        } else {
                            // console.log(3);

                            data[`${catId}`] = {
                                data: cat_tab_data,
                                time: new Date().getTime(),
                            };
                        }
                        localStorage.setItem(
                            "markets_id_coins",
                            JSON.stringify(data)
                        );
                        categoriesData.set(cat_tab_data);
                    }
                });
            }
        }
    }

    const setActive = (id) => {
        catId = id;
        if (id === $flag) {
            flag.set({});
            categoriesData.set($markets);
        } else {
            flag.set(id);
            if (!isEmpty($flag) && !isEmpty(coin_lists)) {
                if (typeof localStorage !== "undefined") {
                    let markets_id_coins = JSON.parse(
                        localStorage.getItem("markets_id_coins")
                    );

                    if (
                        markets_id_coins !== null &&
                        !isEmpty(markets_id_coins[id]) &&
                        new Date().getTime() - markets_id_coins[id].time <
                            4 * 60 * 60 * 1000
                    ) {
                        // console.log(1);
                        categoriesData.set(markets_id_coins[id].data);
                    } else {
                        getMarketsByIds(coin_lists).then((items) => {
                            if (tempCategoryCoins[id] && items) {
                                cat_tab_data = tempCategoryCoins[id]
                                    .map((coin) => items[coin.coingeckoId])
                                    .filter((item) => item != null)
                                    .sort((a, b) => {
                                        return b.marketCap - a.marketCap;
                                    });

                                if (markets_id_coins !== null) {
                                    // console.log(2);

                                    data = markets_id_coins;
                                    data[`${id}`] = {
                                        data: cat_tab_data,
                                        time: new Date().getTime(),
                                    };
                                } else {
                                    // console.log(3);

                                    data[`${id}`] = {
                                        data: cat_tab_data,
                                        time: new Date().getTime(),
                                    };
                                }
                                localStorage.setItem(
                                    "markets_id_coins",
                                    JSON.stringify(data)
                                );
                                categoriesData.set(cat_tab_data);
                            }
                        });
                    }
                }
            }
        }
    };
</script>

<div
    class="coinbox {$flag === icon ? 'active' : ''}"
    on:click={() => setActive(icon)}
>
    <div style="display: flex; align-items: center; padding-bottom: 12px">
        <span><img src={getCardIcon(icon)} alt="coin" /></span>
        <h3 style="margin-left: 12px;">{name}</h3>
    </div>
    <div>
        <h5>{content}</h5>
    </div>
</div>

<style>
    .coinbox {
        background-color: #141421;
        padding: 20px;
        height: 120px;
        min-width: 250px !important;
        margin-right: 10px;
        border-radius: 12px;
        cursor: pointer;
    }

    .coinbox:hover {
        background-color: #c921cd;
    }

    .coinbox.active {
        background-color: #c921cd;
    }

    .coinbox span {
        padding: 6px;
        border-radius: 12px;
        background-color: #33333e;
        display: flex;
    }

    h3 {
        font-size: 18px;
        margin-left: 7px;
        margin-bottom: 0;
    }

    h5 {
        font-size: 12px;
    }

    @media (max-width: 1024px) {
        .coinbox {
            width: 100%;
            min-width: 303px;
        }
    }
</style>
