<script>
    //@ts-nocheck
    import { Pagination, Navigation } from "swiper";
    import { Swiper, SwiperSlide } from "swiper/svelte";

    import coinStore from "$lib/coins-store";
    import CoinBox from "$lib/components/CoinBox.svelte";
    import CoinTable from "$lib/components/coin_table/Coin-Table.svelte";

    import { markets, categoriesData } from "./../../../store";
    import isEmpty from "./../../../utils/is-empty";

    import "swiper/css";

    import "swiper/css/pagination";
    import "swiper/css/navigation";

    let data = [];
    $: if (!isEmpty($markets)) {
        $markets.map((item) => {
            data.push(item);
        });
        categoriesData.set(data);
    }

    const showArrow = (e) =>{
        e.target.classList.add("active");
    }

    const hiddenArrow = (e) => {
        e.target.classList.remove("active");
    }
</script>

<div>
    <div class="card-carousel" on:mouseleave={(event)=>hiddenArrow(event)} on:mouseenter={(event)=>showArrow(event)}>
        <Swiper
            slidesPerView={4}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            class="mySwiper"
        >
            {#each coinStore.categories as item}
                <SwiperSlide>
                    <CoinBox
                        name={item.name}
                        content={item.description}
                        icon={item.id}
                    />
                </SwiperSlide>
            {/each}
        </Swiper>
    </div>
    <CoinTable method={"cat"} />
</div>

<style>
    .card-carousel {
        margin-top: 40px;
        z-index: 1;
    }
    .mySwiper{
        z-index: 2;
    }

    @media (max-width: 1352px) {
        .card-carousel {
            margin-left: 0px;
            margin-right: 0px;
        }
    }
</style>
