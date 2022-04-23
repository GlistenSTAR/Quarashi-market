<script>
	import { page } from "$app/stores";
	import logo from "./../../../assets/img/logo.png";
	import search_logo from "./../../../assets/img/search.png";

	let search = "";
</script>

<header>
	<div class="corner">
		<a href="/">
			<span class="logo">
				<img src={logo} alt="logo" />
			</span>
			<h2 class="head">Quarashi Markets Overview</h2>
		</a>
	</div>

	<nav>
		<ul>
			<li class:active={$page.url.pathname === "/"}>
				<a sveltekit:prefetch href="/">Overview</a>
			</li>
			<li class:active={$page.url.pathname === "/discovery"}>
				<a sveltekit:prefetch href="/discovery">Discovery</a>
			</li>
			<li class:active={$page.url.pathname === "/watchlist"}>
				<a sveltekit:prefetch href="/watchlist">Watchlist</a>
			</li>
		</ul>
	</nav>

	<div class="search">
		<div class="input-group">
			<input
				type="text"
				class="form-control"
				placeholder="Search Here"
				name="search"
				id="search"
				bind:value={search}
				aria-describedby="search-icon"
			/>
			<span class="input-group-text" id="search-icon">
				<img src={search_logo} />
			</span
			>
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.corner a {
		display: flex;
		align-items: center;
	}

	.corner .logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		background-color: #4F1455;
		border-radius: 50%;
	}

	.corner img {
		width: 30px;
		height: 30px;
		object-fit: contain;
	}

	.corner .head {
		font-family: "Poppins";
		color: white;
		font-weight: bold;
		font-size: 18px;
		padding-left: 16px;
		line-height: 27px;
	}

	ul {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		margin-bottom: 0px;
		padding-left: 0px;
	}

	li.active a {
		color: #c921cd;
	}

	nav a {
		color: white;
		font-weight: 700;
		font-size: 18px;
		text-decoration: none;
		padding-left: 18px;
		padding-right: 18px;
	}

	a:hover {
		text-decoration: none;
		color: #c921cd;
	}

	.search .input-group {
		background-color: transparent;
		width: 303px;
		height: 48px;
		border-radius: 18px;
		padding-top: 0px;
		padding: 0;
	}

	.search .input-group input{
		padding: 15px 15px;
		padding-left: 20px;
		border-radius: 18px;
		background-color: transparent;
		border: 1px solid rgba(48, 51, 58, 0.5);
		height: 48px;
		border-right: none;
		color: white;
	}

	.search .input-group input::placeholder{
		color: white;
	}

	.input-group input:focus, .input-group input:focus-visible{
		outline: none;
		box-shadow: none;
	}

	.search .input-group span{
		background-color: transparent;
		border: 1px solid rgba(48, 51, 58, 0.5);
		border-radius: 18px;
		border-left: none;
	}
</style>
