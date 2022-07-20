<script>
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
        cat_tab_data = [];

    if (
        !isEmpty(coinStore) &&
        !isEmpty(coinStore.coins) &&
        !isEmpty(coinStore.categoryCoins)
    ) {
        coin_lists = Object.keys(coinStore.coins).join(",");
        tempCategoryCoins = coinStore.categoryCoins;
    }

    const catId = $page.url.searchParams.get("cat");

    if (!isEmpty(catId) && !isEmpty(coin_lists)) {
        getMarketsByIds(coin_lists).then((items) => {
            if (tempCategoryCoins[catId] && items) {
                cat_tab_data = tempCategoryCoins[catId]
                    .map((coin) => items[coin.coingeckoId])
                    .filter((item) => item != null)
                    .sort((a, b) => {
                        return a.rank - b.rank;
                    });
                categoriesData.set(cat_tab_data);
            }
        });
    }

    const setActive = (id) => {
        if (id === $flag) {
            flag.set({});
            categoriesData.set($markets);
        } else {
            flag.set(id);
            if (!isEmpty($flag) && !isEmpty(coin_lists)) {
                getMarketsByIds(coin_lists).then((items) => {
                    if (tempCategoryCoins[$flag] && items) {
                        cat_tab_data = tempCategoryCoins[$flag]
                            .map((coin) => items[coin.coingeckoId])
                            .filter((item) => item != null)
                            .sort((a, b) => {
                                return a.rank - b.rank;
                            });
                        categoriesData.set(cat_tab_data);
                    }
                });
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
