<script>
    export let name = "";
    import NewsItem from "./News-item.svelte";
</script>

<div class="news-card">
    <h4>{name}</h4>
    <div style="margin-top: 20px" class="news-group">
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
    </div>
</div>

<style>
    h4 {
        color: #c921cd;
        font-size: 18px;
    }
    .news-card {
        width: 518px;
        height: 659px;
        background: #141421;
        margin-left: 9px;
        margin-right: 9px;
        border-radius: 12px;
        padding: 20px;
        padding-bottom: 5px;
        flex-direction: column;
    }
    @media (max-width: 1380px) {
        .news-card{
            padding: 10px
        }
    }

    @media (max-width: 1024px) {
        .news-card{
            width: 100%;
            min-width: 410px;
            margin-top: 20px;
            margin-left: 0px;
            margin-right: 0px;
        }
    }
</style>
