<script>
	// @ts-nocheck
	import { onMount } from "svelte";

	import chart from "./../assets/img/Vector.png";
	import News from "$lib/components/news/News.svelte";
	import isEmpty from "./../utils/is-empty";
	import Loading from "$lib/components/loader/Loading.svelte";

	import { currencyFormat, percentageFormat, priceColor } from "./../helpers";
	import LoaderValue from "$lib/components/loader/LoaderValue.svelte";
	import Spotlight from "$lib/components/spotlight/Spotlight.svelte";

	import { getDefiCoins, getMarkets, getMarketsGlobal } from "./../api";

	import {
		coinInfo,
		discovery,
		markets,
		defi,
		marketsGlobal,
		news,
	} from "../store";

	onMount(() => {
		getMarketsGlobal();
		getMarkets();
		getDefiCoins();
	});

</script>

<svelte:head>
	<title>Markets-Overview</title>
</svelte:head>

<section>
	{#if isEmpty($marketsGlobal) || isEmpty($markets) || isEmpty($defi)}
		<Loading />
	{:else}
		<!-- Overview -->
		<!-- chart remain -->
		<div style="width: 100%">
			<h1>Overview</h1>
			<div class="cards">
				<div class="card">
					<div class="info">
						<p>Total Market Cap</p>
						<p class={priceColor($marketsGlobal.marketCapDiff24h)}>
							{#if $marketsGlobal.marketCapDiff24h}
								{percentageFormat(
									$marketsGlobal.marketCapDiff24h
								)}
							{:else}
								<LoaderValue width="44" height="18" key="1" />
							{/if}
						</p>
					</div>
					<div class="amount">
						<h2>
							{#if $marketsGlobal.marketCap}
								{currencyFormat($marketsGlobal.marketCap, {
									average: true,
									totalLength: 3,
								})}
							{:else}
								<LoaderValue width="44" height="18" key="2" />
							{/if}
						</h2>
					</div>
				</div>
				<div class="card">
					<div class="info">
						<p>Volume 24H</p>
						<p class={priceColor($marketsGlobal.volume24hDiff)}>
							{#if $marketsGlobal.volume24hDiff}
								{percentageFormat($marketsGlobal.volume24hDiff)}
							{:else}
								<LoaderValue width="44" height="18" key="3" />
							{/if}
						</p>
					</div>
					<div class="amount">
						<h2>
							{#if $marketsGlobal.volume24h}
								{currencyFormat($marketsGlobal.volume24h, {
									average: true,
									totalLength: 3,
								})}
							{:else}
								<LoaderValue width="44" height="18" key="4" />
							{/if}
						</h2>
					</div>
					<div class="chart-box">
						<!-- {points.volume} -->
						<img src={chart} alt="chart" />
					</div>
				</div>
				<div class="card">
					<div class="info">
						<p>BTC Dominance</p>
						<p
							class={priceColor(
								$marketsGlobal.dominanceBTCDiff24h
							)}
						>
							{#if $marketsGlobal.dominanceBTCDiff24h}
								{percentageFormat(
									$marketsGlobal.dominanceBTCDiff24h
								)}
							{:else}
								<LoaderValue width="44" height="18" key="5" />
							{/if}
						</p>
					</div>
					<div class="amount">
						<h2>
							{#if $marketsGlobal.dominanceBTC}
								{percentageFormat($marketsGlobal.dominanceBTC, {
									forceSign: false,
								})}
							{:else}
								<LoaderValue width="44" height="18" key="6" />
							{/if}
						</h2>
					</div>
					<div class="chart-box">
						<!-- points.dominance -->
						<img src={chart} alt="chart" />
					</div>
				</div>
				<div class="card">
					<div class="info">
						<p>DeFi Market Cap</p>
						<p
							class={priceColor(
								$marketsGlobal.marketCapDefiDiff24h
							)}
						>
							{#if $marketsGlobal.marketCapDefiDiff24h}
								{percentageFormat(
									$marketsGlobal.marketCapDefiDiff24h
								)}
							{:else}
								<LoaderValue width="44" height="18" key="7" />
							{/if}
						</p>
					</div>
					<div class="amount">
						<h2>
							{#if $marketsGlobal.marketCapDefi}
								{currencyFormat($marketsGlobal.marketCapDefi)}
							{:else}
								<LoaderValue width="44" height="18" key="8" />
							{/if}
						</h2>
					</div>
					<div class="chart-box">
						<img src={chart} alt="chart" />
					</div>
				</div>
				<div class="card">
					<div class="info">
						<p>TVL In DeFi</p>
						<p
							class={priceColor(
								$marketsGlobal.totalValueLockedDiff24h
							)}
						>
							{#if $marketsGlobal.totalValueLockedDiff24h}
								{percentageFormat(
									$marketsGlobal.totalValueLockedDiff24h
								)}
							{:else}
								<LoaderValue width="44" height="18" key="" />
							{/if}
						</p>
					</div>
					<div class="amount">
						<h2>
							{#if $marketsGlobal.totalValueLocked}
								{currencyFormat(
									$marketsGlobal.totalValueLocked
								)}
							{:else}
								<LoaderValue width="44" height="18" key="" />
							{/if}
						</h2>
					</div>
					<div class="chart-box">
						<img src={chart} alt="chart" />
					</div>
				</div>
			</div>
		</div>

		<!-- Spotlight -->
		<!-- tvl change remain -->
		<Spotlight data={$markets} defiData = {$defi}/>

		<!-- Top news -->
		<div style="margin-top: 40px; width: 100%">
			<h3>Top News</h3>
			<div class="news">
				<News name="CoinTelegraph" />
				<News name="TheBlock" />
				<News name="Decrypt" />
			</div>
		</div>
	{/if}
</section>

<style>
	.cards {
		margin-top: 20px;
		display: flex;
		justify-content: flex-start;
		overflow-x: scroll;
	}

	::-webkit-scrollbar { 
		height: 5px !important;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: black;
		border-radius: 10px;
	}

	.cards .card {
		margin-left: 9px;
		margin-right: 9px;
		min-width: 303px;
		height: 101px;
		border-radius: 12px;
		background: #141421;
		padding: 20px 20px;
		z-index: -1;
	}

	.card .info {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}

	.card .info p {
		position: relative;
		font-size: 12px;
		color: rgb(185, 185, 185);
	}

	.chart-box {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.chart-box img {
		position: absolute;
		bottom: 0;
		right: -20px;
		z-index: -1;
	}

	.amount h2 {
		font-size: 26px;
		font-weight: bold;
		text-align: left;
		z-index: 1;
		text-transform: uppercase;
	}
	.text-success {
		color: #00a478 !important;
	}
	.text-danger {
		color: #ff4a57 !important;
	}

	.news {
		margin-top: 20px;
		display: flex;
		justify-content: space-around;
	}

	@media (max-width: 1024px) {
		.table-cards {
			display: flex;
			margin-top: 20px;
			font-size: 12px;
			flex-direction: column;
		}
		.news {
			display: flex;
			flex-direction: column;
		}
	}
</style>
