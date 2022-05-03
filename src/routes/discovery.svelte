<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    import CoinBox from "$lib/components/CoinBox.svelte";
    import CoinTable from "$lib/components/coin_table/Coin-Table.svelte";
    import Loading from "$lib/components/loader/Loading.svelte";
    import AdvancedSearch from "$lib/components/advacnedSearch/AdvancedSearch.svelte";

    import isEmpty from "./../utils/is-empty";
    import coinStore from "$lib/coins-store";
    import { markets } from "./../store";

    let active = "cat";
    let watchlist = false;
    /**
     * @type {typeof import("svelte-carousel").default}
     */
    let Carousel, carousel;

    onMount(async () => {
        const module = await import("svelte-carousel");
        Carousel = module.default;
    });

    const setActive = (/** @type {string} */ val) => {
        active = val;
    };
</script>

<svelte:head>
    <title>Markets-Discovery</title>
</svelte:head>

<section>
    {#if isEmpty($markets)}
        <Loading />
    {:else}
        <h1>Discovery</h1>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <span
                    class="nav-link {active === 'cat' ? 'active' : ''}"
                    on:click={() => setActive("cat")}
                >
                    Categories
                </span>
            </li>
            <li class="nav-item">
                <span
                    class="nav-link {active === 'adv' ? 'active' : ''}"
                    on:click={() => setActive("adv")}
                >
                    Advanced Search
                </span>
            </li>
        </ul>

        {#if active === "cat"}
            <div class="card-carousel">
                <svelte:component
                    this={Carousel}
                    bind:this={carousel}
                    particlesToShow={4}
                >
                    {#each coinStore.categories as item}
                        <CoinBox
                            name={item.name}
                            content={item.description}
                            icon={item.id}
                        />
                    {/each}
                </svelte:component>
            </div>
            <CoinTable {watchlist} />
        {/if}
        {#if active === "adv"}
            <AdvancedSearch {watchlist} />
        {/if}
    {/if}
</section>

<style>
    ul.nav {
        margin-top: 40px;
        cursor: pointer;
    }

    .nav-link {
        color: white;
        padding: 20px;
        text-decoration: none;
        margin-bottom: 0px;
    }

    .nav-link:focus-visible {
        border-color: transparent;
    }

    .nav-tabs {
        border-color: #30333a;
    }

    .nav-link:hover {
        border-color: transparent;
    }

    .nav-tabs .nav-link.active {
        background-color: transparent;
        color: #c921cd;
        border: none;
        border-bottom: 2px solid #c921cd;
    }

    .card-carousel {
        margin-top: 40px;
        margin-left: -50px;
        margin-right: -50px;
    }

    @media (max-width: 1352px) {
        .card-carousel {
            margin-left: 0px;
            margin-right: 0px;
        }
    }
</style>
