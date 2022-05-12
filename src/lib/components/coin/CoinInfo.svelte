<script>
    export let description = "";
    // export let guide = ""
    // export let whitepapaer = ""
</script>

{#if description}
    <div class="about mt-mb-3">
        <h4>About</h4>
        <p class="mt-4">{description}</p>
    </div>
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
