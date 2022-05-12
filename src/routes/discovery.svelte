<script>
    // @ts-nocheck
    import Loading from "$lib/components/loader/Loading.svelte";
    import AdvancedSearch from "$lib/components/Search/AdvancedSearch.svelte";
    import CategorySearch from "$lib/components/Search/CategorySearch.svelte";

    import isEmpty from "./../utils/is-empty";
    import { markets, categoriesData, advancedData } from "./../store";

    let active = "cat";

    const setActive = (val) => {
        active = val;
    };
    $: categoriesData.set({});
    $: advancedData.set({});
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
            <CategorySearch />
        {/if}
        {#if active === "adv"}
            <AdvancedSearch />
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
</style>
