<script>
	import chart from './../assets/img/Vector.png'
	import News from '../lib/components/news/News.svelte'
import TableCard from '../lib/components/spotlight/Table-card.svelte'
</script>

<svelte:head>
	<title>Markets-Overview</title>
</svelte:head>

<section>
	<!-- Overview -->
	<div>
		<h1>Overview</h1>
		<div class="cards">
			<div class="card">
				<div class="info">
					<p>Total Market Cap</p>
					<p class="text-danger">-1.49 %</p>
				</div>
				<div class="amount">
					<h2>1.82T USD</h2>
				</div>
			</div>
			<div class="card">
				<div class="info">
					<p>Volume 24H</p>
					<p class="text-danger">- 13.17 %</p>
				</div>
				<div class="amount">
					<h2>68.56B USD</h2>
				</div>
				<div class="chart-box">
					<img src={chart} />
				</div>
			</div>
			<div class="card">
				<div class="info">
					<p>BTC Dominance</p>
					<p class="text-danger">- 0.41 %</p>
				</div>
				<div class="amount">
					<h2>39.31 %</h2>
				</div>
				<div class="chart-box">
					<img src={chart} />
				</div>
			</div>
			<div class="card">
				<div class="info">
					<p>DeFi Market Cap</p>
					<p class="text-danger">- 1.84 %</p>
				</div>
				<div class="amount">
					<h2>101.6B USD</h2>
				</div>
				<div class="chart-box">
					<img src={chart} />
				</div>
			</div>
			<div class="card">
				<div class="info">
					<p>TVL In DeFi</p>
					<p class="text-danger">- 0.17 %</p>
				</div>
				<div class="amount">
					<h2>195.3B USD</h2>
				</div>
				<div class="chart-box">
					<img src={chart} />
				</div>
			</div>
	
		</div>
	</div>
	
	<!-- Spotlight -->
	<div class="spotlight">
		<h3>Spotlight</h3>
		<div class="table-cards">
			<TableCard name="Top Gainers" method="up" icon="fa fa-arrow-up"/>
			<TableCard name="Top Losers" method="down" icon="fa fa-arrow-down"/>
			<TableCard name="TVL Change" method="lock" icon="fa fa-lock"/>
		</div>
	</div>
	
	<!-- Top news -->
	<div style="margin-top: 40px">
		<h3>Top News</h3>
		<div style="margin-top: 20px; display: flex; ">
			<News name="CoinTelegraph" />
			<News name="TheBlock" />
			<News name="Decrypt" />
		</div>
	</div>
</section>

<style>
	.cards {
		margin-top: 20px;
		display: flex;
		justify-content: space-around;
	}

	.cards .card {
		margin-left: 9px;
		margin-right: 9px;
		width: 303px;
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

	.card .info p{
		position: relative;
		font-size: 12px;
		color: rgb(185, 185, 185);
	}

	.chart-box {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.chart-box img{
		position: absolute;
		bottom: 0;
		right: -20px;
		z-index: -1;
	}

	.amount h2{
		font-size: 26px;
		font-weight: bold;
		text-align: left;
		z-index: 1;
	} 

	.text-danger{
		color: #FF4A57!important;
	}

	/* spotlight */
	.spotlight{
		margin-top: 40px;
	}

	.spotlight h3{
		font-size: 24px;
	}

	.table-cards{
		display: flex;
		margin-top: 20px;
		font-size: 12px;
	}
</style>
