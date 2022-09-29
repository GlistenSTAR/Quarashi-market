<script>
    export let description = "";
    export let guide = "";
    export let whitepaper = "";
</script>

{#if description && typeof description === "string"}
    <div class="about mt-mb-3">
        <h4>About</h4>
        <p class="mt-4">{@html description}</p>
    </div>
{/if}
{#if guide}
    <div class="guide" />
{/if}
{#if whitepaper}
    <div class="whitepaper" />
{/if}

<style>
    .about {
        padding: 20px;
        border-radius: 20px;
        font-size: 15px;
    }
    .about p {
        color: #c8c7cc;
        font-style: normal;
    }
</style>
