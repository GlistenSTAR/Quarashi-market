<script>
    import { onMount } from "svelte";
    import Header from "$lib/components/header/Header.svelte";
    import "../app.css";

    import {
        getDefiCoins,
        getMarkets,
        getMarketsGlobal,
        getNews,
        getWatchlist,
        getCoins,
        getDefiMarkets,
        getAllCoinData,
    } from "./../api";

    let saved_time,
        update_flag = true;
    const current_time = new Date().getTime();

    if (typeof localStorage !== "undefined") {
        saved_time = localStorage.getItem("update_time");
        if (current_time - saved_time > 4 * 60 * 60 * 1000) {
            update_flag = true;
        } else {
            update_flag = false;
        }
    }

    onMount(() => {
        getMarketsGlobal(update_flag);
        getMarkets(update_flag);
        getDefiCoins(update_flag);
        getNews(update_flag);
        getWatchlist();
        getCoins(update_flag);
        getDefiMarkets(update_flag);
        getAllCoinData(update_flag);
        if (update_flag) {
            window.localStorage.setItem("update_time", current_time);
        }
    });
</script>

<Header />

<main>
    <slot />
</main>

<style>
    main {
        margin-top: 40px;
        color: white;
    }
</style>
