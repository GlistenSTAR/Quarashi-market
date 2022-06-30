<script>
    // @ts-nocheck
    import News from "$lib/components/news/News.svelte";
    import Loading from "$lib/components/loader/Loading.svelte";
    import Overview from "$lib/components/overview/Overview.svelte";
    import Spotlight from "$lib/components/spotlight/Spotlight.svelte";

    import isEmpty from "./../utils/is-empty";

    import { markets, defi, marketsGlobal, news } from "../store";
    $: console.log('markets', $markets, 'defi', $defi, 'marketsGlobal', $marketsGlobal, 'news', $news)
</script>

<svelte:head>
    <title>Markets-Overview</title>
</svelte:head>

<section>
    {#if isEmpty($marketsGlobal) || isEmpty($markets) || isEmpty($defi) || isEmpty($news)}
        <Loading />
    {:else}
        <!-- Overview -->
        <Overview item={$marketsGlobal} />

        <!-- Spotlight -->
        <Spotlight data={$markets} defiData={$defi} />

        <!-- Top news -->
        {#if !isEmpty($news)}
            <div style="margin-top: 40px; width: 100%">
                <h3>Top News</h3>
                <div class="news">
                    <News name="CoinTelegraph" data={$news} key="0" />
                    <News name="TheBlock" data={$news} key="1" />
                    <News name="Decrypt" data={$news} key="2" />
                </div>
            </div>
        {/if}
    {/if}
</section>

<style>
    .news {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }

    h3 {
        font-size: 24px;
    }

    @media (max-width: 1024px) {
        .news {
            display: flex;
            flex-direction: column;
        }
    }
</style>
