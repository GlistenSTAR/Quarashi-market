<script>
    import coinStore from "$lib/coins-store";
    import { onMount } from "svelte";

    import CoinBox from "$lib/components/CoinBox.svelte";
    import CoinTable from "$lib/components/coin_table/Coin-Table.svelte";

    import { markets, categoriesData, temp } from "./../../../store";

    let Carousel, carousel;
    
    onMount(async () => {
        const module = await import("svelte-carousel");
        Carousel = module.default;
    });

    $: categoriesData.set($markets)

</script>

<div>
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
    <CoinTable method={"cat"} />
</div>

<style>
    
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