<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let index = 0;

    function onClick(event) {
        dispatch("click", event);
    }
</script>

<tr
    on:click={onClick}
    class={$$props.class}
    class:odd={index % 2 !== 0}
    class:even={index % 2 === 0}
>
    <slot />
</tr>

<style>
    .odd {
        background-color: transparent;
    }
    tr {
        border-color: rgb(41, 40, 40);
        font-size: 12px;
    }
</style>
