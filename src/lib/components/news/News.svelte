<script>
    //@ts-nocheck
    import NewsItem from "./News-item.svelte";
    export let name = "";
    export let key = "";
    export let data = [];
    let news;

    if (name == "CoinTelegraph") {
        news = data
            .filter((item) => item.source === "cointelegraph")
            .slice(0, 5);
    } else if (name == "Decrypt") {
        news = data.filter((item) => item.source === "decrypt").slice(0, 5);
    } else if (name == "TheBlock") {
        news = data.filter((item) => item.source === "theblock").slice(0, 5);
    }
</script>

<div class="news-card" {key}>
    <h4>{name}</h4>
    <div class="news-group">
        {#each news as item}
            <NewsItem {item} key={item.id} />
        {/each}
    </div>
</div>

<style>
    h4 {
        color: #c921cd;
        font-size: 18px;
    }
    .news-card {
        width: 100%;
        min-height: 659px;
        background: #141421;
        margin-left: 9px;
        margin-right: 9px;
        border-radius: 12px;
        padding: 20px !important;
        padding-bottom: 5px;
        flex-direction: column;
    }

    .news-group {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }
    @media (max-width: 1380px) {
        .news-card {
            padding: 13px;
        }
    }

    @media (max-width: 1024px) {
        .news-card {
            width: 100%;
            min-width: 410px;
            margin-top: 20px;
            margin-left: 0px;
            margin-right: 0px;
        }
    }
</style>
