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
    {#if platforms.length > 0}
        <div class="platforms">
            <li class="list-group-item bg-lawrence mh-48">
                <img src={Copy} alt="copy" class="mr-2" />
                {#if platforms.ethereum}
                    &nbsp; ethereum
                    <small class="font-monospace">{platforms.ethereum}</small>
                {/if}
                {#if platforms.solana}
                    <span>solana</span>
                    <div class="text-truncate">
                        <small class="font-monospace">{platforms.solana}</small>
                    </div>
                {/if}
            </li>
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
    .web_links {
        background-color: #141421;
        padding: 10px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
    }
    a {
        text-decoration: none;
        color: white;
        padding-left: 10px;
        padding-top: 7px;
        padding-bottom: 7px;
        border-bottom: 1px solid rgb(46, 46, 46);
    }
    .platforms li {
        background-color: #141421;
        color: white;
        border-radius: 12px;
        display: flex;
    }
</style>
