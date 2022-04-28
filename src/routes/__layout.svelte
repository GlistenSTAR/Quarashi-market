<script>
	import Header from '../lib/components/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>


<style>
	main {
		margin-top: 40px;
		color: white
	}
</style>
