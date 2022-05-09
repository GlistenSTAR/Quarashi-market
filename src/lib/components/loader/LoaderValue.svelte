<script>
    import ContentLoader from "svelte-content-loader";
    export let width = "";
    export let height = "";
    export let key = "";
</script>

<span>
    <ContentLoader uniqueKey={key}>
        <rect x="0" y="0" rx="3" ry="3" {width} {height} />
    </ContentLoader>
</span>
