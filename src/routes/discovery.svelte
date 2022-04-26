<script>
    import CoinBox from "$lib/components/CoinBox.svelte";
    import { onMount } from "svelte";
    import None from '../assets/img/coins/none.png'
    
    let active = "cat";
    let Carousel; 
    let carousel; 

    const setActive = (val) => {
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
    {#if active==="cat"}
        <div>
            <div class="card-carousel">
                <svelte:component
                    this={Carousel}
                    bind:this={carousel}
                    particlesToShow={5}
                >
                    <CoinBox name="BlockChain" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                    <CoinBox name="Dexes" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                    <CoinBox name="Lending" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                    <CoinBox name="Yield Aggregators" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                    <CoinBox name="Investment Tools" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                    <CoinBox name="BlockChain" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                    <CoinBox name="BlockChain" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                    <CoinBox name="BlockChain" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                    <CoinBox name="BlockChain" content="Native cryptocurrencies on major blockchains." icon="block_coin"/>
                </svelte:component>
            </div>
            <div class="coin-table">
                <div>
                    <select name="coin_kind" id="coin_kind">
                        <option>Highest Cap</option>
                        <option>Lowest Cap</option>
                        <option>Highest Volume</option>
                        <option>Lowest Volume</option>
                        <option>Highest Price</option>
                        <option>Lowest Price</option>
                        <option>Top Gainers</option>
                        <option>Top Losers</option>
                    </select>
                </div>
                <div>
                    <table class="table table table-hover">
                        <tr class="header">
                            <td>Watchlist</td>
                            <td>#</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>24 Hours</td>
                            <td>7 days</td>
                            <td>Market Cap</td>
                            <td align="right">Volume</td>
                        </tr>
                        <tr>
                            <td>*</td>
                            <td>1</td>
                            <td>
                                <img src={None} alt="none" width="24" height="24"/>
                                XRP
                            </td>
                            <td>$ 0.613672</td>
                            <td>- 1.06 %</td>
                            <td>- 1.1 %</td>
                            <td>$ 29,403,580,087</td>
                            <td align="right">$ 2,267,032,452</td>
                        </tr>
                        <tr>
                            <td>*</td>
                            <td>2</td>
                            <td>
                                <img src={None} alt="none" width="24" height="24"/>
                                XRP
                            </td>
                            <td>$ 0.613672</td>
                            <td>- 1.06 %</td>
                            <td>- 1.1 %</td>
                            <td>$ 29,403,580,087</td>
                            <td align="right">$ 2,267,032,452</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    {/if}
    {#if active==="adv"}
        <div>Hello</div>
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

    .card-carousel{
        margin-top: 40px;
        margin-left: -50px;
        margin-right: -50px;
    }

    .coin-table{
        margin-top: 40px;
        width: 100%;
        height: 770px;
        background-color: #141421;
        border-radius: 12px;
        padding: 20px
    }

    #coin_kind{
        width: 283px;
        height: 48px;
        border-radius: 12px;
        background-color: #0B0B12;
        color: white;
        padding: 15px;
        font-size: 12px;
        border-color: #353535;
        border-width: 1px
    }

    .table{
        margin-top: 40px;
        padding: 20px;
        color: white;
        font-size: 12px;
    }

    .table .header td{
        color: rgb(185, 185, 185)
    }

    td img{
        width: 40px;
        height: 40px;
    }

    td{
        padding-top: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #353535;
    }
</style>
