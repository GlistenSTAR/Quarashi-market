<script>
    //@ts-nocheck
    import { page } from "$app/stores";
    import { Pagination, Navigation } from "swiper";
    import { Swiper, SwiperSlide } from "swiper/svelte";

    import coinStore from "$lib/coins-store";
    import CoinBox from "$lib/components/CoinBox.svelte";
    import CoinTable from "$lib/components/coin_table/Coin-Table.svelte";

    import { markets, categoriesData, flag } from "./../../../store";
    import isEmpty from "./../../../utils/is-empty";

    import "swiper/css";

    import "swiper/css/pagination";
    import "swiper/css/navigation";

    let data = [],
        startPos = 0;

    $: if (!isEmpty($markets)) {
        data = [];
        $markets.map((item) => {
            data.push(item);
        });
        categoriesData.set(data);
    }

    const showArrow = (e) => {
        e.target.classList.add("active");
    };

    const hiddenArrow = (e) => {
        e.target.classList.remove("active");
    };

    const catId = $page.url.searchParams.get("cat");

    $: flag.set("");
    $: if (catId) {
        flag.set(catId);
        coinStore.categories.map((item, index) => {
            if (item.id == catId) {
                startPos = index;
            }
        });
    }
</script>

<div class="category">
    <div
        class="card-carousel"
        on:mouseleave={(event) => hiddenArrow(event)}
        on:mouseenter={(event) => showArrow(event)}
    >
        <Swiper
            slidesPerView={1}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Pagination, Navigation]}
            class="mySwiper"
            initialSlide={startPos}
            breakpoints={{
                "667": {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                "947": {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                "1072": {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                "1636": {
                    slidesPerView: 5,
                    spaceBetween: 10,
                },
                "2160": {
                    slidesPerView: 7,
                    spaceBetween: 10,
                },
            }}
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
    }

    @media (max-width: 1352px) {
        .card-carousel {
            margin-left: 0px;
            margin-right: 0px;
        }
    }
</style>
