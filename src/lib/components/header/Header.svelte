<script>
	import { page } from "$app/stores";
	import Viewport from "svelte-viewport-info";
	import logo from "./../../../assets/img/logo.png";
	import search_logo from "./../../../assets/img/search.png";

	let search = "";

	let show = false;

	const handleSeachInput = () => {
		if (Viewport.Width < 1042) {
			show = !show;
		}
	};
</script>

<header>
	<nav class="navbar navbar-expand-md">
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#mynavbar"
		>
			<i class="fas fa-bars" />
		</button>
		<a href="/">
			<span class="logo">
				<img src={logo} alt="logo" />
			</span>
			<h2 class="head">Quarashi Markets Overview</h2>
		</a>
		<div class="collapse navbar-collapse" id="mynavbar">
			<ul
				class="navbar-nav me-auto"
				class:active={$page.url.pathname === "/"}
			>
				<li class="nav-item">
					<a sveltekit:prefetch href="/">Overview</a>
				</li>
				<li
					class="nav-item"
					class:active={$page.url.pathname === "/discovery"}
				>
					<a sveltekit:prefetch href="/discovery">Discovery</a>
				</li>
				<li
					class="nav-item"
					class:active={$page.url.pathname === "/watchlist"}
				>
					<a sveltekit:prefetch href="/watchlist">Watchlist</a>
				</li>
			</ul>
		</div>
		<div class="search_box">
			<form class="d-flex">
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
							<img
								src={search_logo}
								alt="search"
								on:click={handleSeachInput}
							/>
						</span>
					</div>
				</div>
				{#if show}
					<div class="modal_search" style="display: flex;">
						<input
							type="text"
							class="form-control"
							placeholder="Search Here"
							name="search"
							id="search"
							bind:value={search}
							aria-describedby="search-icon"
						/>
						<button class="btn btn-outline-success">Search</button>
					</div>
				{/if}
			</form>
		</div>
	</nav>
</header>

<style>
	header {
		width: 100%;
	}
	a {
		display: flex;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 60px;
		height: 60px;
		background-color: #4f1455;
		border-radius: 50%;
	}

	img {
		width: 30px;
		height: 30px;
		object-fit: contain;
	}

	.head {
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
		width: 100%;
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
		width: 100%;
		height: 48px;
		border-radius: 18px;
		padding-top: 0px;
		padding: 0;
	}

	.search .input-group input {
		padding: 15px 15px;
		padding-left: 20px;
		border-radius: 18px;
		background-color: transparent;
		border: 1px solid rgba(48, 51, 58, 0.5);
		height: 48px;
		border-right: none;
		color: white;
	}

	.search .input-group input::placeholder {
		color: white;
	}

	.input-group input:focus,
	.input-group input:focus-visible {
		outline: none;
		box-shadow: none;
	}

	.search .input-group span {
		background-color: transparent;
		border: 1px solid rgba(48, 51, 58, 0.5);
		border-radius: 18px;
		border-left: none;
	}

	h2 {
		margin-bottom: 0;
	}

	@media (max-width: 1042px) {
		.search .input-group input {
			display: none;
		}
		.search .input-group span {
			border-left: 1px solid rgba(48, 51, 58, 0.5);
			border-radius: 12px;
		}
		.input-group
			> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
			border-top-left-radius: 12px;
			border-bottom-left-radius: 12px;
		}

		.modal_search {
			display: flex;
			position: absolute;
			right: 0;
			top: 70px;
			width: 350px;
			background-color: #141421;
			padding: 20px;
			border-radius: 12px;
		}
		
		.modal_search input {
			color: white;
			background-color: #0b0b12;
			border: none;
		}
		.modal_search input::placeholder {
			color: white;
		}

		.modal_search .btn-outline-success {
			border-color: #4f1455;
			border-width: 2px;
			color: #4f1455;
		}
	}
	@media (max-width: 767px) {
		.navbar {
			justify-content: flex-start;
		}
		.logo {
			display: none;
		}
		.navbar-toggler {
			display: flex;
			width: 48px;
			height: 48px;
			background-color: transparent;
			border: 1px solid rgba(48, 51, 58, 0.5);
			border-radius: 12px;
			align-items: center;
			justify-content: center;
		}
		.navbar-toggler i {
			color: #c921cd;
		}
		.search_box {
			position: absolute;
			right: 0;
			top: 10px;
		}

		ul{
			margin-top: 10px
		}
		.search .input-group span {
			width: 48px;
			height: 48px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.nav-item {
			padding-top: 7px;
			padding-bottom: 7px;
		}
		.modal_search {
			display: flex;
			position: absolute;
			right: 0;
			top: 70px;
			width: 350px;
			background-color: #141421;
			padding: 20px;
			border-radius: 12px;
		}

		.modal_search input {
			color: white;
			background-color: #0b0b12;
			border: none;
		}
		.modal_search input::placeholder {
			color: white;
		}

		.modal_search .btn-outline-success {
			border-color: #4f1455;
			border-width: 2px;
			color: #4f1455;
		}
	}
</style>
