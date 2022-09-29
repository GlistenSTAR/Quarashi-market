<script>
    //@ts-nocheck
    export let coin = "";
    export let links = {};
    export let platforms = {};

    import { watchlist } from "./../../../store";

    import { StarIcon } from "svelte-feather-icons";
    import Globe from "./../../../assets/img/coins/globe.svg";
    import Copy from "./../../../assets/img/coins/copy.svg";
    import Github from "./../../../assets/img/coins/github.svg";
    import Telegram from "./../../../assets/img/coins/telegram.svg";
    import Reddit from "./../../../assets/img/coins/reddit.svg";
    import Twitter from "./../../../assets/img/coins/twitter.svg";

    const setFav = (event) => {
        let oldWatchlist = JSON.parse(localStorage.getItem("watchlist"));
        if (!oldWatchlist) {
            oldWatchlist = {};
            event.target.classList.add("active");
            oldWatchlist[`${coin}`] = true;
        } else {
            if ($watchlist[`${coin}`]) {
                event.target.classList.remove("active");
                delete oldWatchlist[`${coin}`];
            } else {
                event.target.classList.add("active");
                oldWatchlist[`${coin}`] = true;
            }
        }

        localStorage.setItem("watchlist", JSON.stringify(oldWatchlist));
        watchlist.set(oldWatchlist);
    };

    const onClickCopy = (addr) => {
        console.log(addr);
    };
</script>

<div>
    <div class="watchlist" on:click={setFav}>
        {#if $watchlist[`${coin}`]}
            <StarIcon class="active" size="20" />
        {:else}
            <StarIcon size="20" />
        {/if}
        <span class="px-3" style={{ userSelect: "none" }}>Add to Watchlist</span
        >
    </div>
    <div class="web_links mt-3 mb-3">
        {#if links.website}
            <a
                class="text-oz text-decoration-none"
                href={links.website}
                target="_blank"
                rel="noreferrer"
            >
                <img src={Globe} class="me-2" alt="icon" /> Website
            </a>
        {/if}
        {#if links.twitter}
            <a
                class="text-oz text-decoration-none"
                href={links.twitter}
                target="_blank"
                rel="noreferrer"
            >
                <img src={Twitter} class="me-2" alt="icon" /> Twitter
            </a>
        {/if}

        {#if links.telegram}
            <a
                class="text-oz text-decoration-none"
                href={links.telegram}
                target="_blank"
                rel="noreferrer"
            >
                <img src={Telegram} class="me-2" alt="icon" /> Telegram
            </a>
        {/if}
        {#if links.reddit}
            <a
                class="text-oz text-decoration-none"
                href={links.reddit}
                target="_blank"
                rel="noreferrer"
            >
                <img src={Reddit} class="me-2" alt="icon" /> Reddit
            </a>
        {/if}
        {#if links.github}
            <a
                class="text-oz text-decoration-none"
                href={links.github}
                target="_blank"
                rel="noreferrer"
            >
                <img src={Github} class="me-2" alt="icon" /> Github
            </a>
        {/if}
    </div>
    {#if platforms && (platforms.ethereum || platforms["binance-smart-chain"] || platforms.solana || platforms.Avalanche)}
        <div class="card bg-lawrence border-0 mt-4 platforms">
            {#if platforms.ethereum}
                <li class="text-oz text-decoration-none text-truncate ">
                    <img
                        src={Copy}
                        alt="copy"
                        class="me-2"
                        onClick={() => onClickCopy(platforms.ethereum)}
                    />
                    Ethereum
                    <span class="font-monospace ml-3"
                        >&nbsp;{platforms.ethereum}</span
                    >
                </li>
            {/if}
            {#if platforms["binance-smart-chain"]}
                <li class="text-oz text-decoration-none text-truncate ">
                    <img
                        src={Copy}
                        alt="copy"
                        class="me-2"
                        onClick={() =>
                            onClickCopy(platforms["binance-smart-chain"])}
                    />
                    Binance Smart Chain
                    <span class="font-monospace ml-3"
                        >&nbsp;{platforms["binance-smart-chain"]}</span
                    >
                </li>
            {/if}

            {#if platforms.solana}
                <li class="text-oz text-decoration-none text-truncate ">
                    <img
                        src={Copy}
                        alt="copy"
                        class="me-2"
                        onClick={() => onClickCopy(platforms.solana)}
                    />
                    Solana
                    <span class="font-monospace ml-3"
                        >&nbsp;{platforms.solana}</span
                    >
                </li>
            {/if}
            {#if platforms.Avalanche}
                <li class="text-oz text-decoration-none text-truncate ">
                    <img
                        src={Copy}
                        alt="copy"
                        class="me-2"
                        onClick={() => onClickCopy(platforms.Avalanche)}
                    />
                    Avalanche
                    <span class="font-monospace ml-3"
                        >&nbsp;{platforms.Avalanche}</span
                    >
                </li>
            {/if}
        </div>
    {/if}
</div>

<style>
    .watchlist {
        background-color: #141421;
        padding: 10px;
        border-radius: 12px;
        padding-left: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .web_links,
    .platforms {
        background-color: #141421;
        padding: 10px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
    }
    a,
    li {
        text-decoration: none;
        color: white;
        padding-left: 10px;
        padding-top: 7px;
        padding-bottom: 7px;
        border-bottom: 1px solid rgb(46, 46, 46);
        list-style-type: none;
    }
    .text-oz{
        font-size: 15px;
    }
</style>
