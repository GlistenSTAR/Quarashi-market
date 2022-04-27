<script>
    import CoinBox from "../lib/components/CoinBox.svelte";
    import CoinTable from "../lib/components/coin_table/Coin-Table.svelte";
    import { onMount } from "svelte";
    import Select from "svelte-select";
    import {
        top_items,
        volume_items,
        period_items,
        marketcap_items,
        liquidity_items,
        pricechange_items,
    } from "./../lib/filter.js";
    console.log(top_items);
    let active = "cat";
    /**
     * @type {typeof import("svelte-carousel").default}
     */
    let Carousel;
    let carousel;

    const setActive = (/** @type {string} */ val) => {
        active = val;
    };

    onMount(async () => {
        const module = await import("svelte-carousel");
        Carousel = module.default;
    });
</script>

<section>
    <h1>Discovery</h1>
    <div class="tabs">
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
    </div>
    {#if active === "cat"}
        <div>
            <div class="card-carousel">
                <svelte:component
                    this={Carousel}
                    bind:this={carousel}
                    particlesToShow={5}
                >
                    <CoinBox
                        name="BlockChain"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                    <CoinBox
                        name="Dexes"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                    <CoinBox
                        name="Lending"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                    <CoinBox
                        name="Yield Aggregators"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                    <CoinBox
                        name="Investment Tools"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                    <CoinBox
                        name="BlockChain"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                    <CoinBox
                        name="BlockChain"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                    <CoinBox
                        name="BlockChain"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                    <CoinBox
                        name="BlockChain"
                        content="Native cryptocurrencies on major blockchains."
                        icon="block_coin"
                    />
                </svelte:component>
            </div>
            <CoinTable />
        </div>
    {/if}
    {#if active === "adv"}
        <div>
            <div class="filter_box">
                <div class="row">
                    <div class="col-lg-3 col-sm-12 col-md-6">
                        <div class="select_option">
                            <Select
                                items={top_items}
                                value={"Top 250"}
                                showChevron={true}
                            />
                        </div>
                        <div style="margin-top: 20px" class="select_option">
                            <Select
                                items={marketcap_items}
                                value={"Market Cap"}
                                showChevron={true}
                            />
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-12 col-md-6">
                        <div class="select_option">
                            <Select
                                items={volume_items}
                                value={"Volume"}
                                showChevron={true}
                            />
                        </div>

                        <div style="margin-top: 20px" class="select_option">
                            <Select
                                items={liquidity_items}
                                value={"Liquidity"}
                                showChevron={true}
                                isDisabled={true}
                            />
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-12 col-md-6">
                        <div class="select_option">
                            <Select
                                items={period_items}
                                value={"Price Period"}
                                showChevron={true}
                            />
                        </div>
                        <div class="select_option" style="margin-top: 20px">
                            <Select
                                items={pricechange_items}
                                value={"Price Change"}
                                showChevron={true}
                            />
                        </div>
                    </div>
                    <div
                        class="col-lg-3 col-sm-12 col-md-6 d-flex align-items-end justify-content-end"
                    >
                        <button
                            class="btn bg-lawrence text-white rounded-4 px-4"
                            disabled
                            ><span class="pe-2">Results:</span><span
                                class="spinner-grow spinner-grow-sm d-none"
                                role="status"
                            /><span class="text-white">5</span></button
                        >
                    </div>
                </div>
            </div>
            <CoinTable />
        </div>
    {/if}
</section>

<style>
    .tabs {
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

    .filter_box {
        margin-top: 40px;
        background-color: #141421;
        padding: 20px;
        border-radius: 12px;
    }

    .select_option {
        --background: #0b0b12;
        --borderRadius: 12px;
        --listBackground: #0b0b12;
        --clearSelectColor: #c921cd;
        --clearSelectFocusColor: #c921cd;
        --inputFontSize: 12px;
        --disabledBackground: #0b0b12;
        --disabledColor: grey;
        --indicatorColor: #c921cd;
        --itemHoverBG: #007aff;
    }

    @media (max-width: 1352px) {
        .card-carousel {
            margin-left: 0px;
            margin-right: 0px;
        }
    }
</style>
